import React from 'react';
import { TodoItem } from '../services/todo';
import TodoListItem from './TodoItem';


interface ITodoListProps {
    todos: TodoItem[];
    onEdit: (item: TodoItem) => void;
    onMarkAsDone: (item: TodoItem) => void;
};


const TodoList: React.FC<ITodoListProps> = ({ todos, onEdit, onMarkAsDone }) => (
    <>
        <div className="todo-list">
            {todos.map(todo => (
                <TodoListItem onMarkAsDone={onMarkAsDone} todo={todo} onEdit={onEdit} />
            ))}
        </div>
    </>
);


export default TodoList;