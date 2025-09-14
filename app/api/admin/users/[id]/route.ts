// app/api/admin/users/[id]/route.ts anas
import { NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { User } from "@/models/User";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDataBase();

    // 👇 هون لازم نفك الـ params
    const { id } = await context.params;

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
    }

    return NextResponse.json({ message: "تم حذف المستخدم" });
  } catch (err) {
    console.error("DELETE user error:", err);
    return NextResponse.json({ message: "خطأ في السيرفر" }, { status: 500 });
  }
}
