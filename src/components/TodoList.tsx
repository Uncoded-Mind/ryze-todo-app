import { TodoItem } from '../services/todo';
//components
import TodoListItem from './TodoItem';


interface ITodoListProps {
    todos: TodoItem[];
    currentTodo: TodoItem | null;
    onEdit: (item: TodoItem) => void;
    onMarkAsDone: (item: TodoItem) => void;
};


function TodoList({ todos, onEdit, currentTodo, onMarkAsDone }: ITodoListProps) {
    return (
        <>
            <div className="todo-list">
                {todos.map(todo => (
                    <TodoListItem key={todo.id} currentTodo={currentTodo} onMarkAsDone={onMarkAsDone} todo={todo} onEdit={onEdit} />
                ))}
            </div>
        </>
    )
};


export default TodoList;