import { NextRequest, NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { Project } from "@/models/Project";
import { User } from "@/models/User";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { evaluateProject } from "@/lib/inferenceEngine";

export async function POST(req: NextRequest) {
  try {
    await connectToDataBase();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = getCurrentUser(token);

    if (!user) {
      return NextResponse.json(
        { error: "يجب تسجيل الدخول لإضافة مشروع" },
        { status: 401 }
      );
    }

    if (user.role !== "entrepreneur") {
      return NextResponse.json(
        { error: "فقط رواد الأعمال يمكنهم إضافة مشاريع" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, type, description, budget, criteriaAnswers } = body;

    if (!name || !type || !budget) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة" },
        { status: 400 }
      );
    }

    if (!criteriaAnswers || !Array.isArray(criteriaAnswers)) {
      return NextResponse.json(
        { error: "يجب إرسال الإجابات criteriaAnswers لتقييم المشروع" },
        { status: 400 }
      );
    }

    const creator = await User.findById(user.userId);
    if (!creator) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    // ✅ استدعاء النظام الخبير
    const evaluation = evaluateProject(criteriaAnswers);

    const project = await Project.create({
      name,
      type,
      description,
      budget,
      creator: creator._id,
      status: evaluation.status === "active" ? "active" : "disabled",
      criteriaAnswers,
      evaluationScore: evaluation.score,
      evaluationExplanations: evaluation.explanations, // ⬅️ نخزن الأسباب
    });

    return NextResponse.json(
      {
        message: "تم إنشاء المشروع وتقييمه",
        project,
        evaluation, // يرجع score + status + explanations
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Creating Project", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء المشروع" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDataBase();
    const projects = await Project.find().populate("creator");
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error Fetching Projects: ", error);
    return NextResponse.json(
      { error: "فشل في جلب المشاريع" },
      { status: 500 }
    );
  }
}
