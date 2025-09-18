import { useMemo, useState } from 'react';

//components
import TodoListItem from './TodoItem';
import { TodoItem } from '../../types/types';

enum SortingString {
    DEADLINE_ASC = "deadline_asc",
    DEADLINE_DESC = "deadline_desc"
}

export interface ITodoListSharedProps {
    currentTodo: TodoItem | null;
    onEdit: (item: TodoItem) => void;
    onMarkAsDone: (item: TodoItem) => void;
};

interface ITodoListProps extends ITodoListSharedProps {
    todos: TodoItem[];
};

function TodoList({ todos, onEdit, currentTodo, onMarkAsDone }: ITodoListProps) {
    const [sortBy, setSortBy] = useState<SortingString | null>(null)

    const handleSort = (localSortBy: SortingString) => {
        if (localSortBy === sortBy) {
            setSortBy(null);
        } else {
            setSortBy(localSortBy)
        }
    }
    
    const sortedTodos = useMemo(() => {
        if (!todos?.length) return [];
        if (!sortBy) return todos;
        return [...todos].sort((a, b) => {
            const timeA = new Date(a.date).getTime();
            const timeB = new Date(b.date).getTime();
            const diff = timeA - timeB;
            return sortBy === SortingString.DEADLINE_DESC ? -diff : diff;
        });
    }, [todos, sortBy]);

    return (
        <>
            <div className='sorting-tag-container'>
                <div className='sorting-tag-label'>
                    Sort by
                </div>
                <button
                    disabled={sortedTodos.length === 1}
                    onClick={() => handleSort(SortingString.DEADLINE_ASC)}
                    className={`btn sorting-tag ${sortBy === SortingString.DEADLINE_ASC ? "active" : ""}`}
                >
                    Due Date (ASC)
                </button>
                <button
                    disabled={sortedTodos.length === 1}
                    onClick={() => handleSort(SortingString.DEADLINE_DESC)}
                    className={`btn sorting-tag ${sortBy === SortingString.DEADLINE_DESC ? "active" : ""}`}
                >
                    Due Date (DESC)
                </button>
            </div>
            <div className="todo-list">
                {sortedTodos.map(todo => (
                    <TodoListItem key={todo.id} currentTodo={currentTodo} onMarkAsDone={onMarkAsDone} todo={todo} onEdit={onEdit} />
                ))}
            </div>
        </>
    )
};


export default TodoList;