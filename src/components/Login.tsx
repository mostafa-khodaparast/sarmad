import { ErrorMessage } from "@hookform/error-message"
import { useState } from 'react'
import { Col, Row } from "antd"
import { useForm } from "react-hook-form"
import Text from "antd/es/typography/Text"
import { logIn } from "../redux/todoSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

type LoginFormProps = {
  email?: string,
  password?: string
}

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '500px',
  margin: '10px auto'
}

const inputStyle: React.CSSProperties = {
  outline: 'none',
  border: '1px solid lightgray',
  borderRadius: '8px',
  padding: '10px',
  margin: '10px auto',
  width: '100%'
}

const submitStyle: React.CSSProperties = {
  margin: '10px',
  padding: '10px 15px',
  backgroundColor: '#4096FF',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '0.8rem',
  cursor: 'pointer'
}


export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { isAuthenticated } = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 


  const onsubmit = (data: LoginFormProps) => {
    dispatch(logIn(data))
    if (isAuthenticated) navigate('/todolist')
  }


  return (
    <Row>
      <Col xs={24}>

        <form onSubmit={handleSubmit(onsubmit)} style={formStyle}>
          <Text style={{ fontSize: '2rem', marginTop: '4rem' }}>Welcome to login page</Text>
          <input
            type="text"
            placeholder="fake@gmail.com"
            style={inputStyle}
            {...register('email', { required: 'email is required' })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <Text style={{ color: 'red' }}>{message}</Text>}
          />

          <input
            type="text"
            placeholder="1234"
            style={inputStyle}
            {...register('password', { required: 'password is required' })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <Text style={{ color: 'red' }}>{message}</Text>}
          />
          <button type="submit" style={submitStyle} >Login</button>
        </form>
      </Col>
    </Row>
  )
}
