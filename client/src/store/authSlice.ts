import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "services/user";

interface IAuthSlice {
  user: User | null;
  token: string | null;
}

const initialState: IAuthSlice = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { result, token },
      }: PayloadAction<{ result: User; token: string }>
    ) => {
      state.user = result;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
