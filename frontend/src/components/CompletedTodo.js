import React , { useState} from 'react'
import { useTodosContext } from "../hooks/useTodosContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


export default function CompletedTodo({todo}) {
    const { dispatch } = useTodosContext()
    const [completed , setCompleted] = useState(todo.completed)
    const [completedAt , setCompletedAt] = useState(todo.completedAt)


    const handleClick = async () => {
        setCompleted(!completed)
        setCompletedAt(completed ? todo.completedAt : new Date())
        const response = await fetch(`/api/todos/${todo._id}`, {
            method: 'PATCH',
            body: JSON.stringify({completed: !completed , completedAt: new Date()}),
            headers: {
                'Content-Type': 'application/json'
            },
            
           
        })
        const data = await response.json()
       console.log(data.completed)
    //    setCompleted(data.completed)
        if (response.ok) {
            // data.completed = !data.completed
            dispatch({type: 'UPDATE_TODO', payload: data.completed})
            
            // console.log(data.completed)
        }
    }



  return (
    <>
    <h3>Completed: {completed ? formatDistanceToNow(new Date(completedAt), { addSuffix: true }) :'Not yet'} </h3>
    <input className="toggle" type="checkbox" onChange={handleClick} checked={completed} />
    </>

  )
}
