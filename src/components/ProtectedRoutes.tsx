import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export default function ProtectedRoutes({children}: {children: React.ReactNode}) {

    const navigate = useNavigate()
    const { isAuthenticated } = useSelector(state => state.todos)


    useEffect(() => {
        if (!isAuthenticated) navigate('/login')
    }, [isAuthenticated, navigate])

    if (isAuthenticated) return children
}
