import React from 'react';
import { TodoItem } from '../services/todo';
import TodoListItem from './TodoItem';


interface ITodoListProps {
    todos: TodoItem[];
    onEdit: (item: TodoItem) => void;
};


const TodoList: React.FC<ITodoListProps> = ({ todos, onEdit }) => (
    <div className="todo-list">
        {todos.map(todo => (
            <TodoListItem todo={todo} onEdit={onEdit} />
        ))}
    </div>
);


export default TodoList;