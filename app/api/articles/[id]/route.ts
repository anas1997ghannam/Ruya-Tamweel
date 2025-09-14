// path: app/api/articles/[id]/route.ts
import { NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { Article } from "@/models/Article";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDataBase();

  const token = (await cookies()).get("token")?.value;
  const user = getCurrentUser(token);
  if (!user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { id } = await context.params;
  const { title, content } = await request.json();

  try {
    const article = await Article.findById(id);
    if (!article) {
      return NextResponse.json({ error: "لم يتم ايجاد المقالة" }, { status: 404 });
    }

    if (article.authorId.toString() !== user.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    article.title = title;
    article.content = content;
    await article.save();

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "فشل في تحديث المقالة" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDataBase();

  const token = (await cookies()).get("token")?.value;
  const user = getCurrentUser(token);
  if (!user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return NextResponse.json({ error: "لم يتم ايجاد المقالة" }, { status: 404 });
    }

    if (article.authorId.toString() !== user.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await article.deleteOne();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "فشل في حذف المقالة" }, { status: 500 });
  }
}
