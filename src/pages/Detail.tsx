import React, { useState } from 'react';
import { AuthService } from '../auth/auth';
import { TodoItem } from '../services/todo';
import { Route } from '../routes/routes';
import { useTodoService } from '../context/TodosContext';

//components
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

interface IDetailProps { auth: AuthService; navigate: (nextRoute: Route) => void };

const Detail: React.FC<IDetailProps> = ({ auth, navigate }) => {

    const todoService = useTodoService();

    const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);
    const [todos, setTodos] = useState<TodoItem[]>(todoService.getAllTodos());

    const handleSave = (data: Omit<TodoItem, 'id'>, id?: number) => {
        if (id) todoService.updateTodos(id, data);
        else todoService.addTodo(data);
        setTodos(todoService.getAllTodos());
        setCurrentTodo(null);
    };


    return (
        <div className="container">
            <div className="header">
                <h2>Todos</h2>

            </div>
            <div className="form-container">
                <TodoForm onSave={handleSave} currentTodo={currentTodo} />
            </div>
            {
                todos.length === 0 && (<p>No entries found</p>)
            }
            <TodoList todos={todos} onEdit={setCurrentTodo} />
        </div>
    );
};


export default Detail;