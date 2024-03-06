import { Button, Card, Col, Row, Spin } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { deleteTodo, getTodos } from "../redux/todoSlice"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Text from "antd/es/typography/Text"
import AddTodo from "./AddTodo"
import EditTodo from "./EditTodo"

const editIconStyle: React.CSSProperties = {
  paddingRight:'15px',
  color: '#51829B',
  fontSize: '25px',
  cursor: 'pointer'
}

const deleteIconStyle: React.CSSProperties = {

  color: '#FD8A8A',
  fontSize: '25px',
  cursor: 'pointer'
}

const spinStyle: React.CSSProperties = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export type TodoProps = {
  completed: boolean,
  id: number,
  title: string,
  userId: number,
}

function TodoList() {
  const dispatch = useDispatch()
  const { loading, data } = useSelector(state => state.todos)
  const [showAddTodoForm, setShowAddTodoForm] = useState(false)
  const [showEditTodoForm, setShowEditTodoForm] = useState(false)

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])



  if (loading) {
    return <>
      <div style={spinStyle}>
        <Spin size="large" />
      </div>

    </>
  }
  return (
    <>

      <Row>
        <Col span={8} offset={8}>
          <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>Todo List</Text>
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={() => setShowAddTodoForm(prev => !prev)}>create</Button>
        </Col>
        {showAddTodoForm && <AddTodo setShowAddTodoForm={setShowAddTodoForm} />}
      </Row>
      {data?.map((todo: TodoProps) =>
        <Card key={todo.id} style={{ margin: '10px' }}>
          <Row align="middle" justify="space-between">
            <Col xs={24} md={22}>
              <Text style={{ paddingRight: '15px' }}>{todo.id}</Text>
              <Text>{todo.title}</Text>
            </Col>
            <Col xs={24} md={2}>
              <Text style={editIconStyle} onClick={() => setShowEditTodoForm(prev => !prev)}><EditOutlined /></Text>
              <Text style={deleteIconStyle} onClick={() => dispatch(deleteTodo(todo.id))}><DeleteOutlined /></Text>
            </Col>
            {showEditTodoForm && <EditTodo todo={todo} />}
          </Row>
        </Card>
      )}
    </>
  )
}

export default TodoList