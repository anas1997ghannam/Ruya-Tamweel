// app/api/articles/mine/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { Article } from "@/models/Article";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  await connectToDataBase();

  const token = (await cookies()).get("token")?.value;
  const user = getCurrentUser(token);

  if (!user)
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  try {
    const articles = await Article.find({ authorId: user.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("authorId", "fullName");

    const total = await Article.countDocuments({ authorId: user.userId });

    return NextResponse.json({ articles, total });
  } catch (error) {
    return NextResponse.json(
      { error: "فشل في جلب المقالات" },
      { status: 500 }
    );
  }
}