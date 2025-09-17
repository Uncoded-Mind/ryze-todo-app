import React from 'react';
import { TodoItem } from '../services/todo';



interface ITodoItemProps {
    todo: TodoItem;
    onEdit: (item: TodoItem) => void;
    onMarkAsDone: (item: TodoItem) => void;
};


const TodoListItem: React.FC<ITodoItemProps> = ({ todo, onEdit, onMarkAsDone }) => (
    <div key={todo.id} className="todo-list-item">
        <div>
            <p className='title'>{todo.title}</p>
            <p> Deadline: </p>
            <p>{new Date(todo.date).toLocaleDateString()}</p>
        </div>
        <div className="btn-container">
            <button className="btn edit" onClick={() => onEdit(todo)}>Edit </button>
            <button className="btn submit-btn" onClick={() => onMarkAsDone(todo)}>Done </button>
        </div>
    </div>
);


export default TodoListItem;