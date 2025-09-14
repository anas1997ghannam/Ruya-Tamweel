//app/api/articles/route.ts
import { NextRequest,NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongoose";
import {Article} from "@/models/Article";
import  {User}  from "@/models/User";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
export async function GET(req:NextRequest) {
    await connectToDataBase();
    const {searchParams}=new URL(req.url);
    const page=parseInt(searchParams.get("page")||"1");
    const limit=parseInt(searchParams.get("limit")||"10");
    const skip=(page-1)*limit;
    try{
        const articles=await Article.find({})
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)
        .populate("authorId","fullName")
        const total=await Article.countDocuments()
        return NextResponse.json({articles,total});
    }catch(error){
        NextResponse.json({error:"فشل في جلب المدونات"},{status:500})
    }
}
export async function POST(req:Request) {
    await connectToDataBase();
    const token = (await cookies()).get("token")?.value;
    const user = getCurrentUser(token);
    if (!user) return NextResponse.json({ error: "غير مصرح,يجب تسجيل الدخول أولا." }, { status: 401 });
    const {title,content}=await req.json()
    try{
        const newArticle=await Article.create({
            title,
            content,
            authorId:user.userId,
        });
        return NextResponse.json(newArticle)
    }catch(error){
        return NextResponse.json({error:"فشل في انشاء المقالة"},{status:500})
    }
}