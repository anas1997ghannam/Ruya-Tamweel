//path:app/api/support/route.ts
import { connectToDataBase } from "@/lib/mongoose";
import { Support } from "@/models/Support";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import nodemailer from 'nodemailer';
import { Project } from "@/models/Project";
import { User } from "@/models/User";

async function sendEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from:` منصة المشاريع <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

export async function POST(req: NextRequest) {
  await connectToDataBase();
  const token = (await cookies()).get("token")?.value;
  const user = getCurrentUser(token);

  if (!user) {
    return NextResponse.json({ error: "يجب تسجيل الدخول" }, { status: 401 });
  }

  const { projectId, location, phone, date, time } = await req.json();

  try {
    const [investor, project] = await Promise.all([
      User.findById(user.userId),
      Project.findById(projectId).populate("creator"),
    ]);

    if (!investor || !project) {
      return NextResponse.json({ error: "المستثمر أو المشروع غير موجود" }, { status: 404 });
    }

    const entrepreneur = project.creator;

    let existingSupport = await Support.findOne({
      user: user.userId,
      project: projectId,
    });

    if (existingSupport) {
      existingSupport.location = location;
      existingSupport.phone = phone;
      existingSupport.date = date;
      existingSupport.time = time;
      await existingSupport.save();
    } else {
      await Support.create({
        user: user.userId,
        project: projectId,
        location,
        phone,
        date,
        time,
      });

      const emailHtml = 
        ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9; direction:rtl;">
    <h2 style="color: #4CAF50; text-align: center; margin-bottom: 20px;">🎉 تم تحديد لقاء لمشروعك!</h2>

    <p style="font-size: 16px; line-height: 1.6;">مرحبًا <strong>${entrepreneur.fullName}</strong>،</p>
    <p style="font-size: 16px; line-height: 1.6;">لقد قام المستثمر <strong>${investor.fullName}</strong> بجدولة لقاء لمشروعك. إليك تفاصيل اللقاء:</p>

    <table style="width: 100%; border-collapse: collapse; margin-top: 15px; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
      <tr style="background-color: #f1f1f1;">
        <td style="padding: 10px; font-weight: bold;">اسم المشروع:</td>
        <td style="padding: 10px;">${project.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold;">رقم المستثمر:</td>
        <td style="padding: 10px;">${investor.phone}</td>
      </tr>
      <tr style="background-color: #f1f1f1;">
        <td style="padding: 10px; font-weight: bold;">الإيميل:</td>
        <td style="padding: 10px;">${investor.email}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold;">التاريخ:</td>
        <td style="padding: 10px;">${date}</td>
      </tr>
      <tr style="background-color: #f1f1f1;">
        <td style="padding: 10px; font-weight: bold;">الوقت:</td>
        <td style="padding: 10px;">${time}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold;">المكان:</td>
        <td style="padding: 10px;">${location}</td>
      </tr>
    </table>

    <h3 style="color: #4CAF50; font-size: 16px; margin: 20px 0 10px;">تذكر تحضير النقاط التالية عند اللقاء:</h3>
    <ol style="padding-right: 20px; direction: rtl; background: #fff; border-radius: 8px; padding: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
      <li>وصف دقيق للمشكلة التي تحلها: بيّن بوضوح المشكلة أو الحاجة في السوق التي يستهدفها مشروعك...</li>
      <li>الحل الفعّال الذي تقدمه: صف كيف يقدم مشروعك حلاً مبتكرًا ومناسبًا للمشكلة...</li>
      <li>نموذج العمل (Business Model): وضح كيف رح تكسب أرباحك...</li>
      <li>تحليل السوق والعملاء المستهدفين: وضح مين عملاءك الأساسيين...</li>
      <li>الميزة التنافسية (Competitive Advantage): شو بيميزك عن المنافسين؟...</li>
      <li>الخطة المالية: كم المبلغ يلي بدك ياه؟...</li>
      <li>خطة النمو والتوسع: شو رؤيتك للمرحلة الجاية؟...</li>
      <li>الفريق: عرفنا بفريقك...</li>
      <li>حالة المشروع الحالية (Stage): هل عندك منتج مبدئي (MVP)...</li>
      <li>أهداف اللقاء: وضح ليش طالب اللقاء؟...</li>
    </ol>

    <p style="font-size: 14px; color: #888; margin-top: 25px; text-align: center;">نتمنى لك كل التوفيق والنجاح! 🚀</p>
  </div>`
      ;

      await sendEmail(
        entrepreneur.email,
        "تم دعم مشروعك",
        emailHtml
      );
    }

    return NextResponse.json({ message: existingSupport ? "تم تحديث تفاصيل اللقاء" : "تم دعم المشروع مع تفاصيل اللقاء" });

  } catch (error) {
    console.error("Support error:", error);
    return NextResponse.json({ error: "فشل دعم المشروع" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectToDataBase();
  const token = (await cookies()).get("token")?.value;
  const user = getCurrentUser(token);

  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { projectId } = await req.json();

  try {
    const [investor, project] = await Promise.all([
      User.findById(user.userId),
      Project.findById(projectId).populate("creator"),
    ]);

    if (!investor || !project) {
      return NextResponse.json({ error: "المستثمر أو المشروع غير موجود" }, { status: 404 });
    }

    const entrepreneur = project.creator;

    await Support.deleteOne({ user: user.userId, project: projectId });

    const emailHtml = 
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #fff4f4;direction:rtl;">
    <h2 style="color: #f44336; text-align: center;">تم إلغاء الموعد</h2>
    <p style="font-size: 16px;">مرحبًا ${entrepreneur.fullName}،</p>
    <p style="font-size: 16px;">نأسف لإبلاغك بأن المستثمر <strong>${investor.fullName}</strong> قد ألغى الموعد للقاء بك.  <strong>${project.name}</strong>.</p>
    <p style="font-size: 14px; color: #555; margin-top: 20px;">نعتذر عن الإزعاج ونتمنى لك التوفيق في مشوارك الريادي.</p>
  </div>`
    ;

    await sendEmail(
      entrepreneur.email,
      "تم إلغاء الدعم",
      emailHtml
    );

    return NextResponse.json({ message: "تم إلغاء الدعم" });
  } catch (error) {
    console.error("Delete support error:", error);
    return NextResponse.json({ error: "فشل الإزالة" }, { status: 500 });
  }
}