//path-->app/api/projects/[id]/entrepreneur/route.ts
import { connectToDataBase } from "@/lib/mongoose";
import { Project } from "@/models/Project";
import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  await connectToDataBase();

  const token = (await cookies()).get("token")?.value;
  const user = getCurrentUser(token);

  if (!user) {
    return NextResponse.json({ error: "يجب تسجيل الدخول" }, { status: 401 });
  }

  if (user.role !== "entrepreneur") {
    return NextResponse.json({ error: "فقط رواد الأعمال يمكنهم رؤية مشاريعهم" }, { status: 403 });
  }

  try {
    const projects = await Project.find({ creator: user.userId });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء جلب المشاريع" }, { status: 500 });
  }
}