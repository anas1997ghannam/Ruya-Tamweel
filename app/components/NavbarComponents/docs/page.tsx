//path-->app/docs/page.tsx
"use client";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  Divider,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import InteractionSection from "./interactionSection/InteractionSection";
import EntrepreneurDocs from "./entrepreneurDocs/EntrepreneurDocs";
import InvestorDocs from "./investorDocs/InvestorDocs";
import BlogDocs from "./posts/posts";

const sections = [
  { id: "intro", label: "مقدمة" },
  { id: "entrepreneur", label: "دليل الريادي" },
  { id: "investor", label: "دليل المستثمر" },
  { id: "blog", label: "المدونة" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const DocsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const SideMenu = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        التوثيق
      </Typography>
      <Divider sx={{ mb: 2, backgroundColor: theme.customColors.accent }} />
      <List>
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton onClick={() => scrollTo(section.id)}>
              <ListItemText
                primary={section.label}
                sx={{ textAlign: "right" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        pt: "68px",
      }}
    >
      {/* القائمة الجانبية */}
      {isMobile ? (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {SideMenu}
        </Drawer>
      ) : (
        <Box
          sx={{
            width: 250,
            flexShrink: 0,
            position: "sticky",
            top: 80,
            height: "100%",
            borderLeft: "1px solid #222",
          }}
        >
          {SideMenu}
        </Box>
      )}

      {/* المحتوى الرئيسي */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* مقدمة */}
        <Box id="intro" mb={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: theme.customColors.accent }}
          >
            مقدمة
          </Typography>
          <Typography variant="h5" gutterBottom>
            ما هو رؤية وتمويل؟
          </Typography>
          <Typography>
            منصة تهدف لربط الرياديين بالمستثمرين لدعم المشاريع الناشئة بطريقة
            فعّالة وسلسة. تساعد على عرض أفكار المشاريع واستقبال التمويل
            والمتابعة بشكل شفاف.
          </Typography>

          <Box mt={3}>
            <Typography variant="h6">من هم المستخدمون؟</Typography>
            <Typography>
              - الريادي: يعرض مشروعه وينتظر الدعم.
              <br />- المستثمر: يطّلع على المشاريع ويقرر من يدعم.
            </Typography>
          </Box>
        </Box>

        {/* دليل الريادي */}
        <EntrepreneurDocs />

        {/* دليل المستثمر */}
        <InvestorDocs />
        {/* مشاركة الأفكار عبر المدونة */}
        <BlogDocs />
        {/* الأسئلة الشائعة */}
        <Box id="faq" mb={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: theme.customColors.accent }}
          >
            الأسئلة الشائعة
          </Typography>
          <Typography>
            <strong>هل يمكن تعديل المعلومات؟</strong>
            <br />
            نعم، يمكنك تعديل بياناتك أو مشروعك من لوحة التحكم.
            <br />
            <br />
            <strong>هل يوجد شروط لدعم المشاريع؟</strong>
            <br />
            نعم، يجب على المستثمر تحديد تاريخ اللقاء والموقع، وتأكيد الدعم عبر
            البريد.
            <br />
            <br />
            <strong>كيف يتم التواصل بين الريادي والمستثمر؟</strong>
            <br />
            يتم إرسال إشعارات للطرفين، مع تفاصيل اللقاء عبر البريد الإلكتروني.
            <InteractionSection />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DocsPage;
