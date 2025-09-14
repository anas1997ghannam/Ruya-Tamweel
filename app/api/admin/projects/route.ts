// path: app/api/admin/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import { Project } from "@/models/Project";
import { Support } from "@/models/Support";

export async function GET(req: NextRequest) {
  try {
    await connectToDataBase();
    const { search } = Object.fromEntries(req.nextUrl.searchParams);

    const pipeline: any[] = [
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creatorData",
        },
      },
      {
        $unwind: "$creatorData",
      },
    ];

    if (search) {
      pipeline.push({
        $match: {
          "creatorData.fullName": { $regex: search, $options: "i" },
        },
      });
    }

    pipeline.push({
      $sort: { createdAt: -1 },
    });

    const projects = await Project.aggregate(pipeline);

    const projectIds = projects.map((p) => p._id);

    const supports = await Support.aggregate([
      { $match: { project: { $in: projectIds } } },
      { $group: { _id: "$project", count: { $sum: 1 } } },
    ]);

    const supportMap: Record<string, number> = {};
    supports.forEach((s) => {
      supportMap[s._id.toString()] = s.count;
    });

    const result = projects.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      owner: p.creatorData.fullName,
      status: p.status,
      supporters: supportMap[p._id.toString()] || 0,
    }));

    return NextResponse.json({ projects: result });
  } catch (err) {
    console.error("GET admin/projects error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}