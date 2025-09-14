import { Box, Typography, Divider, useTheme } from "@mui/material";

const InvestorDocs = () => {
  const theme = useTheme();

  return (
    <Box id="investor" mb={6}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: theme.customColors?.accent || "primary.main" }}
      >
        دليل المستثمر: لوحة التحكم
      </Typography>

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        نظرة عامة
      </Typography>

      <Typography sx={{ mb: 1 }}>
        لوحة تحكم المستثمر هي الواجهة الرئيسية التي تظهر للمستثمر بعد تسجيل
        الدخول، وتسمح له بـ:
      </Typography>

      <Box component="ul" sx={{ pl: 3, mb: 3 }}>
        <li>تصفح جميع المشاريع المعروضة.</li>
        <li>طلب لقاء بصاحب مشروع معيّن بالتواصل مع صاحب المشروع (الريادي).</li>
        <li>إضافة مشروع إلى المفضلة.</li>
        <li>فلترة المشاريع حسب النوع أو الميزانية.</li>
        <li>تتبع المشاريع التي قام بجدولة لقاء لها أو إضافتها للمفضلة.</li>
      </Box>

      <Divider
        sx={{
          my: 2,
          borderColor: theme.customColors?.accent || "primary.main",
        }}
      />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        1. Tabs (التصنيفات في الأعلى)
      </Typography>
      <Typography sx={{ mb: 1 }}>تصنيفات رئيسية في الأعلى:</Typography>
      <Box component="ul" sx={{ pl: 3, mb: 3 }}>
        <li>كل المشاريع: عرض جميع المشاريع المتاحة.</li>
        <li>المفضلة: عرض المشاريع التي أضافها المستخدم إلى المفضلة.</li>
        <li>المجدولة: عرض المشاريع التي قام بجدولة لقاء لها.</li>
        <li>فلترة: تحديد نوع المشروع أو ميزانية معينة لتصفية النتائج.</li>
      </Box>

      <Divider
        sx={{
          my: 2,
          borderColor: theme.customColors?.accent || "primary.main",
        }}
      />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        2. بطاقة المشروع (Project Card)
      </Typography>
      <Typography sx={{ mb: 1 }}>
        كل مشروع يظهر على شكل بطاقة تحتوي على:
      </Typography>

      <Box component="ul" sx={{ pl: 3 }}>
        <li>اسم المشروع.</li>
        <li>نوعه.</li>
        <li>ميزانيته.</li>
        <li>وصف مختصر.</li>
      </Box>

      <Typography mt={2} mb={1}>
        وتتضمن البطاقة أزرار:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 3 }}>
        <li>إضافة للمفضلة / إزالة من المفضلة.</li>
        <li> جدولة لقاء / إلغاء اللقاء.</li>
      </Box>

      <Divider
        sx={{
          my: 2,
          borderColor: theme.customColors?.accent || "primary.main",
        }}
      />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        3. جدولة لقاء للمشروع
      </Typography>
      <Typography sx={{ mb: 1 }}>
        عند الضغط على زر "جدولة لقاء للمشروع":
      </Typography>
      <Box component="ul" sx={{ pl: 3 }}>
        <li>
          يظهر نموذج لإدخال: المكان المقترح للقاء، رقم الهاتف، التاريخ والوقت.
        </li>
      </Box>
      <Typography mt={2} mb={3}>
        بعد الإرسال: يتم إرسال إيميل منسّق إلى الريادي يحتوي على المعلومات
        المدخلة، ويتغير زر "جدولة لقاء" إلى "إلغاء اللقاء".
      </Typography>

      <Divider
        sx={{
          my: 2,
          borderColor: theme.customColors?.accent || "primary.main",
        }}
      />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        4. إلغاء اللقاء
      </Typography>
      <Typography sx={{ mb: 1 }}>عند الضغط على "إلغاء اللقاء":</Typography>
      <Box component="ul" sx={{ pl: 3, mb: 3 }}>
        <li>يظهر Dialog تأكيد.</li>
        <li>
          عند التأكيد، يتم إرسال إيميل اعتذار للريادي ويختفي المشروع من قائمة
          "المجدولة".
        </li>
      </Box>

      <Divider
        sx={{
          my: 2,
          borderColor: theme.customColors?.accent || "primary.main",
        }}
      />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        التنبيهات
      </Typography>
      <Typography>
        يتم عرض إشعارات باستخدام react-toastify بعد كل عملية (نجاح، فشل، تحذير).
        لا يمكن جدولة لقاء نفس المشروع أكثر من مرة.
      </Typography>
    </Box>
  );
};

export default InvestorDocs;
