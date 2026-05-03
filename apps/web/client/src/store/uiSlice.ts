import type { dashboardFetchDataType } from "@/Types/dashboard";
import type { SharedContentDataType } from "@/Types/sharedContent";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type initalStatesType = {
  addBookMarkState: boolean;
  longSelectedCard: dashboardFetchDataType | SharedContentDataType | null;
  editCardState: dashboardFetchDataType | SharedContentDataType | null;
};

const initialStates: initalStatesType = {
  addBookMarkState: false,
  editCardState: null,
  longSelectedCard: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialStates,
  reducers: {
    setAddBookMarkState: (state, action: PayloadAction<boolean>) => {
      state.addBookMarkState = action.payload;
    },
    setEditCardState: (
      state,
      action: PayloadAction<
        dashboardFetchDataType | SharedContentDataType | null
      >,
    ) => {
      state.editCardState = action.payload;
    },
    setLongSelectedCard: (
      state,
      action: PayloadAction<
        dashboardFetchDataType | SharedContentDataType | null
      >,
    ) => {
      state.longSelectedCard = action.payload;
    },
  },
});

export const { setAddBookMarkState, setLongSelectedCard, setEditCardState } =
  uiSlice.actions;
export default uiSlice.reducer;
