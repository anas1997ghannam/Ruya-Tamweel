import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface UserState{
    fullName:string;
    phone:string;
    role:string;
    email:string;
    isAuthenticated:boolean;
    loading:boolean;
}
const initialState:UserState={
    fullName:"",
    phone:"",
    role:"",
    email:"",
    isAuthenticated:false,
    loading:true,
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(
            state,
            action:PayloadAction<{
                fullName:string;
                phone:string;
                role:string;
                email:string;
            }>
        )=>{
            state.fullName=action.payload.fullName;
            state.phone=action.payload.phone;
            state.role=action.payload.role;
            state.email=action.payload.email;
            state.isAuthenticated=true;
            state.loading=false;
        },
        clearUser:(state)=>{
            state.fullName='';
            state.phone='';
            state.role='';
            state.email='';
            state.isAuthenticated=false;
            state.loading=false;
        },
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.loading=action.payload;
        },
    },
});
export const {setUser,clearUser,setLoading}=userSlice.actions;
export default userSlice.reducer;