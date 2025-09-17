import { createContext, useContext } from "react";
import { TodoService } from "../services/todo/todo";

const todoService = new TodoService();
const TodoServiceContext = createContext<TodoService>(todoService);

export const TodoServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <TodoServiceContext.Provider value={todoService}>
            {children}
        </TodoServiceContext.Provider>
    );
};

// Custom hook for convenience
export const useTodoService = () => useContext(TodoServiceContext);