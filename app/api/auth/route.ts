// app/api/auth/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  const user = getCurrentUser(token);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}