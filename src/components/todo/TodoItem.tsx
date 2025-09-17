import { ITodoListSharedProps } from './TodoList';
//components
import { TodoItem } from '../../services/todo/todo';

interface ITodoItemProps extends ITodoListSharedProps {
    todo: TodoItem;
};

function TodoListItem({ todo, currentTodo, onEdit, onMarkAsDone }: ITodoItemProps) {
    
    return (
        <div key={todo.id} className="todo-list-item">
            <div>
                <p className='title'>{todo.title}</p>
                <p> Deadline: </p>
                <p>{new Date(todo.date).toLocaleDateString()}</p>
            </div>
            <div className="btn-container">
                <button disabled={currentTodo?.id === todo.id} className="btn edit" onClick={() => onEdit(todo)}>Edit </button>
                <button disabled={currentTodo?.id === todo.id} className="btn submit-btn" onClick={() => onMarkAsDone(todo)}>Done </button>
            </div>
        </div>
    )
};

export default TodoListItem;