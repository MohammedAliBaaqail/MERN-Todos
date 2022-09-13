import { useTodosContext } from "../hooks/useTodosContext"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const TodoDetails = ({ todo }) => {
    
    const { dispatch } = useTodosContext()

    const handleClick = async () => {
        const response = await fetch(`/api/todos/${todo._id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        if (response.ok) {
            dispatch({type: 'DELETE_TODO', payload: data})
        }
    }

    return (
      <div className="todo-details">
       <div className="box">
        <h3>Title: {todo.title}</h3>
        <h3>Date: {todo.date}</h3>
        <h3>Duration: {todo.duration} </h3>
        <h3>Completed: {String(todo.completed)} </h3>
        <h3>Created {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</h3>
        <span className="material-symbols-outlined" onClick={handleClick}>Delete </span>
        </div>
      </div>
    )
  }

  
  export default TodoDetails