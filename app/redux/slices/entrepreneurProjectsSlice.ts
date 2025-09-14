// app/redux/slices/entrepreneurProjectsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Project {
  _id: string;
  name: string;
  type: string;
  description: string;
  budget: number;
  status?: "pending_review" | "active" | "disabled";
  criteriaAnswers?:{number:number;answer:string}[]; 
  evaluationScore?: number;   // ✅ نسبة التقييم
  evaluationExplanations?: string[]; // ✅ أسباب الرفض إذا Disabled
}

interface EntrepreneurProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: EntrepreneurProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

export const fetchEntrepreneurProjects = createAsyncThunk(
  "entrepreneurProjects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/projects/entrepreneur");
      const data = await res.json();

      const projectsWithNotice = data.projects.map((project: any) => ({
        ...project,
        statusNotice:
          project.status === "disabled"
            ? "تم تعطيل هذا المشروع لأنه مخالف لسياسات التطبيق"
            : project.status === "pending_review"
            ? "هذا المشروع قيد المراجعة حالياً"
            : null,
      }));

      return projectsWithNotice;
    } catch {
      return rejectWithValue("فشل تحميل المشاريع");
    }
  }
);

export const editProject = createAsyncThunk(
  "entrepreneurProjects/editProject",
  async (project: Project, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/projects/${project._id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (!res.ok) throw new Error("فشل تعديل المشروع");
      return project;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const createProject = createAsyncThunk(
  "entrepreneurProjects/createProject",
  async (
    newProject: Omit<Project, "_id"> & { budget: string | number },
    { rejectWithValue }
  ) => {
    try {
      const projectToSend = {
        ...newProject,
        budget: typeof newProject.budget === "string"
          ? Number(newProject.budget)
          : newProject.budget,
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectToSend),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل إضافة المشروع");

      // ✅ دمج المشروع مع معلومات التقييم
      return {
        ...data.project,
        evaluationScore: data.evaluation?.score,
        evaluationExplanations: data.evaluation?.explanations,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const removeProject = createAsyncThunk(
  "entrepreneurProjects/removeProject",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/projects/${id}/delete`, { method: "DELETE" });
      if (!res.ok) throw new Error("فشل حذف المشروع");
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const entrepreneurProjectsSlice = createSlice({
  name: "entrepreneurProjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntrepreneurProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEntrepreneurProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchEntrepreneurProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(editProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.projects[index] = action.payload;
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p._id !== action.payload);
      });
  },
});

export default entrepreneurProjectsSlice.reducer;