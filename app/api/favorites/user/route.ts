//return all favorites project for the current user
import { connectToDataBase } from "@/lib/mongoose";
import { Favorite } from "@/models/Favorite";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDataBase();
  const token =(await cookies()).get("token")?.value;
  const user = getCurrentUser(token);
  console.log("TOKEN :=====>",token);
  console.log("USER:====>",user)

  if (!user) {
    return NextResponse.json({ error: "يجب تسجيل الدخول" }, { status: 401 });
  }

  try {
    const favorites = await Favorite.find({ user: user.userId }).populate("project");

    return NextResponse.json({ favorites });
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء جلب المفضلة" }, { status: 500 });
  }
}