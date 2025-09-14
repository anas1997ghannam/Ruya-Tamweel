//path:app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { User } from '@/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export async function POST(req: NextRequest) {
  try {
    await connectToDataBase();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "بيانات تسجيل الدخول غير صحيحة" }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "بيانات تسجيل الدخول غير صحيحة" }, { status: 401 });
    }
    if(user.status==="disabled"){
      return NextResponse.json({error:"لقد تم حظر حسابك بسبب مخالفة قواعد وسياسات التطبيق"},{status:403})
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "تم تسجيل الدخول بنجاح",
      user: {
        id: user._id,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
        status:user.status
      }
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 أيام
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}