import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

interface NavState {
  notificationStatus: { [key: string]: boolean };
}

const initialState: NavState = {
  notificationStatus: { inbox: false, achivement: false },
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    closeNotification: (state) => {
      state.notificationStatus = {};
      console.log("1");
    },
    openNotification: (state, action: PayloadAction<string>) => {
      //state.value += ;
      state.notificationStatus = {};
      state.notificationStatus[action.payload] = true;
      console.log("2");

      // state.notification[action.payload] = true;
    },
  },
});

export const { closeNotification, openNotification } = navSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNav = (state: RootState) => state.nav.notificationStatus;

export default navSlice.reducer;
