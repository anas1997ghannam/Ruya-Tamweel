import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectsSlice";
import preferencesReducer from "./slices/preferencesSlice"
import entrepreneurProjectsReducer from './slices/entrepreneurProjectsSlice';
import userReducer from './slices/userSlice'
export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    preferences:preferencesReducer,
    entrepreneurProjects:entrepreneurProjectsReducer,
    user:userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;