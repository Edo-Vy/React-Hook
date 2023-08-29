// import { combineReducers, createStore } from "redux";

// const rootReducer = combineReducers({
//   number: (state = 1, action) => {
//     switch (action.type) {
//       case 'CHANGE_NUMBER': {
//         state = action.payload;
//         return state;
//       }
//       default:
//         return state;
//     }
//   },
// });

// export const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// redux-toolkit

import { configureStore } from "@reduxjs/toolkit";
// export default sẽ ko có {}
import facebookReducer from "./reducers/facebookReducer";
import numberReducer from "./reducers/numberReducer";
import productReducer from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    // number: (state = 1, action) => {
    //   switch (action.type) {
    //     case "CHANGE_NUMBER": {
    //       state = action.payload;
    //       return state; // đặt ob thì ko cần return

    //     }
    //     default:
    //       return state;
    //   }
    // },
    number: numberReducer,
    facebook: facebookReducer,
    productReducer: productReducer,
  },
});
