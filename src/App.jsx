import { useState, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoFilters from "./components/TodoFilters";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "light" ? "#ffffff" : "#202020";
    document.body.style.color = theme === "light" ? "#000000" : "#ffffff";
  }, [theme]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newtetx) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; //'all'
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  const styles = {
    container: {
      backgroundColor: theme === "light" ? "#ffffff" : "#202020",
      color: theme === "light" ? "#000" : "#ffffff",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    themeButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: theme === "light" ? "#333333" : "#ffffff",
      color: theme === "light" ? "#ffffff" : "#333333",
      fontSyze: "16px",
    },
    title: {
      textAlign: "center",
      color: theme === "light" ? "#333" : "#fff",
    },
    counter: {
      color: theme === "light" ? "#666" : "#aaa",
    },
  };

  return (
    <div style={styles.container}>
      <button onClick={toggleTheme} style={styles.themeButton}>
        {theme === "light" ? "Темная тема" : "Светлая тема"}
      </button>
      <h1 style={styles.title}>Менеджер задач</h1>

      <AddTodoForm onAdd={addTodo} />

      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
      />

      {filteredTodos.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: theme === "light" ? "#999" : "#666",
          }}
        >
          {filter === "all"
            ? "Задач пока нет"
            : filter === "active"
              ? " Нет активных задач"
              : "Нет выполненных задач"}
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              task={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <button
          onClick={() => setTodos([])}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {" "}
          Очистить все
        </button>
      )}
    </div>
  );
}

export default App;
