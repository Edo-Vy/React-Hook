// rxslice
import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    arrComment :[
        {name :'Hậu mentor', content :'ahihi'},
        {name :'Quân mentor', content :'haha'},
    ]

}

const facebookReducer = createSlice({ // đối tượng của slice(facebookReducer )chứ ko phải là reducer => ko export ở đây được
  name: 'facebookReducer',
  initialState,
  reducers: {
      addComment : (state, action) =>{
            // B1 : Lấy dữ liệu từ payload
            let userComment = action.payload;
            // B2 : đưa dữ liệu vào mảng -> cập nhật state
            // ko cần clone sate ra : vì phần core làm ẩn bên dưới rồi
            state.arrComment.push(userComment);
      }
  }
});

export const {addComment} = facebookReducer.actions // muốn lấy action phải .actions 

export default facebookReducer.reducer // muốn lấy ra reducer phải .reducer

/**
 * img : avatar sẽ ko lưu
 */

//  const facebookReducer = {
//      reducer : (state, action) =>{ // export default facebookReducer.reducer

//      }
//      actions: (payload) =>{ // export const {} = facebookReducer.actions
//          return {
//              type : 'abc',
//              payload
//          }
//      }
//  }