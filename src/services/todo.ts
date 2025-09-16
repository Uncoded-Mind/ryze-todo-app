export type TodoItem = {
    id: number;
    title: string;
    description: string;
    date: string;
};


export class TodoService {
    private todos: TodoItem[] = [];


    getAllTodos(): TodoItem[] {
        return [...this.todos];
    }


    addTodo(todo: Omit<TodoItem, 'id'>): TodoItem {
        //first entry will always have the highest id
        const nextTodoId = this.todos.length === 0 ? 1 : this.todos[0].id + 1
        const newItem: TodoItem = { ...todo, id: nextTodoId };
        this.todos.push(newItem);
        return newItem;

    }


    updateTodos(id: number, update: Omit<TodoItem, 'id'>): TodoItem | null {
        const idx = this.todos.findIndex(i => i.id === id);
        if (idx === -1) return null;
        this.todos[idx] = { ...update, id };
        return this.todos[idx];
    }


    findTodo(id: number) {
        return this.todos.find(i => i.id === id);
    }
}