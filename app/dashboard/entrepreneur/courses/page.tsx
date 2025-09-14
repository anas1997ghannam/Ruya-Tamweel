// app/dashboard/entrepreneur/courses/page.tsx
"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const courseList = [
  {
    title: "ريادة الأعمال من الصفر",
    platform: "FutureLearn",
    url: "https://www.futurelearn.com/course-1",
    description: "مقدمة قوية لريادة الأعمال بأسلوب مبسط للمبتدئين.",
    rating: 4.82,
  },
  {
    title: "أساسيات الابتكار التجاري",
    platform: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/course-2",
    description: "تقنيات تسويقية فعالة لرواد الأعمال الجدد.",
    rating: 4.99,
  },
  {
    title: "بناء نموذج العمل التجاري",
    platform: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu/course-3",
    description: "مسار تدريبي مميز للانتقال من صاحب فكرة إلى رائد أعمال ناجح.",
    rating: 4.94,
  },
  {
    title: "دورة Y Combinator لرواد الأعمال",
    platform: "Y Combinator",
    url: "https://www.startupschool.org/",
    description: "أقوى مسرعة أعمال بالعالم تقدم محتوى مجاني ومفيد جداً.",
    rating: 5.0,
  },
  {
    title: "تصميم القيمة الفريدة للمشاريع",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/value-proposition",
    description: "كيف تصمم عرض قيمة لا يُقاوم لمنتجك أو خدمتك.",
    rating: 4.91,
  },
  {
    title: "استراتيجيات تمويل الشركات الناشئة",
    platform: "edX",
    url: "https://www.edx.org/course/startup-financing",
    description: "أدوات فعالة لفهم طرق التمويل وجذب المستثمرين.",
    rating: 4.76,
  },
  {
    title: "كيف تبدأ شركتك الناشئة",
    platform: "Foundr",
    url: "https://foundr.com/course/how-to-start",
    description: "مراحل الانطلاق العملي نحو الريادة.",
    rating: 4.88,
  },
  {
    title: "إدارة فرق العمل الريادية",
    platform: "Udemy",
    url: "https://www.udemy.com/course/startup-team-management",
    description: "كيفية بناء وإدارة فريق قوي لشركتك الناشئة.",
    rating: 4.6,
  },
  {
    title: "اختبار الفرضيات التجارية",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=test-hypothesis",
    description: "أهمية التحقق من صحة فكرتك قبل الإطلاق.",
    rating: 4.71,
  },
  {
    title: "التسويق الرقمي للمبتدئين",
    platform: "HubSpot Academy",
    url: "https://academy.hubspot.com/courses/digital-marketing",
    description: "دورة تسويق رقمي شاملة مجانًا.",
    rating: 4.92,
  },
  {
    title: "استراتيجية النمو الريادي",
    platform: "Startup.com",
    url: "https://startup.com/growth-strategy",
    description: "خطط عملية لنمو وتوسع شركتك.",
    rating: 4.83,
  },
  {
    title: "إطلاق منتج رقمي",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/digital-product-launch",
    description: "كيفية التخطيط وإطلاق منتج رقمي ناجح.",
    rating: 4.87,
  },
  {
    title: "تحليل السوق والمنافسة",
    platform: "Udacity",
    url: "https://www.udacity.com/course/market-analysis",
    description: "تعلم أدوات تحليل السوق والمنافسين.",
    rating: 4.79,
  },
  {
    title: "التخطيط المالي للشركات الناشئة",
    platform: "edX",
    url: "https://www.edx.org/course/startup-financial-planning",
    description: "بناء ميزانية وخطة مالية واقعية لمشروعك.",
    rating: 4.81,
  },
  {
    title: "أساسيات تجربة المستخدم للمشاريع",
    platform: "Interaction Design Foundation",
    url: "https://www.interaction-design.org/courses/startup-ux",
    description: "صمم تجربة مستخدم مميزة لمنتجك.",
    rating: 4.95,
  },
  {
    title: "التفاوض مع المستثمرين",
    platform: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/startup-investor-negotiation",
    description: "فن التفاوض لجذب تمويل عادل وناجح.",
    rating: 4.89,
  },
  {
    title: "العروض التقديمية للمستثمرين",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=pitch-deck-tips",
    description: "كيف تقدم شركتك بطريقة تقنع المستثمرين.",
    rating: 4.86,
  },
  {
    title: "ريادة الأعمال الاجتماعية",
    platform: "FutureLearn",
    url: "https://www.futurelearn.com/courses/social-entrepreneurship",
    description: "ابتكر حلولًا للمجتمع بطريقة ريادية مستدامة.",
    rating: 4.74,
  },
  {
    title: "بناء الهوية البصرية للعلامة",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/branding-basics",
    description: "أسس هوية بصرية قوية لعلامتك التجارية.",
    rating: 4.9,
  },
  {
    title: "ريادة الأعمال في التقنية",
    platform: "Harvard Online",
    url: "https://online-learning.harvard.edu/course/tech-entrepreneurship",
    description: "فهم التحديات والفرص في الشركات التقنية الناشئة.",
    rating: 4.93,
  },
];

export default function EntrepreneurCoursesPage() {
  return (
    <Box sx={{ marginTop: "68px", p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
      >
        أفضل الكورسات لريادة الأعمال
      </Typography>

      <Grid container spacing={3}>
        {courseList.map((course, index) => (
          <Grid key={index}>
            <Card
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 4,
                boxShadow: 4,
                height: 330,
                width: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.platform}
                </Typography>
                <Typography variant="body1" sx={{ my: 1 }}>
                  {course.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 1,
                  }}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      fontSize="small"
                      sx={{
                        color:
                          i < Math.round(course.rating) ? "#FFD700" : "#ccc",
                      }}
                    />
                  ))}
                  <Typography variant="body2" ml={1}>
                    {course.rating.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                href={course.url}
                target="_blank"
                sx={{ m: 2 }}
              >
                ابدأ الآن
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
