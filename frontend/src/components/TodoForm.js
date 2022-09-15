import { useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'


const TodoForm = ({todo}) => {
    const { dispatch } = useTodosContext()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState('')

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault()

    const todo = {title, date, duration}
    
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
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setDate('')
      setDuration('')
      
      setEmptyFields([])
      console.log('new todo added:', json)
        dispatch({type: 'ADD_TODO', payload: json})
        
    }

  }
  const errorMsg = emptyFields.map( (e) => <span> {e +' -'} </span>)
  return (
    <form className="todo-form" onSubmit={handleSubmit}> 
      <h3 className='highlight'>Add a New Todo</h3>

      <label>Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Date:</label>
      <input 
        type="date" 
        onChange={(e) => setDate(e.target.value)} 
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <label>Duration:</label>
      <input 
        type="text" 
        onChange={(e) => setDuration(e.target.value)} 
        value={duration}
        className={emptyFields.includes('duration') ? 'error' : ''} 
      />
      {/* <label>Completed:</label>
      <input 
        type="boolean" 
        onChange={(e) => setCompleted(e.target.value)} 
        value={completed} 
      /> */}

      <button>Add Todo</button>
      {error && <div className="error-msg">{error }:{errorMsg} </div>}
    </form>
  )
}

export default TodoForm