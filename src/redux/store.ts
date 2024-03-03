import { configureStore } from "@reduxjs/toolkit/react"
import todoReducer from './todoSlice.ts'

export default configureStore({
    reducer: {
        todos: todoReducer
    }
})

