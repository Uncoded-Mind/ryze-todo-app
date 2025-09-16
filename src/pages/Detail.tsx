import React, { useState } from 'react';
import { AuthService } from '../auth/auth';
import { TodoService, TodoItem } from '../services/todo';
import { Route } from '../routes/routes';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

interface IDetailProps { auth: AuthService; todoService: TodoService; navigate: (r: Route) => void };


const Detail: React.FC<IDetailProps> = ({ auth, todoService, navigate }) => {

    const [currentTodo, setcurrentTodo] = useState<TodoItem | null>(null);
    const [todos, setTodos] = useState<TodoItem[]>(todoService.getAllTodos());

    const handleSave = (data: Omit<TodoItem, 'id'>, id?: string) => {
        if (id) todoService.updateTodos(id, data);
        else todoService.addTodo(data);
        setTodos(todoService.getAllTodos());
        setcurrentTodo(null);
    };


    return (
        <div className="container">
            <div className="header">
                <h2>Todos</h2>
                <button className="btn" onClick={() => { auth.logout(); navigate(Route.Login); }}>Logout</button>
            </div>
            <TodoForm onSave={handleSave} currentTodo={currentTodo} />
            <TodoList todos={todos} onEdit={setcurrentTodo} />
        </div>
    );
};


export default Detail;