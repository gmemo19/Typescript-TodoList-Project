import React from "react";
import { Todos } from "../types/Type";
import { Box, Checkbox, Input, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

type Props = {
  todos: Todos[];
  deleteMessage: (id: number) => void;
  completedTask: (id: number) => void;
  toggleEditing: (id: number) => void;
  toogleEditingBlur: (id: number, newValue: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
  handleDeleteAll : (id: number) => void;
  handleDeleteCompleted : (id: number) => void;
  filterTodo: (filterType: 'all' | 'completed' | 'uncompleted') => void;
};

export const Message: React.FC<Props> = ({
  todos,
  setTodos,
  deleteMessage,
  completedTask,
  toggleEditing,
  toogleEditingBlur,
  handleDeleteAll,
  handleDeleteCompleted,
  filterTodo
}) => {
 
  const handleInputChange = (id: number, newValue: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, message: newValue } : todo
      )
    );
  };

  return (
    <Box

      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

      }}
    >
      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "750px",
            mt: 2,
            mb: 2
          }}
        >
          <Button
            variant="outlined"
            sx={{ width: "200px", border: "1px solid #000" }}
            onClick={() => filterTodo('all')}
          >
            Tüm Görevler
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "200px", border: "1px solid #000" }}
            onClick={() => filterTodo('completed')}
          >
            Tamamlanan Görevler
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "200px", border: "1px solid #000" }}
            onClick={() => filterTodo('uncompleted')}
          >
            Yapılacak Görevler
          </Button>
        </Box>
      {todos.map((todo, i) => (
        <Box
          key={i}
          height={"60px"}
          sx={{
            width: "100%",
          maxWidth: "750px",
            border: "1px solid #000",
            mt: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {todo.editing ? (
              <Input
              value={todo.message}
                onChange={(e) => handleInputChange(todo.id, e.target.value)}
                onBlur={() => toogleEditingBlur(todo.id, todo.message)}
                fullWidth
                disableUnderline
                style={{marginLeft:"15px"}}
              />
            ) : (
              
              <Box sx={{marginLeft:"15px"}}>{todo.message}</Box>
            )}
          </Box>
          <Box
            height={"100%"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight:"15px"
            }}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => completedTask(todo.id)}
              style={{ height: "25px" }}
            />
            <CreateIcon
              onClick={() => toggleEditing(todo.id)}
              style={{ cursor: "pointer", height: "25px" }}
            />
            <DeleteIcon
              onClick={() => deleteMessage(todo.id)}
              style={{ cursor: "pointer", height: "25px" }}
            />
          </Box>
        </Box>
      ))};
      <Box sx={{width:"750px",display:"flex",justifyContent:"space-between",alignItems:"center",mt:"20px"}}>

      <Button sx={{
          border: "1px solid #000",
          width: "300px",
          height: "45px",
        }}  onClick={() => handleDeleteCompleted(1)}>Tamamlanan Görevleri Sil</Button>
      <Button  sx={{
          border: "1px solid #000",
          width: "300px",
          height: "45px",
        }} onClick={() => handleDeleteAll(1)}>Tüm Görevleri Sil</Button>
      </Box>
    </Box>
  );
};

export default Message;


