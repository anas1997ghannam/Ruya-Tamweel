//app/dashboard/investor/page.tsx
"use client";

import { setType, setBudget } from "@/app/redux/slices/preferencesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  fetchSupported,
  fetchFavorites,
  toggleFavorite,
  toggleSupport,
} from "@/app/redux/slices/projectsSlice";
import { RootState, AppDispatch } from "@/app/redux/store";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
  Tabs,
  Tab,
  ButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SupportDialog from "@/app/components/dialogs/SupportDialog";
import UnsupportDialog from "@/app/components/dialogs/unSupportDialog";
import { Phone } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
const criteriaQuestions = [
  "1. وصف دقيق للمشكلة التي تحلها: بيّن بوضوح المشكلة أو الحاجة في السوق التي يستهدفها مشروعك. المستثمرين دايمًا بدهم يعرفوا إذا كانت المشكلة حقيقية ومهمة لعدد كافي من الناس (سوق كبير). الوضوح والدقة هون أساسيين ليشوفوا حجم الفرصة.",
  "2. الحل الفعّال الذي تقدمه: صف كيف يقدم مشروعك حلاً مبتكرًا ومناسبًا للمشكلة. المستثمر بدو يشوف إذا كان الحل مقنع وفريد ويقدر ينافس بفعالية.",
  "3. نموذج العمل (Business Model): وضح كيف رح تكسب أرباحك. هل هو بيع مباشر؟ اشتراكات؟ إعلانات؟ شراكات؟ لازم يكون النموذج واضح ومجرب، حتى يعرف المستثمر كيف رح ترجعله أرباحه.",
  "4. تحليل السوق والعملاء المستهدفين: وضح مين عملاءك الأساسيين؟ شو حجم السوق؟ شو خصائصه؟ إذا عندك تجارب أو بيانات أولية (Pilot/Test) بتثبت صحة فكرتك، زكرها لأنها بتعزز المصداقية.",
  "5. الميزة التنافسية (Competitive Advantage): شو بيميزك عن المنافسين؟ هل عندك تقنية حصرية؟ شراكات مميزة؟ فريق قوي وخبرة كبيرة؟ وضح أي نقاط بتخلي مشروعك صعب التقليد.",
  "6. الخطة المالية: كم المبلغ يلي بدك ياه؟ وين رح تستهلكه؟ وشو العائد المتوقع خلال سنة أو سنتين؟ المستثمرين بدهم يعرفوا إذا كان المبلغ منطقي والخطة المالية واقعية.",
  "7. خطة النمو والتوسع: شو رؤيتك للمرحلة الجاية؟ كيف بدك تطور مشروعك؟ توسع لفروع جديدة؟ إطلاق ميزات إضافية؟ المستثمر بحب يشوف طموح مدروس.",
  "8. الفريق: عرفنا بفريقك. مين معك؟ شو خبراتهم ومجالاتهم؟ المستثمرين بيهتموا كتير بالتيم، لأنه عامل حاسم بنجاح أي مشروع.",
  "9. حالة المشروع الحالية (Stage): هل عندك منتج مبدئي (MVP)؟ مستخدمين فعليين؟ أرباح مبدئية؟ أو بعدك فكرة؟ وضح المرحلة الحالية لأنه بتساعد المستثمرين يعرفوا مستوى المخاطرة.",
  "10. أهداف اللقاء: وضح ليش طالب اللقاء؟ بدك تمويل؟ شراكة؟ نصيحة؟ المستثمرين بيحبوا يكون الريادي واضح بأهدافه وطموحه.",
];
export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch<AppDispatch>();
  const { projects, favorites, supported, loading } = useSelector(
    (state: RootState) => state.projects
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [unsupportDialogOpen, setUnsupportDialogOpen] = useState(false);
  const [selectProjectId, setSelectProjectId] = useState<string | null>(null);
  const [selectProjectName, setSelectProjectName] = useState<string | null>(
    null
  );
  const { type, budget } = useSelector((state: RootState) => state.preferences);
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProjectAnswers, setSelectedProjectAnswers] = useState<
    { number: number; answer: string }[]
  >([]);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchFavorites());
    dispatch(fetchSupported());
  }, [dispatch]);
  useEffect(() => {
    if (activeTab !== "filter") {
      dispatch(setBudget(null));
      dispatch(setType(null));
    }
  }, [activeTab, dispatch]);

  const handleToggleFavorite = (projectId: string) => {
    dispatch(toggleFavorite(projectId));
  };

  const handleSupportClick = (projectId: string, projectName: string) => {
    const isSupported = supported.includes(projectId);
    setSelectProjectId(projectId);
    setSelectProjectName(projectName);
    if (isSupported) setUnsupportDialogOpen(true);
    else setDialogOpen(true);
  };

  const handleDialogSubmit = async (data: {
    title: string;
    date: string;
    time: string;
    phone: string;
  }) => {
    if (!selectProjectId || !selectProjectName) {
      toast.error("حدث خطأ في اختيار المشروع، حاول مجددًا.");
      setDialogOpen(false);
      return;
    }

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: selectProjectId,
          location: data.title,
          phone: data.phone,
          date: data.date,
          time: data.time,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "فشل جدولة لقاء المشروع");
      }

      dispatch(fetchSupported());
      toast.success(`تم إرسال طلب لقاء للمشروع "${selectProjectName}"`);
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ أثناء طلب لقاء صاحب المشروع");
    } finally {
      setDialogOpen(false);
    }
  };

  const handleUnsupportConfirm = async () => {
    if (!selectProjectId || !selectProjectName) {
      toast.error("حدث خطأ، حاول مجددًا.");
      setUnsupportDialogOpen(false);
      return;
    }

    try {
      const res = await fetch("/api/support", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: selectProjectId }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "فشل إلغاء اللقاء");
      }

      dispatch(fetchSupported());
      toast.info(`تم إلغاء اللقاء بصاحب المشروع "${selectProjectName}"`);
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ أثناء إلغاء اللقاء");
    } finally {
      setUnsupportDialogOpen(false);
    }
  };
  const filteredProjects = projects.filter((p) => {
    const matchesTab =
      activeTab === "favorites"
        ? favorites.includes(p._id)
        : activeTab === "supported"
        ? supported.includes(p._id)
        : true;
    const matchesType = type ? p.type === type : true;
    const matchesBudget = budget
      ? budget === "صغير"
        ? p.budget < 5000
        : budget === "متوسط"
        ? p.budget >= 5000 && p.budget < 20000
        : p.budget >= 20000
      : true;
    return matchesTab && matchesBudget && matchesType;
  });
  if (loading)
    return <Typography textAlign="center">جاري التحميل...</Typography>;

  return (
    <Box
      sx={{
        direction: "rtl",
        height: "100vh",
        overflow: "scroll",
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        pt: "68px",
      }}
    >
      <ToastContainer position="top-center" theme="dark" />
      <Typography variant="h3" gutterBottom textAlign="center" marginTop="30px">
        لوحة المستثمر
      </Typography>
      <Typography m={2} textAlign="center">
        مرحبا بك! يمكنك تصفح المشاريع ودعمها أو إضافتها للمفضلة.
      </Typography>
      <Tabs
        value={activeTab}
        onChange={(_, val) => setActiveTab(val)}
        centered
        textColor="inherit"
        indicatorColor="secondary"
        sx={{
          "& .MuiTab-root": {
            color: theme.customColors.accent,
            fontWeight: "bold",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: theme.customColors.accent,
          },
        }}
      >
        <Tab value="all" label="كل المشاريع" />
        <Tab value="favorites" label="المفضلة" />
        <Tab value="supported" label="مجدولة" />
        <Tab value="filter" label="فلترة" />
      </Tabs>

      {activeTab === "filter" && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={3}
          my={4}
          flexWrap="wrap"
          sx={{
            backgroundColor: theme.customColors.filter,
            border: `1px solid ${theme.customColors.accent}`,
            p: 3,
            borderRadius: 4,
            boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
            width: { xs: "70%", md: "50%" },
            mx: "auto",
          }}
        >
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel sx={{ color: "#64b5f6" }}>اختر نوع المشروع</InputLabel>
            <Select
              value={type || ""}
              onChange={(e) => dispatch(setType(e.target.value || null))}
              sx={{
                color: "#fff",
                backgroundColor: theme.customColors.select,
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.light,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#90caf9",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
              }}
            >
              <MenuItem value="">كل الأنواع</MenuItem>
              <MenuItem value="تجاري">تجاري</MenuItem>
              <MenuItem value="صناعي">صناعي</MenuItem>
              <MenuItem value="تقني">تقني</MenuItem>
              <MenuItem value="زراعي">زراعي</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel sx={{ color: "#64b5f6" }}>اختر الميزانية</InputLabel>
            <Select
              value={budget || ""}
              onChange={(e) => dispatch(setBudget(e.target.value || null))}
              sx={{
                color: "#fff",
                backgroundColor: theme.customColors.select,
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.customColors.accent,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.customColors.accent,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
              }}
            >
              <MenuItem value="">كل الميزانيات</MenuItem>
              <MenuItem value="صغير">صغيرة</MenuItem>
              <MenuItem value="متوسط">متوسطة</MenuItem>
              <MenuItem value="كبير">كبيرة</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
      <Grid container spacing={3} justifyContent="center">
        {filteredProjects.map((project) => (
          <Grid sx={{ width: "90%", mt: 1 }} key={project._id}>
            <Card
              sx={{
                background: theme.customColors.card,
                color: "#fff",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: `0 12px 24px ${theme.customColors.accent}88`,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color={theme.customColors.accent}
                  gutterBottom
                >
                  {project.name}
                </Typography>
                <Typography variant="body2">{project.type}</Typography>
                <Typography variant="body2">
                  الميزانية: {project.budget} $
                </Typography>
                {project.description && (
                  <Typography variant="body2" mt={1}>
                    الوصف: {project.description}
                  </Typography>
                )}
                {project.location && (
                  <Typography variant="body2" mt={1}>
                    الموقع: {project.location}
                  </Typography>
                )}
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" }, // عمود بالموبايل، صف بالشاشات الكبيرة
                  alignItems: { xs: "stretch", sm: "center" },
                  gap: 1, // مسافة بين الأزرار
                  p: 2,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: theme.palette.primary.light,
                    color: theme.palette.primary.light,
                    width: { xs: "100%", sm: "auto" }, // عرض كامل بالموبايل
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: "#2b3b4b",
                    },
                  }}
                  onClick={() => handleToggleFavorite(project._id)}
                >
                  {favorites.includes(project._id)
                    ? "إزالة من المفضلة"
                    : "إضافة للمفضلة"}
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.customColors.accent,
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": { backgroundColor: "#2b3b4b" },
                  }}
                  onClick={() => handleSupportClick(project._id, project.name)}
                >
                  {supported.includes(project._id)
                    ? "إلغاء اللقاء"
                    : "جدولة لقاء"}
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: theme.customColors.accent,
                    color: theme.customColors.accent,
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      backgroundColor: theme.customColors.accent,
                      color: "#fff",
                    },
                  }}
                  onClick={() => {
                    setSelectedProjectAnswers(project.criteriaAnswers || []);
                    setOpenDialog(true);
                  }}
                >
                  Check Criteria Answers
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <SupportDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleDialogSubmit}
      />
      <UnsupportDialog
        open={unsupportDialogOpen}
        onClose={() => setUnsupportDialogOpen(false)}
        onConfirm={handleUnsupportConfirm}
        projectName={selectProjectName}
      />
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography sx={{ mr: 5 }}>جابات معايير التقييم</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {criteriaQuestions.map((question, idx) => {
              const answerObj = selectedProjectAnswers.find(
                (a) => a.number === idx + 1
              );
              const answer = answerObj ? answerObj.answer : "لا يوجد جواب";
              return (
                <ListItem key={idx} alignItems="flex-start">
                  <ListItemText
                    primary={question}
                    secondary={`الإجابة--> ${answer}`}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إغلاق</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
