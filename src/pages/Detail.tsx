import { useCallback, useEffect, useState } from 'react';
import { useTodoService } from '../contexts/TodosContext';
import { TodoItem } from '../types/types';
//components
import TodoForm from '../components/todo/TodoForm';
import TodoList from '../components/todo/TodoList';

function Detail() {
    const todoService = useTodoService();
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);

    const handleCancel = () => {
        setCurrentTodo(null);
    }

    const fetchTodos = async () => {
        try {
            const allTodos = await todoService.getAllTodos();
            setTodos(allTodos);
        } catch (err) {
            // setError("Failed to load todos");
            console.error(err);
        } finally {
            // setLoading(false);
        }
    }

    const reload = () => {
        setCurrentTodo(null);
        fetchTodos();

    }
    const handleSave = async (data: Omit<TodoItem, "id">) => {
        todoService.addTodo(data);
        reload();
    };

    const handleUpdate = async (data: Omit<TodoItem, "id">) => {
        await todoService.updateTodo(data)
        reload();
    };

    const handleMarkAsDone = async (todo: TodoItem) => {
        await todoService.markAsDone(todo.id);
        fetchTodos();
    }

    const handleDelete = async (todo: TodoItem) => {
        await todoService.removeTodo(todo.id);
        fetchTodos();
    }

    useEffect(() => {
        fetchTodos();
    }, []);


    return (
        <div className="container">
            <div className="header">
                <h2>Todos</h2>
            </div>

            <TodoForm onSave={handleSave} onUpdate={handleUpdate} currentTodo={currentTodo} onCancel={handleCancel} />

            <hr className='ruler' />
            {
                todos.length === 0 ? (<p>No Todos found</p>) : (<TodoList onDelete={handleDelete} todos={todos} onEdit={setCurrentTodo} currentTodo={currentTodo} onMarkAsDone={handleMarkAsDone} />)
            }
        </div>
    );
};


export default Detail;