// path: app/api/user/me/route.ts
import { NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { getCurrentUser } from "@/lib/auth";
import { User } from "@/models/User";
import { cookies } from "next/headers";

export async function GET() {
  await connectToDataBase();

  const token =(await cookies()).get("token")?.value;
  const currentUser = getCurrentUser(token);

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await User.findById(currentUser.userId).select("fullName phone email role");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}