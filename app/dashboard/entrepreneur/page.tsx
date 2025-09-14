//path-->app/dashboard/entrepreneur/page.tsx
"use client";
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import {
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchEntrepreneurProjects,
  createProject,
  editProject,
  removeProject,
} from "@/app/redux/slices/entrepreneurProjectsSlice";
import EditProjectDialog from "@/app/components/dialogs/EditProjectDialog";
import DeleteProjectDialog from "@/app/components/dialogs/DeleteProjectDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SmartSuggestDialog from "@/app/components/dialogs/SmartSuggestDialog";
import ProjectCriteriaForm from "@/app/components/forms/ProjectCriteriaForm";
interface Project {
  _id: string;
  name: string;
  type: string;
  description: string;
  budget: number;
  evaluationExplanations?: string[]; // ✅ إضافة التفسيرات
  evaluationScore?: number; // ✅ ممكن نعرض النسبة كمان
}

export default function EntrepreneurDashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<{
    name: string;
    type: string;
    description: string;
    budget: string;
    criteriaAnswers: string[];
  }>({
    name: "",
    type: "",
    description: "",
    budget: "",
    criteriaAnswers: Array(10).fill(""),
  });
  const [openExplanations, setOpenExplanations] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading } = useSelector(
    (state: RootState) => state.entrepreneurProjects
  );
  const [suggestDialogOpen, setSuggestDialogOpen] = useState(false);
  const [openCriteriaForm, setOpenCriteriaForm] = useState(false);
  // const [criteriaDialogOpen, setCriteriaDialogOpen] = useState(false)
  useEffect(() => {
    dispatch(fetchEntrepreneurProjects());
  }, [dispatch]);
  const handleAddProject = async (criteriaAnswersFromForm: string[]) => {
    if (
      !newProject.name ||
      !newProject.type ||
      !newProject.budget ||
      criteriaAnswersFromForm.some((ans) => !ans.trim())
    ) {
      toast.warn("يرجى تعبئة جميع الحقول، بما في ذلك أسئلة التقييم");
      return;
    }

    const formattedCriteriaAnswers = criteriaAnswersFromForm.map(
      (answer, index) => ({
        number: index + 1,
        answer,
      })
    );

    try {
      await dispatch(
        createProject({
          ...newProject,
          budget: Number(newProject.budget),
          criteriaAnswers: formattedCriteriaAnswers,
        })
      ).unwrap();

      toast.success("تمت إضافة المشروع بنجاح");
      setNewProject({
        name: "",
        type: "",
        description: "",
        budget: "",
        criteriaAnswers: Array(10).fill(""),
      });
    } catch (error) {
      toast.error(error as string);
    }
  };
  const handleUpdate = async () => {
    if (!currentProject) return;
    try {
      await dispatch(editProject(currentProject)).unwrap();
      toast.success("تم تعديل المشروع بنجاح");
      handleClose();
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(removeProject(id)).unwrap();
      toast.success("تم حذف المشروع بنجاح");
    } catch (error) {
      toast.error(error as string);
    }
  };

  function handleEditClick(project: Project) {
    setCurrentProject(project);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setCurrentProject(null);
  }

  function handleDeleteClick(id: string) {
    setSelectedProjectId(id);
    setDeleteDialogOpen(true);
  }

  const handleSuggestedProjectSelect = async (
    project: Omit<Project, "_id">
  ) => {
    try {
      await dispatch(
        createProject({ ...project, budget: Number(project.budget) })
      ).unwrap();
      toast.success("تم إضافة المشروع المقترح بنجاح");
      setSuggestDialogOpen(false);
    } catch (error) {
      toast.error("فشل في إضافة المشروع");
    }
  };

  return (
    <Box
      p={4}
      sx={(theme) => ({
        direction: "rtl",
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.customColors.accent})`,
        color: theme.palette.text.primary,
        pt: "68px",
      })}
    >
      <ToastContainer position="top-center" theme="dark" />
      <Typography
        variant="h3"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
      >
        لوحة رائد الأعمال
      </Typography>
      <Typography gutterBottom textAlign="center" variant="h5">
        مرحبًا بك! يمكنك إضافة مشروعك، تعديل المشاريع,أو حذفها.
      </Typography>

      <Box
        mb={4}
        sx={(theme) => ({
          background: theme.customColors.card,
          p: 3,
          borderRadius: 3,
        })}
      >
        <Typography variant="h6" color="primary" mb={2} fontWeight="bold">
          إضافة مشروع جديد
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: "primary.main",
            borderColor: "primary.main",
            mb: 2,
            fontWeight: "bold",
          }}
          onClick={() => setSuggestDialogOpen(true)}
        >
          قم بسؤال الذكاء الاصطناعي
        </Button>
        <Grid container spacing={2}>
          <Grid sx={{ width: { xs: "100%", md: "48%" } }}>
            <TextField
              variant="filled"
              label="اسم المشروع"
              fullWidth
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              InputProps={{
                style: { backgroundColor: "#2e2e2e", color: "white" },
              }}
              InputLabelProps={{ style: { color: "#90caf9" } }}
            />
          </Grid>
          <Grid sx={{ width: { xs: "100%", md: "48%" } }}>
            <TextField
              select
              variant="filled"
              label="نوع المشروع"
              fullWidth
              value={newProject.type}
              onChange={(e) =>
                setNewProject({ ...newProject, type: e.target.value })
              }
              InputProps={{
                style: { backgroundColor: "#2e2e2e", color: "white" },
              }}
              InputLabelProps={{ style: { color: "#90caf9" } }}
            >
              <MenuItem value="تجاري">تجاري</MenuItem>
              <MenuItem value="صناعي">صناعي</MenuItem>
              <MenuItem value="تقني">تقني</MenuItem>
              <MenuItem value="زراعي">زراعي</MenuItem>
            </TextField>
          </Grid>
          <Grid sx={{ width: { xs: "100%", md: "97%" } }}>
            <TextField
              variant="filled"
              label="وصف المشروع"
              fullWidth
              multiline
              rows={2}
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              InputProps={{
                style: { backgroundColor: "#2e2e2e", color: "white" },
              }}
              InputLabelProps={{ style: { color: "#90caf9" } }}
            />
          </Grid>
          <Grid sx={{ width: { xs: "100%", md: "48%" } }}>
            <TextField
              variant="filled"
              label="الميزانية المطلوبة"
              type="number"
              fullWidth
              value={newProject.budget}
              onChange={(e) =>
                setNewProject({ ...newProject, budget: e.target.value })
              }
              InputProps={{
                style: { backgroundColor: "#2e2e2e", color: "white" },
              }}
              InputLabelProps={{ style: { color: "#90caf9" } }}
            />
          </Grid>
          <Grid sx={{ width: { xs: "100%", md: "48%" } }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setOpenCriteriaForm(true)}
              sx={{
                height: "100%",
                background: ` linear-gradient(90deg, ${theme.palette.primary.dark}, #000000)`,
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #000000)`,
                },
              }}
            >
              إضافة مشروع عبر ملء النموذج
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h5" gutterBottom mb={3} fontWeight="bold">
        مشاريعي
      </Typography>
      {loading ? (
        <Typography>جارٍ التحميل...</Typography>
      ) : projects.length === 0 ? (
        <Typography>لا يوجد مشاريع بعد</Typography>
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid sx={{ width: "100%" }} key={project._id}>
              <Card
                sx={(theme) => ({
                  background: `linear-gradient(135deg, ${theme.customColors.card}, ${theme.customColors.accent})`,
                  color: theme.palette.text.primary,
                  borderRadius: 3,
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                })}
              >
                <CardContent
                  sx={{
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {project.name}
                    </Typography>
                    <hr style={{ marginLeft: "10px" }}></hr>
                    <Typography>
                      التقييم :{" "}
                      <span style={{ fontWeight: "bold", color: "gold" }}>
                        {project.evaluationScore}
                      </span>
                    </Typography>
                    <Typography color="primary.main">
                      نوع المشروع : {project.type}
                    </Typography>
                    {project.status && (
                      <Box
                        sx={{
                          mt: 1,
                          display: "inline-block",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          backgroundColor:
                            project.status === "pending_review"
                              ? "#ffa726" // برتقالي - قيد المراجعة
                              : project.status === "disabled"
                              ? "#ef5350" // أحمر - مرفوض
                              : "#66bb6a", // أخضر - مقبول
                          color: "white",
                        }}
                      >
                        {project.status === "pending_review"
                          ? "قيد المراجعة"
                          : project.status === "disabled"
                          ? "مخالف للشروط"
                          : "مقبول"}
                      </Box>
                    )}
                    {project.status === "disabled" && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        sx={{
                          ml: 2,
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          mr: 2,
                        }}
                        onClick={() => {
                          setCurrentProject(project);
                          setOpenExplanations(true);
                        }}
                      >
                        استفسر
                      </Button>
                    )}
                    <br></br>
                    <Typography>score:{project.evaluationScore}</Typography>
                    <Box sx={{ mt: 1, maxHeight: "80px", overflow: "auto" }}>
                      <Typography>{project.description}</Typography>
                    </Box>
                  </Box>
                  <Typography mt={2} fontWeight="bold" color="gold">
                    الميزانية: {project.budget} $
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "start", px: 2, mt: "40px", gap: 2 }}
                >
                  <Button
                    dir="rtl"
                    variant="outlined"
                    color="primary"
                    endIcon={<EditIcon sx={{ marginRight: "5px" }} />}
                    onClick={() => handleEditClick(project)}
                  >
                    تعديل
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    endIcon={<DeleteIcon sx={{ marginRight: "5px" }} />}
                    onClick={() => handleDeleteClick(project._id)}
                  >
                    حذف
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <EditProjectDialog
        open={open}
        project={currentProject}
        onClose={handleClose}
        onSave={handleUpdate}
        setProject={setCurrentProject}
      />

      <DeleteProjectDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={async () => {
          if (!selectedProjectId) return;
          await handleDelete(selectedProjectId);
          setDeleteDialogOpen(false);
          setSelectedProjectId(null);
        }}
      />

      <SmartSuggestDialog
        open={suggestDialogOpen}
        onClose={() => setSuggestDialogOpen(false)}
        onSelect={handleSuggestedProjectSelect}
      />
      <Dialog
        open={openCriteriaForm}
        onClose={() => setOpenCriteriaForm(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle textAlign="center">إكمال معلومات المشروع</DialogTitle>
        <DialogContent>
          <ProjectCriteriaForm
            onSubmit={(criteriaAnswers: string[]) => {
              setNewProject({ ...newProject, criteriaAnswers });
              handleAddProject(criteriaAnswers);
              setOpenCriteriaForm(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openExplanations}
        onClose={() => setOpenExplanations(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle textAlign="center">تفسير رفض المشروع</DialogTitle>
        <DialogContent dividers>
          {currentProject?.evaluationExplanations &&
          currentProject.evaluationExplanations.length > 0 ? (
            <ul style={{ paddingRight: "20px" }}>
              {currentProject.evaluationExplanations.map((reason, idx) => (
                <li key={idx}>
                  <Typography variant="body1" color="error">
                    {reason}
                  </Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body2" color="textSecondary">
              لا توجد تفاصيل متاحة.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenExplanations(false)}
            color="primary"
            variant="contained"
          >
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
