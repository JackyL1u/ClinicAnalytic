import { configureStore } from '@reduxjs/toolkit'
import auth from "./auth"

export default configureStore({
  reducer: {
    auth: auth,
  },
})