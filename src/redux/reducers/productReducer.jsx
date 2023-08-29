// rxslice
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     arrProduct : []
}

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {}
});

export const {} = productReducer.actions

export default productReducer.reducer



// middleware