import { useState } from 'react';
import { TodoItem } from '../services/todo/todo';
import { useTodoService } from '../contexts/TodosContext';

//components
import TodoForm from '../components/todo/TodoForm';
import TodoList from '../components/todo/TodoList';


function Detail() {

    const todoService = useTodoService();
    const [todos, setTodos] = useState<TodoItem[]>(todoService.getAllTodos());
    const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);

    const handleCancel = () => {
        setCurrentTodo(null);
    }

    const handleSave = (data: Omit<TodoItem, 'id'>, id?: number) => {
        if (id) {
            todoService.updateTodos(data, id)
        } else {
            todoService.addTodo(data);
        }
        setCurrentTodo(null);
        setTodos(todoService.getAllTodos());
    };

    const onMarkAsDone = (todo: TodoItem) => {
        setTodos(todoService.removeTodo(todo.id));
    }


    return (
        <div className="container">
            <div className="header">
                <h2>Todos</h2>
            </div>

            <TodoForm onSave={handleSave} currentTodo={currentTodo} onCancel={handleCancel} />

            <hr className='ruler' />
            {
                todos.length === 0 ? (<p>No Todos found</p>) : (<TodoList todos={todos} onEdit={setCurrentTodo} currentTodo={currentTodo} onMarkAsDone={onMarkAsDone} />)
            }
        </div>
    );
};


export default Detail;