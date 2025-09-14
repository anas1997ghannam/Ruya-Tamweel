import { Box, Typography, Divider, useTheme } from "@mui/material";

const InteractionSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      {/* العنوان الرئيسي */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        التفاعل بين الريادي والمستثمر
      </Typography>

      {/* دعم مشروع */}
      <Typography variant="h6" fontWeight="bold" mt={2}>
        1. عند دعم مشروع:
      </Typography>
      <Typography sx={{ mb: 2 }}>
        عندما يقوم المستثمر بدعم مشروع أحد الرياديين، يتم تنفيذ الإجراءات
        التالية:
      </Typography>

      <Box component="ul" sx={{ pl: 3, mb: 3 }}>
        <li>يُضاف اسم المستثمر إلى لائحة الداعمين لهذا المشروع.</li>
        <li>
          يتم جدولة لقاء بين الريادي والمستثمر، مع تحديد التاريخ، الوقت،
          والمكان.
        </li>
        <li>
          يُرسل إيميل تلقائي للريادي يحتوي على تفاصيل اللقاء كاملة، مع عبارة
          ترحيبية تؤكد نجاح الدعم.
        </li>
      </Box>

      <Typography variant="subtitle1" fontWeight="bold" mt={2}>
        نموذج البريد المرسل:
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          fontFamily: "monospace",
          whiteSpace: "pre-line",
          mt: 1,
          mb: 3,
        }}
      >
        {`تم دعم مشروعك بنجاح!
مرحباً [اسم الريادي]،
لقد قام المستثمر [اسم المستثمر] بدعم مشروعك. إليك تفاصيل اللقاء:

اسم المشروع: [اسم المشروع]
رقم المستثمر: [رقم الهاتف]
الإيميل: [البريد الإلكتروني]
التاريخ: [تاريخ اللقاء]
الوقت: [الساعة]
المكان: [المدينة/الموقع]

نتمنى لك كل التوفيق في مشروعك!`}
      </Box>

      <Divider
        sx={{
          borderColor: theme.customColors?.accent || "primary.main",
          mb: 3,
        }}
      />

      {/* إلغاء الدعم */}
      <Typography variant="h6" fontWeight="bold" mt={3}>
        2. عند إلغاء الدعم:
      </Typography>
      <Typography sx={{ mb: 2 }}>
        في حال قام المستثمر بإلغاء الدعم، يتم تنفيذ ما يلي:
      </Typography>

      <Box component="ul" sx={{ pl: 3, mb: 3 }}>
        <li>يُحذف المستثمر من لائحة الداعمين للمشروع.</li>
        <li>يُرسل إيميل اعتذار تلقائي للريادي يُبلغه فيه بإلغاء اللقاء.</li>
      </Box>

      <Typography variant="subtitle1" fontWeight="bold" mt={2}>
        محتوى الإيميل:
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          fontFamily: "monospace",
          whiteSpace: "pre-line",
          mt: 1,
          mb: 3,
        }}
      >
        {`تم إلغاء دعم مشروعك
عذرًا [اسم الريادي]،
نأسف لإبلاغك بأن المستثمر [اسم المستثمر] قد ألغى دعمه لمشروعك.
نأمل أن تجد فرصًا جديدة قريبًا.`}
      </Box>

      <Divider
        sx={{
          borderColor: theme.customColors?.accent || "primary.main",
          mb: 3,
        }}
      />

      {/* نصائح للطرفين */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        نصائح وملاحظات مهمة للطرفين (الريادي والمستثمر)
      </Typography>

      <Typography variant="h6" fontWeight="bold" mt={2}>
        للرياديين:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 3 }}>
        <li>
          تأكد من متابعة بريدك الإلكتروني باستمرار، فقد تتلقى إشعارًا بموعد لقاء
          مهم.
        </li>
        <li>
          جهّز عرضك التقديمي قبل اللقاء، وكن مستعدًا للإجابة على أسئلة المستثمر.
        </li>
        <li>
          التزم بموعد اللقاء، وكن واضحًا بشأن أهداف مشروعك وطريقة استخدام الدعم.
        </li>
      </Box>

      <Typography variant="h6" fontWeight="bold" mt={2}>
        للمستثمرين:
      </Typography>
      <Box component="ul" sx={{ pl: 3 }}>
        <li>
          عند دعم مشروع، تأكد من إدخال معلوماتك بشكل دقيق ليتمكن الريادي من
          التواصل معك.
        </li>
        <li>
          إذا كنت غير متأكد من الاستمرار في الدعم، يُفضل عدم جدولة لقاء حتى تتخذ
          قرارك النهائي.
        </li>
        <li>
          في حال قررت إلغاء الدعم، يُرسل إشعار تلقائي للريادي، لكن من الأفضل
          أيضًا التواصل الشخصي عند الإمكان.
        </li>
      </Box>
    </Box>
  );
};

export default InteractionSection;
