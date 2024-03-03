import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Tooltip } from 'antd'
import { logOut } from "../redux/todoSlice"
import { LogoutOutlined } from '@ant-design/icons'



const AppLayout = () => {

    const { isAuthenticated } = useSelector(state => state.todos)
    const dispatch = useDispatch()

    return (
        <>
            <header style={{ margin: '20px' }}>
                {isAuthenticated ?
                    <Tooltip title='log out' color='gray'>
                        <Button type='primary' onClick={() => dispatch(logOut())}>
                            <LogoutOutlined />
                        </Button>
                    </Tooltip>
                    : ''}
            </header>
            <Outlet />
        </>
    )
}

export default AppLayout