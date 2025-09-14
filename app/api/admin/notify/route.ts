import { NextRequest, NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { sendEmail } from "./sendEmail";

export async function POST(req: NextRequest) {
  try {
    const { message, role } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "محتوى الرسالة مطلوب" }, { status: 400 });
    }

    await connectToDataBase();

    const query: any = {};
    if (role) query.role = role; // "entrepreneur" | "investor"

    const users = await User.find(query, "email");
    const recipients = users.map((u: any) => u.email).filter(Boolean);

    if (!recipients.length) {
      return NextResponse.json({ error: "لا يوجد مستخدمين للإرسال إليهم" }, { status: 404 });
    }

    // إرسال إيميلات جماعية (باستخدام BCC مثلاً أو بشكل فردي حسب حجم البيانات)
    await Promise.all(
      recipients.map((email: string) =>
        sendEmail(email, "رسالة من إدارة منصة رؤية وتمويل", message)
      )
    );

    return NextResponse.json({ message: "تم إرسال الرسائل بنجاح" });
  } catch (err) {
    console.error("Notify error:", err);
    return NextResponse.json({ error: "فشل في إرسال الإشعارات" }, { status: 500 });
  }
}