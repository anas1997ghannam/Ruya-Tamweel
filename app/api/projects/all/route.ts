import { connectToDataBase } from "@/lib/mongoose";

import { Project } from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDataBase();

  try {
    const projects = await Project.find().populate("owner", "name email");
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "فشل بجلب المشاريع" }, { status: 500 });
  }
}