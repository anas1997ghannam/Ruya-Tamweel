//path-->app/redux/slice/projectSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Project {
  _id: string;
  name: string;
  type: string;
  budget: number;
  description?: string;  
  location?: string;    
   criteriaAnswers?: { number: number; answer: string }[];  
}

interface ProjectsState {
  projects: Project[];
  favorites: string[];
  supported: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  favorites: [],
  supported: [],
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const res = await fetch("/api/projects");
  const data = await res.json();
  return data.projects;
});

export const fetchFavorites = createAsyncThunk("projects/fetchFavorites", async () => {
  const res = await fetch("/api/favorites/user", { credentials: "include" });
  const data = await res.json();
  return data.favorites.map((fav: any) => fav.project._id);
});

export const fetchSupported = createAsyncThunk("projects/fetchSupported", async () => {
  const res = await fetch("/api/support/user", { credentials: "include" });
  const data = await res.json();
  return data.supported.map((sup: any) => sup.project._id);
});

export const toggleFavorite = createAsyncThunk(
  "projects/toggleFavorite",
  async (projectId: string, { getState }) => {
    const state = getState() as { projects: ProjectsState };
    const isFav = state.projects.favorites.includes(projectId);
    const method = isFav ? "DELETE" : "POST";

    const res = await fetch("/api/favorites", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    });

    if (!res.ok) throw new Error("فشل تعديل المفضلة");
    toast.success(isFav ? "تمت الإزالة من المفضلة" : "تمت الإضافة للمفضلة");
    return projectId;
  }
);

export const toggleSupport = createAsyncThunk(
  "projects/toggleSupport",
  async (
    { projectId, projectName }: { projectId: string; projectName: string },
    { getState }
  ) => {
    const state = getState() as { projects: ProjectsState };
    const isSupported = state.projects.supported.includes(projectId);
    const method = isSupported ? "DELETE" : "POST";

    const res = await fetch("/api/support", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    });

    if (!res.ok) throw new Error("فشل دعم المشروع");

    toast.success(isSupported ?` تم إلغاء دعم ${projectName} `:` تم دعم المشروع ${projectName}`);
    return projectId;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "خطأ";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchSupported.fulfilled, (state, action) => {
        state.supported = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const id = action.payload;
        state.favorites.includes(id)
          ? (state.favorites = state.favorites.filter((f) => f !== id))
          : state.favorites.push(id);
      })
      .addCase(toggleSupport.fulfilled, (state, action) => {
        const id = action.payload;
        state.supported.includes(id)
          ? (state.supported = state.supported.filter((s) => s !== id))
          : state.supported.push(id);
      });
  },
});

export default projectsSlice.reducer;