import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import Text from "antd/es/typography/Text"
import { useDispatch } from 'react-redux'
import { addTodo } from "../redux/todoSlice"


type AddTodoFormProps = {
  id: number,
  title: string
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




function AddTodo({ setShowAddTodoForm }) {

  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()


  const onsubmit = (data: AddTodoFormProps) => {
    const newData = {
      userId: 1,
      id: data.id,
      title: data.title,
      completed: false
    }
    dispatch(addTodo(newData))
    setShowAddTodoForm(false)
  }



  return (
    <form onSubmit={handleSubmit(onsubmit)} style={formStyle}>
      <input
        type="number"
        placeholder="id"
        style={inputStyle}
        {...register('id', { required: 'id is required' })}
      />
      <ErrorMessage
        errors={errors}
        name="id"
        render={({ message }) => <Text style={{ color: 'red' }}>{message}</Text>}
      />

      <input
        type="text"
        placeholder="title"
        style={inputStyle}
        {...register('title', { required: 'title is required' })}
      />
      <ErrorMessage
        errors={errors}
        name="title"
        render={({ message }) => <Text style={{ color: 'red' }}>{message}</Text>}
      />
      <button type="submit" style={submitStyle} >add to list</button>
    </form>
  )
}

export default AddTodo