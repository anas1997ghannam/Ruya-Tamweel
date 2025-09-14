// path: app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "تم تسجيل الخروج" });

  // إزالة الكوكيز
  response.cookies.set("token", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}