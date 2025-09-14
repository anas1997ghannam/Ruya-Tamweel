// app/api/admin/users/[id]/status/route.ts anas
import { NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { User } from "@/models/User";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDataBase();

    // 👇 فك الـ params من الـ context
    const { id } = await context.params;

    const { status } = await request.json();

    const updated = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
    }

    return NextResponse.json({ message: "تم تحديث الحالة" });
  } catch (err) {
    console.error("PATCH user status error:", err);
    return NextResponse.json({ message: "خطأ في السيرفر" }, { status: 500 });
  }
}
