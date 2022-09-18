import { useTodosContext } from "../hooks/useTodosContext"
import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import CompletedTodo from './CompletedTodo'

const TodoDetails = ({ todo }) => {
    
    const { dispatch } = useTodosContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
      if (!user) {
        return
      }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
        document.getElementById(todo._id).classList.add('animate__bounceOut')
        

        await sleep(500);

    
        const response = await fetch('/api/todos/' + todo._id, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }


    return (
      <div id={todo._id} className="todo-details animate__animated animate__bounceIn ">
       <div className="box">
        <h3 className="highlight">Title: {todo.title}</h3>
        <h3>Deadline: {todo.date}</h3>
        <h3>Duration: {todo.duration} </h3>
        
        <CompletedTodo todo={todo}/>
        <h3>Created {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</h3>
        <span className="material-symbols-outlined" onClick={handleClick}>Delete </span>
        </div>
      </div>
    )
  }

  
  export default TodoDetails