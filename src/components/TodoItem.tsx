import React from 'react';
import { TodoItem as TypeTodoItem } from '../services/todo';



interface ITodoItemProps {
    todos: TypeTodoItem[];
    onEdit: (item: any) => void;
};


const TodoItem: React.FC<ITodoItemProps> = ({ todos, onEdit }) => (
    <div className="list">
        {todos.map(todo => (
            <div key={todo.id} className="item">
                <div>
                    <strong>{todo.title}</strong>
                    <div className="small">{new Date(todo.date).toLocaleDateString()}</div>
                </div>
                <button className="btn ghost" onClick={() => onEdit(todo)}>Edit</button>
            </div>
        ))}
    </div>
);


export default TodoItem;