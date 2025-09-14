import { connectToDataBase } from "@/lib/mongoose";
import { Support } from "@/models/Support";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse} from "next/server";
export async function GET() {
    await connectToDataBase();
    const token=(await cookies()).get("token")?.value;
    const user=getCurrentUser(token)
    console.log("TOKEN :=====>",token);
    console.log("USER:====>",user)
    if(!user){
        return NextResponse.json({error:"غير مصرح"},{status:401})
    }
    try{
        const supported=await Support.find({user:user.userId}).populate("project");
        console.log("supported: ",supported)
        return NextResponse.json({supported})
    }catch(error){
        return NextResponse.json({error:"فشل الجلب"},{status:500})
    }
}