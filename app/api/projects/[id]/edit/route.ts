//path-->app/api/projects/route.ts

import { connectToDataBase } from "@/lib/mongoose";
import { Project } from "@/models/Project";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDataBase();

  const token =(await cookies()).get("token")?.value;
  const user = getCurrentUser(token);

  if (!user) {
    return NextResponse.json({ error: "يجب تسجيل الدخول" }, { status: 401 });
  }

  if (user.role !== "entrepreneur") {
    return NextResponse.json(
      { error: "فقط رواد الأعمال يمكنهم تعديل المشاريع" },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: "المشروع غير موجود" }, { status: 404 });
    }

    if (project.creator.toString() !== user.userId) {
      return NextResponse.json(
        { error: "غير مصرح لك بتعديل هذا المشروع" },
        { status: 403 }
      );
    }

    const { name, description, budget, type } = await request.json();

    if (!name || !description || !budget || !type) {
      return NextResponse.json(
        { error: "يرجى تعبئة جميع الحقول" },
        { status: 400 }
      );
    }

    project.name = name;
    project.description = description;
    project.budget = budget;
    project.type = type;

    await project.save();

    return NextResponse.json({ message: "تم تعديل المشروع بنجاح" });
  } catch (error) {
    console.error("PUT project edit error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء التعديل" },
      { status: 500 }
    );
  }
}
