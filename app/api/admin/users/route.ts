// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { User } from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectToDataBase();

    const { search, role, page = "1" } = Object.fromEntries(req.nextUrl.searchParams);
    const limit = 10;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * limit;

    const filter: any = {};
    if (role) filter.role = role;
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [{ fullName: regex }, { email: regex }];
    }

    const [users, total] = await Promise.all([
      User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      User.countDocuments(filter),
    ]);

    return NextResponse.json({
      users: (users as any[]).map((u) => ({
        id: u._id.toString(),
        fullName: u.fullName,
        email: u.email,
        role: u.role,
        status: u.status,
        createdAt: new Date(u.createdAt).toISOString().split("T")[0],
      })),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GET users error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}