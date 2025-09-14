//الهدف: عرض كل المشاريع يلي أنشأها المستخدم، مع أزرار "تعديل" و"حذف
import { connectToDataBase } from "@/lib/mongoose";
import { Project } from "@/models/Project";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse,NextRequest } from "next/server";
import { cookies } from "next/headers";
import { error } from "console";
export async function GET() {
    
    await connectToDataBase()
    const token=(await cookies()).get('token')?.value;
    const user=getCurrentUser(token)
    if (!user){
        return NextResponse.json({error:"غير مصرح"},{status:401})
    }
    if (user.role!=="entrepreneur"){
        return NextResponse.json({error:"هذه الصفة مخصصة لرواد الأعمال فقط"},{status:403})
    }
    try{
        const projects=await Project.find({owner:user.userId})
        return NextResponse.json(projects)

    }catch(error){
        return NextResponse.json({error:"فشل في جلب المشاريع"},{status:500})
    }
}