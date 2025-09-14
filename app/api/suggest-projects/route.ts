// path -> app/api/suggest-projects/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { type } = await req.json();
  const prompt =` اقترح لي 10 مشاريع من نوع "${type}" فقط، لكل مشروع أعطني بصيغة JSON المخرجات التالية:
- الاسم (name)
- النوع (type) ويجب أن يكون "${type}" فقط
- وصف مختصر (description)
- الميزانية بالدولار (budget)

أرجو أن تكون القيم باللغة العربية، وأن يكون الناتج عبارة عن مصفوفة JSON مباشرة بدون أي شرح أو مقدمة.

ملاحظة: لا تخرج عن النوع "${type}"، ولا تذكر أنواع أخرى غير "تقني" أو "زراعي" أو "تجاري" أو "صناعي".`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct:free',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '';

  console.log("Full AI Response JSON:", JSON.stringify(data, null, 2));
  console.log("AI Raw Response:", text);

try {
  let parsed;

  // نحاول مباشرة
  try {
    parsed = JSON.parse(text);
  } catch {
    // fallback لاستخراج كل الكائنات الموجودة داخل النص
    const objectRegex = /{[^{}]+}/g;
    const matches = text.match(objectRegex);
    if (matches && matches.length > 0) {
      parsed = matches.map((m:string) => JSON.parse(m));
    } else {
      throw new Error("لم يتم العثور على أي كائن JSON داخل النص.");
    }
  }

  const allowedTypes = ["تقني", "زراعي", "تجاري", "صناعي"];
  const projects = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed.projects)
    ? parsed.projects
    : [];

  const cleanProjects = projects.map((p: any) => ({
    name: p.name,
    type: type, // بدل ما نستخدم p.type، منستخدم النوع يلي أرسله المستخدم
    description: p.description,
    budget: Number(p.budget?.toString().replace(/[^\d.]/g, "") || 0),
  }));

  return NextResponse.json({ success: true, projects: cleanProjects });
} catch (err: any) {
  return NextResponse.json({
    success: false,
    error: "فشل في تحويل رد الذكاء الاصطناعي إلى JSON",
    raw: text,
    message: err.message,
  });
}
  } 
  //في حال فك الحظر عن سوريا
  // import { NextRequest, NextResponse } from 'next/server';

  // export async function POST(req: NextRequest) {
  //   const { type } = await req.json();
  
  //   const prompt = 
  // `اقترح لي 10 مشاريع من نوع "${type}" فقط. يجب أن تحتوي كل فكرة على:
  // - name (اسم المشروع)
  // - type (نوع المشروع، ويجب أن يكون "${type}" حصراً)
  // - description (وصف موجز)
  // - budget (ميزانية بالدولار)
  
  // رجاءً أعدها كـ JSON Array يحتوي على 10 كائنات فقط. تأكد أن يكون كل شيء باللغة العربية.`
  // ;
  
  //   const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization':` Bearer ${process.env.OPENAI_API_KEY}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       model: 'gpt-3.5-turbo',
  //       messages: [{ role: 'user', content: prompt }],
  //       temperature: 0.7,
  //     }),
  //   });
    
  //   const data = await response.json();
  //   const text = data.choices?.[0]?.message?.content || '';
  //   console.log("Full OpenAI Response:", JSON.stringify(data, null, 2));
  // console.log("Text Returned:", text);
  //   try {
  //     let parsed;
  //     try {
  //       parsed = JSON.parse(text);
  //     } catch {
  //       const objectRegex = /{[^{}]+}/g;
  //       const matches = text.match(objectRegex);
  //       if (matches && matches.length > 0) {
  //         parsed = matches.map((m: string) => JSON.parse(m));
  //       } else {
  //         throw new Error("لم يتم العثور على JSON داخل الرد.");
  //       }
  //     }
  
  //     const allowedTypes = ["تقني", "زراعي", "تجاري", "صناعي"];
  //     const projects = Array.isArray(parsed) ? parsed : [];
  
  //     const cleanProjects = projects.map((p: any) => ({
  //       name: p.name,
  //       type: allowedTypes.includes(p.type) ? p.type : type,
  //       description: p.description,
  //       budget: Number(p.budget?.toString().replace(/[^\d.]/g, "") || 0),
  //     }));
  
  //     return NextResponse.json({ success: true, projects: cleanProjects });
  //   } catch (err: any) {
  //     return NextResponse.json({
  //       success: false,
  //       error: "فشل في تحليل رد الذكاء الاصطناعي",
  //       raw: text,
  //       message: err.message,
  //     });
  //   }
  // }
  