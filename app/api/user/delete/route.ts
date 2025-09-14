// path: app/api/user/delete/route.ts
import { NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { getCurrentUser } from "@/lib/auth";
import { User } from "@/models/User";
import { cookies } from "next/headers";

export async function DELETE() {
  await connectToDataBase();

  const token =(await cookies()).get("token")?.value;
  const currentUser = getCurrentUser(token);

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await User.findByIdAndDelete(currentUser.userId);

    if (!deleted) {
      return NextResponse.json({ message: "لم يتم العثور على المستخدم" }, { status: 404 });
    }

    // احذف الكوكيز بعد الحذف
    const response = NextResponse.json({ message: "تم حذف الحساب بنجاح" });
    response.cookies.set("token", "", { path: "/", maxAge: 0 });

    return response;
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json({ message: "فشل في حذف الحساب" }, { status: 500 });
  }
}