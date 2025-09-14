"use client";

import { Box, Divider, Typography, useTheme } from "@mui/material";

const BlogDocs = () => {
  const theme = useTheme();

  return (
    <Box id="blog" mb={6}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: theme.customColors?.accent || "primary.main" }}
      >
        مشاركة الأفكار عبر المدونة
      </Typography>

      <Typography variant="h6" gutterBottom>
        شارك أفكارك وتجاربك
      </Typography>

      <Typography sx={{ mb: 2 }}>
        تتيح لك منصة "رؤية وتمويل" إمكانية مشاركة أفكارك وخبراتك عبر قسم
        المدونة. يمكنك كتابة مقالات حول ريادة الأعمال، التحديات التي تواجهها، أو
        أي محتوى مفيد للمجتمع.
      </Typography>

      <Typography sx={{ mb: 1 }}>يمكنك إدارة مقالاتك من خلال:</Typography>

      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>إضافة مقال جديد من خلال زر "إضافة مقال".</li>
        <li>عرض كل مقالاتك في قسم "مدوناتي".</li>
        <li>تعديل أو حذف مقالاتك في أي وقت.</li>
      </Box>

      <Typography>
        هذه الأداة مفيدة لمشاركة المعرفة، وبناء تفاعل حقيقي مع المهتمين.
      </Typography>

      <Divider
        sx={{
          my: 2,
          borderColor: theme.customColors?.accent || "primary.main",
        }}
      />
    </Box>
  );
};

export default BlogDocs;
