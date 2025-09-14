// path: app/api/smart-suggest/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import mongoose from "mongoose";
import { Project } from "@/models/Project";
import { Support } from "@/models/Support";

interface ProjectData {
  name: string;
  type: string;
  description: string;
  budget: number;
}

const criteriaQuestions = [
  "1. وصف دقيق للمشكلة التي تحلها: بيّن بوضوح المشكلة أو الحاجة في السوق التي يستهدفها مشروعك. المستثمرين دايمًا بدهم يعرفوا إذا كانت المشكلة حقيقية ومهمة لعدد كافي من الناس (سوق كبير). الوضوح والدقة هون أساسيين ليشوفوا حجم الفرصة.",
  "2. الحل الفعّال الذي تقدمه: صف كيف يقدم مشروعك حلاً مبتكرًا ومناسبًا للمشكلة. المستثمر بدو يشوف إذا كان الحل مقنع وفريد ويقدر ينافس بفعالية.",
  "3. نموذج العمل (Business Model): وضح كيف رح تكسب أرباحك. هل هو بيع مباشر؟ اشتراكات؟ إعلانات؟ شراكات؟ لازم يكون النموذج واضح ومجرب، حتى يعرف المستثمر كيف رح ترجعله أرباحه.",
  "4. تحليل السوق والعملاء المستهدفين: وضح مين عملاءك الأساسيين؟ شو حجم السوق؟ شو خصائصه؟ إذا عندك تجارب أو بيانات أولية (Pilot/Test) بتثبت صحة فكرتك، زكرها لأنها بتعزز المصداقية.",
  "5. الميزة التنافسية (Competitive Advantage): شو بيميزك عن المنافسين؟ هل عندك تقنية حصرية؟ شراكات مميزة؟ فريق قوي وخبرة كبيرة؟ وضح أي نقاط بتخلي مشروعك صعب التقليد.",
  "6. الخطة المالية: كم المبلغ يلي بدك ياه؟ وين رح تستهلكه؟ وشو العائد المتوقع خلال سنة أو سنتين؟ المستثمرين بدهم يعرفوا إذا كان المبلغ منطقي والخطة المالية واقعية.",
  "7. خطة النمو والتوسع: شو رؤيتك للمرحلة الجاية؟ كيف بدك تطور مشروعك؟ توسع لفروع جديدة؟ إطلاق ميزات إضافية؟ المستثمر بحب يشوف طموح مدروس.",
  "8. الفريق: عرفنا بفريقك. مين معك؟ شو خبراتهم ومجالاتهم؟ المستثمرين بيهتموا كتير بالتيم، لأنه عامل حاسم بنجاح أي مشروع.",
  "9. حالة المشروع الحالية (Stage): هل عندك منتج مبدئي (MVP)؟ مستخدمين فعليين؟ أرباح مبدئية؟ أو بعدك فكرة؟ وضح المرحلة الحالية لأنه بتساعد المستثمرين يعرفوا مستوى المخاطرة.",
  "10. أهداف اللقاء: وضح ليش طالب اللقاء؟ بدك تمويل؟ شراكة؟ نصيحة؟ المستثمرين بيحبوا يكون الريادي واضح بأهدافه وطموحه."
];

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const lowered = message.toLowerCase();

 
   if (lowered.includes("كيف أبدأ") || lowered.includes("شو الخطوات")) {
    return NextResponse.json({
      success: true,
      reply: 
 ` للبدء، يمكنك كتابة:
  - بدي 5 مشاريع تقنية بميزانية 1000 دولار
  - أو: بدي مشاريع تم التواصل معها
  - أو: بدي مشروع صناعي بميزانية 500 دولار

  يمكنك أيضًا تخصيص طلبك مثل
  
  : "بدي 6 مشاريع زراعية بـ 1500 دولار".,`
    });
  }
  if (lowered.includes("كيفية اضافة مشروع بشكل كامل")||lowered.includes("مشروع بشكل كامل")) {
    return NextResponse.json({
      success: true,
      reply: 
`
1.أكتب اسم مشروعك ضمن حقل "اسم المشروع" على سبيل المثال متجر الكتروني للمنتجات المحلية.
2.حدد نوع مشروعك (تجاري-تقني-زراعي-صناعي) بمثالنا نوع المشروع تجاري.
3.اكتب وصف لمشروعك بمثالنا "منصة رقمية لبيع منتجات حرفية ومنزلية محلية".
4.حدد ميزانية لمشروعك وفقنا لدراسة الجدوى الأقتصادية الخاصة بمشروعك بمثالنا "1000$".
5.انقر زر "اضافة مشروع عبر ملء نموذج".
6.يظهر لديك فورم خاص لأكمال معلومات المشروع ,فيما يخص النقاط التي يجب التركيز عليها قبل نشر مشروع من قبل الريادي,يمكنك الأجابة عليها وفق دراستك لمشروعك الخاص,نموذج يوضح النقاط الأساسية لمشروع متجر الكتروني للمنتجات المحلية:
--------------------------------------------------
6.1.وصف دقيق للمشكلة "صعوبة الوصول للمنتجات المحلية".
6.2.الحل الفعال:"متجر الكتروني متخصص".
6.3.نموذج العمل :"عمولة على المبيعات".
6.4.العملاء:"المهتمون بالحرف المحلية".
6.5.الميزة التنافسية:"دعم المجتمع المحلي".
6.6.الخطة المالية:"تطوير المنصة والتسويق".
6.7.خطة النمو والتوسع:"شراكات مع الحرافيين".
6.8.الفريق:"مسوقون و تقنييون".
6.9.حالة المشروع:"تصميم المنصة قيد التطوير".
6.10.أهداف اللقاء:"دعم المشروع بنسبة 20%".
--------------------------------------------
ملاحظة:تذكر أن جميع المعلومات السابقة ستظهر للمستثمرين ,كن دقيق في أجابتك ,المستثمرين يعتمدون على ماسابق في اختيار مشروعك.
`
    });
  }
  if (lowered.includes("النقاط التي يجب التركيز عليها")) {
    return NextResponse.json({
      success: true,
      reply: 
`النقاط التي يجب التركيز عليها قبل نشر المشروع من قبل الريادي
قبل نشر مشروعك أو التواصل مع مستثمر، تأكد من تحضير النقاط التالية التي يتوقعها أي مستثمر جاد:

${criteriaQuestions}
....................................
هالعشر نقاط هي مستندة لمعايير عالمية لريادة الأعمال، وبشكل خاص بيتم تبنيها من قبل:

1. Y Combinator (YC):
حاضنة أعمال أمريكية، عندها تركيز كبير على فهم المشكلة وحلها بفعالية، مع نموذج عمل قوي وسوق واضح.


2. Sequoia Capital:
شركة استثمار مخاطر عالمية، عندها نموذج لتقييم المشاريع الناشئة اسمه “Sequoia Pitch Deck”، وبيعتمد على توضيح:

المشكلة

الحل

السوق

الفريق

الميزة التنافسية

المالية



3. Startup School (YC):
برنامج تعليمي لرياديين، بيعطي إرشادات تفصيلية حول:

صياغة عرض مقنع

بناء خطة مالية واضحة

فهم السوق والميزة التنافسية



4. Pitch Deck Standards (مثل DocSend وGuy Kawasaki):
هالمصادر بتحكي عن ضرورة هيكلة أي عرض تقديمي (Pitch) لهالشروحات:

المشكلة

الحل

السوق

الفريق

التوسع

المالية



5. مبادئ Lean Startup (Eric Ries):
تركيزه على تجربة سريعة (MVP) والتحقق من فرضيات السوق والعملاء.




---

باختصار:
هالنقاط العشرة هي تلخيص لأفضل ممارسات ومعايير تقييم المشاريع الريادية عند أكبر المستثمرين العالميين، خاصة بـ:

Y Combinator

Sequoia

DocSend

Lean Startup

Startup School


وهي معتمدة بشكل واسع عالميًا لأنها بتساعد المستثمرين والرياديين ياخدوا قرار أفضل بتمويل المشاريع.
طبعًا، هذه النقاط مهمة جدًا. التطبيق والمشروع لح يتعدل على أساس هذه النقاط.
`
    });
  }

  const filePath = path.join(process.cwd(), "data", "ai-suggestions.json");
  const fileData = await fs.readFile(filePath, "utf-8");
  const allProjects: ProjectData[] = JSON.parse(fileData);

  if (lowered.includes("تم التواصل")) {
    await mongoose.connect(process.env.MONGODB_URI!);
    const supports = await Support.find({})
      .populate("project", "-creator -__v -createdAt -updatedAt")
      .lean();

    const contactedProjects = supports.map((s) => s.project);
    return NextResponse.json({
      success: true,
      reply: JSON.stringify(contactedProjects.slice(0, 10), null, 2),
    });
  }

  // هنا التعديل: دعم "مشروع" أو "مشاريع"
  const countMatch = lowered.match(/(\d+)\s*مشاريع?/);
  let requestedCount = 5;
  if (countMatch) {
    const requested = parseInt(countMatch[1]);
    requestedCount = requested > 10 ? 10 : requested;
  }

  const typeMap = {
    "زراعي": "زراعي",
    "تقني": "تقني",
    "تجاري": "تجاري",
    "صناعي": "صناعي",
  };
  const type = Object.keys(typeMap).find((t) => lowered.includes(t)) || "";

  const budgetMatch = lowered.match(/(\d+)\s*دولار|(\d+)\s*\$/);
  const budget = budgetMatch ? parseInt(budgetMatch[1] || budgetMatch[2]) : Infinity;

  let filtered = allProjects;
  if (type) {
    filtered = filtered.filter((p) => p.type === type);
  }
  if (budget !== Infinity) {
    filtered = filtered
      .filter((p) => p.budget <= budget)
      .sort((a, b) => Math.abs(a.budget - budget) - Math.abs(b.budget - budget));
  }

  const finalCount = Math.min(requestedCount, filtered.length);
  const selected = filtered.slice(0, finalCount);

  return NextResponse.json({
    success: true,
    reply: JSON.stringify(selected, null, 2),
  });
}