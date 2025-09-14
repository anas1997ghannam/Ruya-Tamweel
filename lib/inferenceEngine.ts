import { knowledgeBase } from "./knowledgeBase";

interface Answer {
  number: number;
  answer: string;
}

export function evaluateProject(answers: Answer[]) {
  if (!answers || answers.length === 0) {
    return {
      status: "disabled",
      score: 0,
      explanations: ["لم يتم إدخال أي إجابات."],
    };
  }

  let totalScore = 0;
  let explanations: string[] = [];

  knowledgeBase.forEach((criterion) => {
    const ans = answers.find((a) => a.number === criterion.id);
    let criterionScore = 0;

    if (ans && ans.answer.trim() !== "") {
      const text = ans.answer.trim();

      const meetsLength = text.length >= criterion.evaluationRules.minLength;
      const hasKeyword =
        criterion.evaluationRules.keywords &&
        criterion.evaluationRules.keywords.some((k) => text.includes(k));

      if (meetsLength && hasKeyword) {
        criterionScore = 1.0; // ✅ الشرطان تحققوا
      } else if (meetsLength || hasKeyword) {
        criterionScore = 0.5; // ⚠️ تحقق شرط واحد فقط
        explanations.push(criterion.failureMessage);
      } else {
        criterionScore = 0.0; // ❌ لا طول ولا كلمات
        explanations.push(criterion.failureMessage);
      }
    } else {
      criterionScore = 0.0; // ❌ ما في إجابة أصلاً
      explanations.push(criterion.failureMessage);
    }

    // الحد الأقصى 1.0 لكل معيار
    totalScore += Math.min(1, criterionScore) * criterion.weight;
  });

  const percentage = totalScore * 100;

  let status = "disabled";
  if (percentage >= 70) {
    status = "active";
    explanations = []; // إذا كان المشروع فعال ما في داعي نرجع أسباب
  }

  return { status, score: Number(percentage.toFixed(2)), explanations };
}
