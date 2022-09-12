import { useState } from 'react'

const TodoForm = () => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState('')
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const todo = {title, date, duration, completed}
    
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setDate('')
      setDuration('')
      setCompleted(false)
      console.log('new todo added:', json)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Todo</h3>

      <label>Todo Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Todo Date:</label>
      <input 
        type="text" 
        onChange={(e) => setDate(e.target.value)} 
        value={date}
      />

      <label>Todo Duration:</label>
      <input 
        type="text" 
        onChange={(e) => setDuration(e.target.value)} 
        value={duration} 
      />
      <label>Completed:</label>
      <input 
        type="boolean" 
        onChange={(e) => setCompleted(e.target.value)} 
        value={completed} 
      />

      <button>Add Todo</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TodoForm