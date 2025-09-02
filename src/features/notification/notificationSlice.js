import { createSlice } from "@reduxjs/toolkit";

export const notificaionSlice = createSlice({
    name : 'notification',
    initialState : {message : null},
    reducers : {
        showNortification : (state, action)=>{
            state.message = action.payload;
            console.log(action.payload);
            
        },
        clearNotification : (state) => {
            state.message = null
        }
    }
})


export const {showNortification, clearNotification} = notificaionSlice.actions;
export default notificaionSlice.reducer;