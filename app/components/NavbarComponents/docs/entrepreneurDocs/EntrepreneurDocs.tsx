import { Box, Typography, Divider, useTheme } from "@mui/material";

const EntrepreneurDocs = () => {
  const theme = useTheme();
  return (
    <Box id="entrepreneur" mb={6}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: theme.customColors.accent }}
      >
        دليل الريادي: لوحة التحكم
      </Typography>

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        نظرة عامة
      </Typography>
      <Typography paragraph>
        لوحة تحكم الريادي تتيح له إدارة مشاريعه الخاصة، وتتبع الدعم والاهتمام
        الذي يحصل عليه كل مشروع، بالإضافة إلى إمكانية تعديل أو حذف المشاريع.
      </Typography>

      <Divider sx={{ my: 2, borderColor: theme.customColors.accent }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        1. عرض المشاريع الخاصة بي
      </Typography>
      <Typography paragraph>
        عند دخول الريادي إلى لوحة التحكم، يتم عرض جميع المشاريع التي قام
        بإضافتها. كل مشروع يظهر على شكل بطاقة تحتوي على:
      </Typography>
      <Box component="ul" sx={{ pl: 3 }}>
        <li>اسم المشروع</li>
        <li>نوعه</li>
        <li>الميزانية</li>
        <li>الوصف</li>
        <li>زر أضافة</li>
      </Box>
      <Typography mt={1}>وتتضمن كل بطاقة أزرار:</Typography>
      <Box component="ul" sx={{ pl: 3 }}>
        <li>تعديل المشروع</li>
        <li>حذف المشروع</li>
      </Box>

      <Divider sx={{ my: 2, borderColor: theme.customColors.accent }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        2. إضافة مشروع جديد
      </Typography>
      <Typography paragraph>
        نموزج أضافة المشروع دائما في مقدمة لوحة الريادي ويحوي على:
      </Typography>
      <Box component="ul" sx={{ pl: 3 }}>
        <li>زر "أقتراح مشروع بأستخدام الذكاء الاصطناعي"</li>
        <li>اسم المشروع</li>
        <li>نوع المشروع (تجاري، صناعي، تقني، زراعي...)</li>
        <li>الميزانية المطلوبة</li>
        <li>وصف مختصر</li>
      </Box>
      <Typography mt={1}>
        عند الإرسال: يتم تعبئة فورم خاص بالنقاط الأساسة بالمشروع والتي تظهر
        للمستثمرين الجادين ويتم حفظ المشروع في قاعدة البيانات ويظهر في لوحة
        التحكم فورًا.
      </Typography>

      <Divider sx={{ my: 2, borderColor: theme.customColors.accent }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        3. تعديل مشروع
      </Typography>
      <Typography paragraph>
        يمكن للريادي تعديل مشروعه في أي وقت. يتم فتح النموذج مع البيانات المعبئة
        مسبقًا، وعند الحفظ يتم تحديث المشروع مباشرة.
      </Typography>

      <Divider sx={{ my: 2, borderColor: theme.customColors.accent }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        4. حذف مشروع
      </Typography>
      <Typography paragraph>
        عند الضغط على "حذف"، يظهر Dialog تأكيد. بعد التأكيد، يتم حذف المشروع
        نهائيًا.
      </Typography>

      <Divider sx={{ my: 2, borderColor: theme.customColors.accent }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        5. التنبيهات
      </Typography>
      <Box component="ul" sx={{ pl: 3 }}>
        <li>
          عند طلب لقاء لمشروعك من قبل مستثمر، يصل إيميل لك توضح تفاصيل اللقاء.
        </li>
        <li>
          دعم مشروعك يعتمد جدا على النقاط العشر السابقة التي يتم تعبئتها في
          الفورم,لذلك أدرس مشروعك جيدا قبل نشره.
        </li>
        <li>عند إلغاء اللقاء, يصل إيميل اعتذار أيضًا.</li>
        <li>يتم عرض إشعارات باستخدام React-Toastify في جميع التفاعلات.</li>
      </Box>

      <Divider sx={{ my: 2, borderColor: theme.customColors.accent }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        6. أضافة مشروع بالذكاء الأصطناعي
      </Typography>
      <Typography>"أضافة مشروع بالذكاء الأصطناعي"، يظهر Dialog فيه:</Typography>
      <Box component="ul" sx={{ pl: 3 }}>
        <li>
          menu يتم من خلالها اختيار نوع المشروع: هل هو صناعي، تجاري، تقني، زراعي
        </li>
        <li>بعد تحديد نوع المشروع، يتم النقر على زر اقتراح</li>
        <li>
          يتم الانتظار قليلاً، من ثم يظهر لدينا 10 مشاريع تم اقتراحها بواسطة AI
          وذلك حسب النوع المقترح، كل مشروع هو ضمن card فيه:
          <Box component="ul" sx={{ pl: 3 }}>
            <li>اسم المشروع</li>
            <li>نوعه</li>
            <li>الميزانية</li>
            <li>الوصف</li>
            <li>زر أضافة</li>
          </Box>
        </li>
      </Box>
      <Typography mt={1}>
        عند الإرسال: يتم حفظ المشروع في قاعدة البيانات ويظهر في لوحة التحكم
        فورًا.
      </Typography>

      <Divider sx={{ my: 2, borderColor: theme.customColors.accent }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        ملاحظات إضافية
      </Typography>
      <Box component="ul" sx={{ pl: 3 }}>
        <li>الريادي لا يمكنه رؤية مشاريع المستثمرين أو التفاعل معهم.</li>
        <li>
          واجهة لوحة التحكم بسيطة وسريعة، ومبنية لتُستخدم على الأجهزة المحمولة
          والمكتبية.
        </li>
      </Box>
    </Box>
  );
};

export default EntrepreneurDocs;
