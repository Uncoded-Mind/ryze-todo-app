import React from 'react';
import { TodoItem } from '../services/todo';
import TodoListItem from './TodoItem';


interface ITodoListProps {
    todos: TodoItem[];
    currentTodo: TodoItem | null;
    onEdit: (item: TodoItem) => void;
    onMarkAsDone: (item: TodoItem) => void;
};


const TodoList: React.FC<ITodoListProps> = ({ todos, onEdit, currentTodo, onMarkAsDone }) => (
    <>
        <div className="todo-list">
            {todos.map(todo => (
                <TodoListItem key={todo.id} currentTodo={currentTodo} onMarkAsDone={onMarkAsDone} todo={todo} onEdit={onEdit} />
            ))}
        </div>
    </>
);


export default TodoList;