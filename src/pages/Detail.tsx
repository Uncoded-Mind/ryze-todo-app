import React, { useState } from 'react';
import { TodoItem } from '../services/todo';
import { useTodoService } from '../context/TodosContext';

//components
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';



const Detail: React.FC = () => {

    const todoService = useTodoService();
    const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);
    const [todos, setTodos] = useState<TodoItem[]>(todoService.getAllTodos());

    const handleSave = (data: Omit<TodoItem, 'id'>, id?: number) => {
        if (id) todoService.updateTodos(id, data);
        else todoService.addTodo(data);
        setTodos(todoService.getAllTodos());
        setCurrentTodo(null);
    };

    const onMarkAsDone = (todo: TodoItem) => {
        setTodos(todoService.removeTodo(todo.id));
    }


    return (
        <div className="container">
            <div className="header">
                <h2>Todos</h2>

            </div>
            <div className="form-container">
                <TodoForm onSave={handleSave} currentTodo={currentTodo} />
            </div>
            <hr className='ruler' />
            {
                todos.length === 0 && (<p>No Todos found</p>)
            }
            <TodoList todos={todos} onEdit={setCurrentTodo} onMarkAsDone={onMarkAsDone} />
        </div>
    );
};


export default Detail;