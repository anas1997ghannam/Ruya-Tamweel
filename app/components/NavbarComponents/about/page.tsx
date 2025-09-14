// app/about/page.tsx
"use client";
import {
  Box,
  Typography,
  Container,
  Divider,
  Grid,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { pink } from "@mui/material/colors";
const AboutPage = () => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        py: 6,
        pt: "68px",
      }}
    >
      <Container sx={{ color: "text.primary" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          sx={{ color: theme.customColors.accent }}
        >
          من نحن
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>رؤية وتمويل</strong> هي منصة رقمية متخصصة في ربط الرياديين
          بالمستثمرين، بهدف دعم المشاريع الريادية الطموحة وتحويل الأفكار إلى
          واقع ملموس. نحن نؤمن أن كل فكرة مبتكرة تستحق فرصة، وأن التعاون بين
          العقول الريادية والتمويل الذكي هو أساس النجاح المستدام.
        </Typography>

        <Divider sx={{ my: 4, borderColor: theme.customColors.accent }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          رؤيتنا
        </Typography>
        <Typography variant="body1" paragraph>
          تمكين رواد الأعمال والمستثمرين من بناء مستقبل مشترك، قائم على الابتكار
          والثقة والفرص العادلة.
        </Typography>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          مهمتنا
        </Typography>
        <Typography variant="body1" paragraph>
          - تسهيل عرض المشاريع الريادية بطريقة احترافية.
          <br />
          - تمكين المستثمرين من استكشاف الفرص الواعدة ودعمها.
          <br />- توفير بيئة تفاعلية وآمنة تضمن الشفافية وسهولة التواصل بين
          الطرفين.
        </Typography>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          لماذا "رؤية وتمويل"؟
        </Typography>
        <Typography variant="body1" paragraph>
          - واجهة استخدام سهلة تدعم العربية بالكامل.
          <br />
          - نظام إشعارات ذكي يُبقيك على اطلاع بكل تفاعل.
          <br />
          - دعم متبادل من خلال رسائل بريدية تلقائية.
          <br />- فلترة دقيقة للمشاريع حسب النوع والميزانية.
        </Typography>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          قيمنا
        </Typography>
        <Typography variant="body1" paragraph>
          - الشفافية: كل تفاعل موثّق وواضح.
          <br />
          - الثقة: نحمي بياناتك ونضمن جديّة المشاريع والدعم.
          <br />
          - الابتكار: نستخدم أحدث التقنيات لتوفير تجربة سلسة.
          <br />- الاستدامة: نشجع المشاريع التي تخلق أثرًا حقيقيًا.
        </Typography>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          من خلف المشروع؟
        </Typography>
        <Typography variant="body1" paragraph>
          "رؤية وتمويل" تم تطويرها بأيادٍ عربية، بشغف حقيقي لريادة الأعمال، بدعم
          من خبراء في تطوير البرمجيات، تصميم تجربة المستخدم، والاستثمار الريادي.
        </Typography>

        <Divider sx={{ my: 4, borderColor: theme.customColors.accent }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom mt={6}>
          مراحل عمل المنصة
        </Typography>
        <Grid container spacing={4} sx={{ my: 2 }}>
          <Grid sx={{ xs: 12, md: 3 }}>
            <Stack alignItems="center" spacing={1}>
              <EmojiObjectsIcon sx={{ fontSize: 40, color: "primary.main" }} />
              <Typography fontWeight="bold">أضف فكرتك</Typography>
              <Typography variant="body2" textAlign="center">
                أنشئ مشروعك الريادي وشاركه مع شبكة واسعة من المستثمرين.
              </Typography>
            </Stack>
          </Grid>
          <Grid sx={{ xs: 12, md: 3 }}>
            <Stack alignItems="center" spacing={1}>
              <HandshakeIcon sx={{ fontSize: 40, color: "primary.main" }} />
              <Typography fontWeight="bold">تلقَّ الدعم</Typography>
              <Typography variant="body2" textAlign="center">
                سيتواصل المستثمرون المهتمون بمشروعك ويدعمونك.
              </Typography>
            </Stack>
          </Grid>
          <Grid sx={{ xs: 12, md: 3 }}>
            <Stack alignItems="center" spacing={1}>
              <SupportAgentIcon sx={{ fontSize: 40, color: "primary.main" }} />
              <Typography fontWeight="bold">تواصل مباشر</Typography>
              <Typography variant="body2" textAlign="center">
                يتم تحديد موعد لقاء مباشر بينك وبين المستثمر.
              </Typography>
            </Stack>
          </Grid>
          <Grid sx={{ xs: 12, md: 3 }}>
            <Stack alignItems="center" spacing={1}>
              <RocketLaunchIcon sx={{ fontSize: 40, color: "primary.main" }} />
              <Typography fontWeight="bold">انطلق</Typography>
              <Typography variant="body2" textAlign="center">
                بفضل الدعم، ابدأ رحلتك الريادية بثقة واستقلالية.
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: theme.customColors.accent }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          تواصل معنا
          <Box
            sx={{
              backgroundColor: "customColors.filter",
              borderRadius: 4,
              py: 6,
              px: 4,
              mt: 6,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              جاهز تبدأ مشروعك؟
            </Typography>
            <Typography variant="body1" paragraph>
              انضم الآن إلى "رؤية وتمويل" وابدأ رحلتك في عالم الريادة والدعم
              الاستثماري.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/")}
              sx={{
                mt: 2,
                px: 6,
                borderRadius: 8,
                background: theme.customColors.accent,
              }}
            >
              ابدأ الآن
            </Button>
          </Box>
        </Typography>
        <Typography variant="body1" paragraph>
          نحن هنا لأي استفسار أو ملاحظة. يمكنك مراسلتنا عبر البريد التالي:
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          support@ro2ya-tamweel.com
        </Typography>
        <Typography variant="body2" color="text.secondary">
          عادة نرد خلال 24 ساعة. نحب أن نسمع منكم دائمًا!
        </Typography>

        <Divider sx={{ my: 4, borderColor: theme.customColors.accent }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            كن جزءًا من المجتمع، وابدأ رحلتك اليوم.
          </Typography>
          <Image
            src="/images/logo.jpg"
            alt="شعار رؤية وتمويل"
            width={40}
            height={40}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
              objectPosition: "center",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;
