import { useEffect, useState } from "react";
import "./App.css";
import { Todos } from "./types/Type";
import Message from "./components/Message";
import Header from "./components/header";
import InputTask from "./components/input";
import { Box } from "@mui/material";
import { Task } from "@mui/icons-material";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos && todos.length === 0) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [todos]);

  console.log(todos, "todos");

  const addMessage = () => {
    if (todo.trim()) {
      const newTodo = { message: todo, id: Date.now(), completed: false, editing: false };
      setTodos([...todos, newTodo]);
      
      const updatedTodos = [...todos, newTodo];
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
  
      setTodo('');
    }
  };
  

  const deleteMessage = (id: number) => {
    setTodos((prevTodos)=> {
      const newTodos = prevTodos.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const completedTask = (id: number) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem('todos', JSON.stringify(newTodos)); // Update local storage
      return newTodos;
    });
  };
  

  const toggleEditing = (id: number) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, editing: !todo.editing } : todo
      );
      localStorage.setItem('todos', JSON.stringify(newTodos)); // Update local storage
      return newTodos;
    });
  };

  const toogleEditingBlur = (id: number) => {
    setTodos((editingTask) =>
      editingTask.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              editing: false,
              message: todo.editing ? todo.message : todo.text || "",
            }
          : todo
      )
    );
  };

  const handleDeleteAll = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  const handleDeleteCompleted = () => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(newTodos)); 
      return newTodos;
    });
  };

  const filterTodo = (filterType: 'all' | 'completed' | 'uncompleted') => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

    switch (filterType) {
      case 'completed':
        setTodos(storedTodos.filter((todo: Todos) => todo.completed));
        break;
      case 'uncompleted':
        setTodos(storedTodos.filter((todo: Todos) => !todo.completed));
        break;
      default:
        setTodos(storedTodos);
    }
  };
  
  


  return (
    <Box style={{ height: "100%", width: "100%" }}>
      <Header />
      <InputTask addMessage={addMessage} todo={todo} setTodo={setTodo} />
      <Message
        todos={todos}
        setTodos={setTodos}
        deleteMessage={deleteMessage}
        completedTask={completedTask}
        toggleEditing={toggleEditing}
        toogleEditingBlur={toogleEditingBlur}
        handleDeleteAll={handleDeleteAll}
        handleDeleteCompleted={handleDeleteCompleted}
        filterTodo={filterTodo}
      />
    </Box>
  );
};

export default App;
