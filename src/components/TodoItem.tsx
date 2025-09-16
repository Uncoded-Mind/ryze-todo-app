import React from 'react';
import { TodoItem } from '../services/todo';



interface ITodoItemProps {
    todo: TodoItem;
    onEdit: (item: any) => void;
};


const TodoListItem: React.FC<ITodoItemProps> = ({ todo, onEdit }) => (
    <div key={todo.id} className="todo-list-item">
        <div>
            <p className='title'>{todo.title}</p>
            <div className="small"> Target: {new Date(todo.date).toLocaleDateString()}</div>
        </div>
        <button className="btn ghost" onClick={() => onEdit(todo)}>Edit </button>
    </div>
);


export default TodoListItem;