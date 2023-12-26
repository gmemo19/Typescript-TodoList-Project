import { Box, Button, IconButton, Input } from "@mui/material";
import TocIcon from "@mui/icons-material/Toc";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

interface InputTaskProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addMessage: () => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  todo,
  setTodo,
  addMessage,
}) => {
  return (
    <Box
      height={{ xs: "220px", sm: "180px", md: "150px" }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        overflow: "hidden",
        mt: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #000",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "750px",
        }}
      >
        <TocIcon sx={{ m: 1 }} />
        <Input
          value={todo}
          placeholder="New Task"
          disableUnderline
          sx={{ flexGrow: 1 }}
          onChange={(e) => setTodo(e.target.value)}
        />
        <IconButton type="button" sx={{ m: 1 }}>
          {todo ? <CloseIcon /> : <AddIcon />}
        </IconButton>
      </Box>
      <Button
        sx={{
          border: "1px solid #000",
          width: "750px",
          marginTop: "20px",
          height: "45px",
        }}
        onClick={addMessage}
      >
        Görev Ekle
      </Button>
    </Box>
  );
};

export default InputTask;
