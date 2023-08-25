// rfcredux

import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { changeNumber } from "../../../../redux/reducers/numberReducer";

//const DemoUseNumber = (props) => {
export default function DemoUseNumber(props) {
  const number = useSelector((state) => state.number);
  const dispatch = useDispatch();
  return (
    <div className="container">
      {/* <h3>Number : {props.number}</h3> */}
      <h3>Number : {number}</h3>
      <button
        className="btn btn-success"
        onClick={() => {
          // Cách 1: tự tạo action để dispatch ruducer slice
          //   const action = {
          //     // type: "CHANGE_NUMBER",
          //     type: "numberReducer/changeNumber",
          //     payload: number + 1,
          //   };
          //   dispatch(action);

          // cách 2 : action creator
          const action = changeNumber(number + 1);
          dispatch(action);
        }}
      >
        +
      </button>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//     number : state.number
// })

// export default connect(mapStateToProps)(DemoUseNumber)

// configStore
