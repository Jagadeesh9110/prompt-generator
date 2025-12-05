import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    isSidebarOpen: boolean;
    theme: 'light' | 'dark';
    activeModal: string | null;
}

const initialState: UiState = {
    isSidebarOpen: true,
    theme: 'dark', // Default to dark mode for "premium" feel
    activeModal: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
        openModal: (state, action: PayloadAction<string>) => {
            state.activeModal = action.payload;
        },
        closeModal: (state) => {
            state.activeModal = null;
        },
    },
});

export const { toggleSidebar, setTheme, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
