import {createSlice} from  '@reduxjs/toolkit';

const initialState = {
    theme : localStorage.getItem('theme') || 'dark'
}

export const themeSlice = createSlice ({
    name : 'theme',
    initialState,
    reducers : {
        toggleTheme : (state) => {
            const html = document.querySelector('html');
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', state.theme);
            html.style.classList.remove('dark', 'light');
            html.style.classList.add(state.theme);
        }
    }
})

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer