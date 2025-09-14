// path: app/api/user/change-password/route.ts
import { NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { getCurrentUser } from "@/lib/auth";
import { User } from "@/models/User";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  await connectToDataBase();

  const token =(await cookies()).get("token")?.value;
  const currentUser = getCurrentUser(token);

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();
    console.log("Old pass: ",currentPassword)
    console.log("New pass: ",newPassword)
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const user = await User.findById(currentUser.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "كلمة المرور القديمة غير صحيحة" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: "تم تغيير كلمة المرور بنجاح" });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json({ message: "فشل في تغيير كلمة المرور" }, { status: 500 });
  }
}