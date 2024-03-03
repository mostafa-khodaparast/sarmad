import { Routes, Route, Navigate,BrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoutes from './components/ProtectedRoutes'
import AppLayout from './components/AppLayout'
import TodoList from './components/TodoList'


function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route element={<ProtectedRoutes><AppLayout /></ProtectedRoutes>}>
          <Route path="todolist" element={<TodoList />} />
        </Route>

        <Route index element={<Navigate to='login' replace />} />
        <Route path='login' index element={<Login />} />
        <Route path="*" element={<p>page not found...</p>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
