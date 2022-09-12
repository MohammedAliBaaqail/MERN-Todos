const TodoDetails = ({ todo }) => {

    return (
      <div className="todo-details">
       
        <h3>Title: {todo.title}</h3>
        <h3>Date: {todo.date}</h3>
        <h3>Duration: {todo.duration} </h3>
        <h3>Completed: {String(todo.completed)} </h3>
        <h3>Created At: {todo.createdAt}</h3>
      </div>
    )
  }
  
  export default TodoDetails