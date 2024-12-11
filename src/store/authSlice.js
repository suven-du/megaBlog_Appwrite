import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status:false,
    userData:null
}


const authSlice=createSlice({
       name:"auth",
       initialState,
       reducers:{
            login:(state,action)=>{
                state.status=true;
                console.log("User data dispatched to Redux at store folder:", action.payload.$id);
                state.userData=action.payload

            },
            logout:(state)=>{
                state.status=false;
                state.userData=null
            },

       },
})

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;