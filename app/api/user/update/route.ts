// path: app/api/user/update/route.ts
import { NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { getCurrentUser } from "@/lib/auth";
import { User } from "@/models/User";
import { cookies } from "next/headers";

export async function PUT(req: Request) {
  await connectToDataBase();

  const token =(await cookies()).get("token")?.value;
  const currentUser = getCurrentUser(token);

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { fullName, phone } = await req.json();

    if (!fullName || !phone) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser.userId,
      { fullName, phone },
      { new: true, runValidators: true }
    ).select("fullName phone");

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
  }
}