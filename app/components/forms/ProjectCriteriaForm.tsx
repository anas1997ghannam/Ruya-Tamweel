//path->app/components/forms/ProjectCriteriaForm.tsx
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface ProjectCriteriaFormProps {
  onSubmit: (criteriaAnswers: string[]) => void;
}

const ProjectCriteriaForm: React.FC<ProjectCriteriaFormProps> = ({
  onSubmit,
}) => {
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(""));

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answers.some((ans) => !ans.trim())) {
      alert("الرجاء تعبئة جميع الحقول");
      return;
    }
    onSubmit(answers);
  };

  const questions: string[] = [
    "1. وصف دقيق للمشكلة التي تحلها:\nبيّن بوضوح المشكلة أو الحاجة في السوق التي يستهدفها مشروعك.",
    "2. الحل الفعّال الذي تقدمه:\nصف كيف يقدم مشروعك حلاً مبتكرًا ومناسبًا للمشكلة.",
    "3. نموذج العمل (Business Model):\nكيف ستجني الأرباح؟ اشتراكات؟ بيع مباشر؟ إعلانات؟.",
    "4. تحليل السوق والعملاء المستهدفين:\nمن هم عملاؤك؟ وما حجم السوق المحتمل؟ وهل لديك بيانات أو تجارب أولية؟",
    "5. الميزة التنافسية (Competitive Advantage):\nما الذي يميز مشروعك عن المنافسين؟ هل لديك تقنيات حصرية؟ شراكات؟ فريق قوي؟",
    "6. الخطة المالية:\nكم تحتاج من التمويل؟ وفي ماذا ستنفقه؟ ما هو العائد المتوقع خلال سنة؟",
    "7. خطة النمو والتوسع:\nما الخطوة التالية؟ كيف تنوي التوسع أو التطور مستقبلاً؟",
    "8. الفريق:\nمن يعمل معك؟ وما خبراتهم؟ الفريق عنصر حاسم للمستثمر.",
    "9. حالة المشروع الحالية (Stage):\nهل لديك MVP؟ مستخدمين؟ أرباح؟ هل أنت في مرحلة الفكرة فقط؟",
    "10. أهداف اللقاء:\nكن مستعدًا للإجابة على: لماذا تريد هذا اللقاء؟ وما الذي تأمله من المستثمر؟",
  ];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "#1f1f1f",
        p: 2,
        borderRadius: 2,
      }}
    >
      {questions.map((q, idx) => (
        <Box
          key={idx}
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: "white", whiteSpace: "pre-line" }}
          >
            {q}
          </Typography>
          <TextField
            required
            multiline
            minRows={2}
            value={answers[idx]}
            onChange={(e) => handleChange(idx, e.target.value)}
            InputProps={{ style: { color: "white" } }}
            sx={{ bgcolor: "#333", borderRadius: 2 }}
          />
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ alignSelf: "center", mt: 2 }}
      >
        إرسال البيانات
      </Button>
    </Box>
  );
};

export default ProjectCriteriaForm;
