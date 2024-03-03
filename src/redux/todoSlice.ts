import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

type DataProps = {
    completed: boolean,
    id: number,
    title: string,
    userId: number,
}

type InitialStateProps = {
    isAuthenticated: boolean,
    loginInfo: { email: string, password: string },
    data: DataProps[],
    loading: boolean,
    errors: null
}

const initialState: InitialStateProps = {
    isAuthenticated: false,
    loginInfo: { email: 'fake@gmail.com', password: '1234' },
    data: [],
    loading: false,
    errors: null
}

export const getTodos = createAsyncThunk(
    'todos/getTodos',
    async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        return data.json()
    }
)


const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        deleteTodo(state, action) {
            state.data = state.data.filter(todo => todo.id !== action.payload)
            localStorage.setItem('todos', JSON.stringify(state.data))
        },
        addTodo(state, action) {
            state.data.push(action.payload)
            localStorage.setItem('todos', JSON.stringify(state.data))
        },
        editTodo(state, action) {
            const todo = state.data.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.title = action.payload.title
                localStorage.setItem('todos', JSON.stringify(state.data))
            }
        },
        logOut(state) {
            state.isAuthenticated = false
        },
        logIn(state, action) {
            if (state.loginInfo.email == action.payload.email && state.loginInfo.password == action.payload.password) {
                state.isAuthenticated = true
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.loading = true
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                localStorage.setItem('todos', JSON.stringify(action.payload))
            })
            .addCase(getTodos.rejected, (state) => {
                state.loading = false
            })
    }
})

export const { deleteTodo, addTodo, editTodo, logOut, logIn } = todoSlice.actions
export default todoSlice.reducer