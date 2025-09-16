export type TodoItem = {
    id: string;
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
        const newItem: TodoItem = { ...todo, id: this.todos[this.todos.length - 1].id + 1 };
        this.todos.unshift(newItem);
        return newItem;
    }


    updateTodos(id: string, update: Omit<TodoItem, 'id'>): TodoItem | null {
        const idx = this.todos.findIndex(i => i.id === id);
        if (idx === -1) return null;
        this.todos[idx] = { ...update, id };
        return this.todos[idx];
    }


    findTodo(id: string) {
        return this.todos.find(i => i.id === id);
    }
}