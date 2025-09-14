// app/api/projects/[id]/delete/route.ts
import { connectToDataBase } from "@/lib/mongoose";
import { Project } from "@/models/Project";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDataBase();

  const token = (await cookies()).get("token")?.value;
  const user = getCurrentUser(token);

  if (!user) {
    return NextResponse.json({ error: "يجب تسجيل الدخول" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: "المشروع غير موجود" }, { status: 404 });
    }

    if (project.creator.toString() !== user.userId) {
      return NextResponse.json(
        { error: "غير مصرح لك بحذف هذا المشروع" },
        { status: 403 }
      );
    }

    await project.deleteOne();

    return NextResponse.json({ message: "تم حذف المشروع بنجاح" });
  } catch (error) {
    console.error("DELETE project error:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء الحذف" }, { status: 500 });
  }
}
