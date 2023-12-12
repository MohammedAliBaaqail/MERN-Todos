import { useEffect, useState  } from "react"
import {useTodosContext} from "../hooks/useTodosContext"
import { useAuthContext } from "../hooks/useAuthContext"

import TodoContainer from "../components/TodoContainer"
import TodoForm from "../components/TodoForm"

// components


const Home = () => {
  const { todos, dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const [filterdTodos, setFilterdTodos] = useState([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFilterdTodos(todos || []); // Ensure todos is not null when setting filterdTodos
  }, [todos]);

  const hanndleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    const filtered = (todos || []).filter((todo) => { // Ensure todos is not null during filtering
      return (
        todo.title.toLowerCase().includes(search) ||
        todo.date.toLowerCase().includes(search) ||
        todo.description.toLowerCase().includes(search)
      );
    });
    setFilterdTodos(filtered);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/todos/basic', {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        if (response.ok) {
          const json = await response.json();
          dispatch({ type: 'SET_TODOS', payload: json });
          setIsLoading(false);
        } else {
          throw new Error('Failed to fetch todos');
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <TodoForm todos={todos}  />
      <div className="todos-container">
      <div className="box">
      <div className="search-container"><h3 className='highlight'>Search Todos</h3>
      <input className="search-todos" type="text" placeholder="Search" onChange={hanndleSearch}/></div>
        {isLoading ? (
          <div className="loader"></div>
        ) : !filterdTodos || filterdTodos.length === 0 ? ( // Check for null or empty array
          <h1 className="loading">No Todos Found!</h1>
        ) : (
          
          <div className="todos-box">
                  
      
          {filterdTodos.map((todo) => (
            <TodoContainer todo={todo} key={todo._id} hanndleSearch={hanndleSearch} />
          ))}
        </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Home;
