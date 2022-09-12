import { useEffect, useState } from "react"
import TodoDetails from "../components/TodoDetails"
import TodoForm from "../components/TodoForm"
// components


const Home = () => {
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch('/api/todos')
      const data = await response.json()

      if (response.ok) {
        // console.log(data)
        setTodos(data)
      }
    }

    getTodos()
  }, [])
  
  return (
    <div className="home">
        <div className="todos-container">
            {todos && todos.map(todo => (
                <TodoDetails todo={todo} key={todo._id} />

            ))}
            
        </div>
        <TodoForm />
    </div>
  )
}

export default Home