import {createSlice} from  '@reduxjs/toolkit';

const initialState = {
    theme : localStorage.getItem('theme') || 'dark'
}

export const themeSlice = createSlice ({
    name : 'theme',
    initialState,
    reducers : {
        toggleTheme : (state,action) => {
            console.log(action.payload);
            
            const html = document.querySelector('html');
            state.theme = action.payload ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
            html.classList.remove('dark', 'light');
            html.classList.add(state.theme);
        }
    }
})

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer