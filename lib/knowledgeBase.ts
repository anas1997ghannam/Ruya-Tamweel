export interface Criterion {
  id: number;
  name: string;
  weight: number;
  description: string;
  evaluationRules: {
    minLength: number;
    keywords?: string[];
  };
  failureMessage: string; //faulure message explanation
}

export const knowledgeBase: Criterion[] = [
  {
    id: 1,
    name: "Problem Clarity",
    weight: 0.15,
    description: "وصف دقيق للمشكلة التي يحلها المشروع",
    evaluationRules: {
      minLength: 20,
      keywords: ["مشكلة", "حاجة", "سوق", "طلب", "معاناة", "ضعف", "فرصة"],
    },
    failureMessage: "الوصف غير واضح للمشكلة التي يحلها المشروع.",
  },
  {
    id: 2,
    name: "Solution Effectiveness",
    weight: 0.15,
    description: "الحل الفعّال الذي يقدمه المشروع",
    evaluationRules: {
      minLength: 20,
      keywords: ["حل", "ابتكار", "تطبيق", "خدمة", "تقنية", "منصة", "ميزة"],
    },
    failureMessage: "الحل المقترح غير واضح أو غير فعال بما يكفي.",
  },
  {
    id: 3,
    name: "Business Model",
    weight: 0.1,
    description: "نموذج العمل وآلية تحقيق الأرباح",
    evaluationRules: {
      minLength: 15,
      keywords: ["اشتراك", "بيع", "إعلانات", "شراكات", "عمولة", "تجارة"],
    },
    failureMessage: "نموذج العمل وآلية الربح غير موضحة.",
  },
  {
    id: 4,
    name: "Market Analysis",
    weight: 0.1,
    description: "تحليل السوق والعملاء المستهدفين",
    evaluationRules: {
      minLength: 20,
      keywords: ["عملاء", "سوق", "مستهدف", "شركات", "منافسة", "طلب", "إحصائيات"],
    },
    failureMessage: "تحليل السوق والعملاء المستهدفين غير كافٍ.",
  },
  {
    id: 5,
    name: "Competitive Advantage",
    weight: 0.1,
    description: "الميزة التنافسية التي تميز المشروع",
    evaluationRules: {
      minLength: 15,
      keywords: ["ميزة", "تفوق", "خوارزمية", "تقنية", "شراكة", "حصري", "خبرة"],
    },
    failureMessage: "الميزة التنافسية غير واضحة أو ضعيفة.",
  },
  {
    id: 6,
    name: "Financial Plan",
    weight: 0.1,
    description: "الخطة المالية وطلب التمويل",
    evaluationRules: {
      minLength: 15,
      keywords: ["تمويل", "تكاليف", "عائد", "ميزانية", "مصاريف", "إيرادات"],
    },
    failureMessage: "الخطة المالية غير مفصلة بما يكفي.",
  },
  {
    id: 7,
    name: "Growth Plan",
    weight: 0.1,
    description: "خطة النمو والتوسع المستقبلية",
    evaluationRules: {
      minLength: 15,
      keywords: ["توسع", "تطوير", "إطلاق", "ميزات", "مستقبل", "انتشار", "خطة"],
    },
    failureMessage: "خطة النمو والتوسع غير واضحة.",
  },
  {
    id: 8,
    name: "Team",
    weight: 0.1,
    description: "فريق العمل وخبراته",
    evaluationRules: {
      minLength: 10,
      keywords: ["فريق", "مطور", "مصمم", "خبرة", "مدير", "تسويق", "مهندس"],
    },
    failureMessage: "فريق العمل وخبراته غير مذكورة بوضوح.",
  },
  {
    id: 9,
    name: "Stage",
    weight: 0.05,
    description: "المرحلة الحالية للمشروع (MVP, idea, etc.)",
    evaluationRules: {
      minLength: 5,
      keywords: ["MVP", "فكرة", "إطلاق", "مستخدمين", "جاهز", "تجربة"],
    },
    failureMessage: "المرحلة الحالية للمشروع غير موضحة.",
  },
  {
    id: 10,
    name: "Meeting Goals",
    weight: 0.05,
    description: "أهداف اللقاء مع المستثمرين",
    evaluationRules: {
      minLength: 10,
      keywords: ["تمويل", "شراكة", "مستثمر", "نصيحة", "توسع", "تعاون"],
    },
    failureMessage: "أهداف اللقاء مع المستثمرين غير واضحة.",
  },
];
