import { connectToDataBase } from "@/lib/mongoose";
import { Favorite } from "@/models/Favorite";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDataBase();
  
  const token = (await cookies()).get("token")?.value;
  const user = getCurrentUser(token);
  console.log("token from cookies:",token)
  console.log("Decoded User:",user)
  if (!user) {
    return NextResponse.json({ error: "يجب تسجيل الدخول" }, { status: 401 });
  }

  const { projectId } = await req.json();

  try {
    const exists = await Favorite.findOne({ user: user.userId, project: projectId });
    if (exists) {
      await Favorite.deleteOne({ _id: exists._id });
      return NextResponse.json({ message: "تمت الإزالة من المفضلة" });
    }

    await Favorite.create({ user: user.userId, project: projectId });
    return NextResponse.json({ message: "تمت الإضافة للمفضلة" });
  } catch (error) {
    return NextResponse.json({ error: "فشل تعديل المفضلة" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  await connectToDataBase();
  const token = (await cookies()).get("token")?.value;
  const user = getCurrentUser(token);
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { projectId } = await req.json();

  try {
    await Favorite.deleteOne({ user: user.userId, project: projectId });
    return NextResponse.json({ message: "تمت الإزالة من المفضلة" });
  } catch (error) {
    return NextResponse.json({ error: "فشل الحذف" }, { status: 500 });
  }
}