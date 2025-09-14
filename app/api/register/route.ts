import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDataBase } from '@/lib/mongoose';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectToDataBase();

    const body = await req.json();
    const { fullName, email, password, phone, role, bio } = body;

    if (!fullName || !email || !password || !phone || !role) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني موجود مسبقًا، حاول باستخدام بريد آخر' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      role,
      bio,
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'تم إنشاء الحساب بنجاح' },
      { status: 201 }
    );
  } catch (error) {
    console.error('خطأ في تسجيل المستخدم:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء التسجيل' },
      { status: 500 }
    );
  }
}