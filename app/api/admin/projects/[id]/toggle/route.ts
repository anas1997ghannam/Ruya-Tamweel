import { NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { Project } from "@/models/Project";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDataBase();

    const { id } = await context.params; // تعدل من هنا

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    const body = await request.json();
    const status = body.status;

    if (!["active", "disabled", "pending_review"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    project.status = status;
    await project.save();

    return NextResponse.json({
      message: `تم تحديث حالة المشروع إلى ${status}`,
    });
  } catch (err) {
    console.error("PATCH admin/projects error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
