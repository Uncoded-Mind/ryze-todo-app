import { TodoItem } from '../../types/types';
import { ITodoListSharedProps } from './TodoList';


interface ITodoItemProps extends ITodoListSharedProps {
    todo: TodoItem;
};

function TodoListItem({ todo, currentTodo, onEdit, onMarkAsDone, onDelete }: ITodoItemProps) {

    return (
        <div key={todo.id} className="todo-list-item">
            <p className='title'>{todo.title}</p>
            <p> Due Date: </p>
            <p>{new Date(todo.date).toLocaleDateString()}</p>
            <div className="btn-container">
                <button disabled={currentTodo?.id === todo.id || todo.completed} className="btn edit" onClick={() => onEdit(todo)}>Edit </button>

                {todo.completed ? (
                    <button disabled={currentTodo?.id === todo.id} className="btn delete-btn" onClick={() => onDelete(todo)}>
                        Delete
                    </button>) :
                    (<button disabled={currentTodo?.id === todo.id} className="btn submit-btn" onClick={() => onMarkAsDone(todo)}>
                        Done
                    </button>)
                }
            </div>
        </div>
    )
};

export default TodoListItem;