import { useEffect,  } from "react"
import {useTodosContext} from "../hooks/useTodosContext"

import TodoDetails from "../components/TodoDetails"
import TodoForm from "../components/TodoForm"

// components


const Home = () => {
    const { todos, dispatch } = useTodosContext()

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch('/api/todos')
      const data = await response.json()

      if (response.ok) {
        // console.log(data)
        dispatch({type: 'SET_TODOS' , payload: data})
       
      }
    }

    getTodos()
  }, [dispatch])
  
  return (
    <div className="home">
        <TodoForm />
        <div className="todos-container">
            {todos && todos.map(todo => (
                <TodoDetails todo={todo} key={todo._id} />

            ))}
            
        </div>
        
    </div>
  )
}

export default Home