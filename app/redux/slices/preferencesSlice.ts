import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
interface PreferencesState{
    type:string|null;
    budget:string|null;
}
const initialState:PreferencesState={
    type:null,
    budget:null,
};
const PreferencesSlice=createSlice({
    name:"preferences",
    initialState,
    reducers:{
        setType(state,action:PayloadAction<string|null>){
            state.type=action.payload;
        },
        setBudget(state,action:PayloadAction<string|null>){
            state.budget=action.payload;
        },
        resetPreferences(state){
            state.type=null;
            state.budget=null;
        }
    }
})
export const{setType,setBudget,resetPreferences}=PreferencesSlice.actions;
export default PreferencesSlice.reducer;