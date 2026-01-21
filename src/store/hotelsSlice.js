import { createSlice } from '@reduxjs/toolkit'

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState: [],
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase("HOTELS_FETCH_SUCCEEDED", (state, action) => {
      return action.payload;
    })
  }
});

export default hotelsSlice.reducer;