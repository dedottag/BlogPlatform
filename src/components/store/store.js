import { configureStore } from "@reduxjs/toolkit";
import articleReduser from "./articleReduser";

export const store = configureStore({
  reducer: {
    articleReduser,
  },
});

// const rootReducer = configureStore({
//   reducer: { articleSlice },
// });

// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
