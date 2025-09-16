import React from 'react';
import { TodoItem } from '../services/todo';


interface ITodoListProps {
    todos: TodoItem[];
    onEdit: (item: TodoItem) => void;
};


const TodoList: React.FC<ITodoListProps> = ({ todos, onEdit }) => (
    <div className="todo-list">
        {todos.map(todo => (
            <div key={todo.id} className="list-item">
                <div>
                    <strong>{todo.title}</strong>
                    <div className="small">{new Date(todo.date).toLocaleDateString()}</div>
                </div>
                <button className="btn ghost" onClick={() => onEdit(todo)}>Edit</button>
            </div>
        ))}
    </div>
);


export default TodoList;