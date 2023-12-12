import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTodosContext } from "../hooks/useTodosContext";
import TodoContainer from "../components/TodoContainer";

export const AllTodos = () => {
  const { user } = useAuthContext();
  const { todos, dispatch } = useTodosContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/todos/admin", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (response.ok) {
          const json = await response.json();
          dispatch({ type: 'SET_TODOS', payload: json });
        } else {
          console.error('Failed to fetch todos:', response.statusText);
          // Handle error
        }
      } catch (error) {
        console.error('Error occurred while fetching todos:', error);
        // Handle error
      }
    };

    if (user && user.role === "admin") {
      fetchUsers();
    }
  }, [user, dispatch]);

  return (
    <div>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoContainer todo={todo} key={todo._id} isAdmin={true} />
        ))
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default AllTodos;
