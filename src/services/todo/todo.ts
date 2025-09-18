
import { TODO_STORAGE_KEY } from "../../helper/constants";
import { TodoItem } from "../../types/types";



export class TodoService {
    private todos: TodoItem[] = [];

    constructor() {
        this.loadTodos();
    }

    private loadTodos() {
        const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    }

    private saveTodos() {
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(this.todos));
    }

    getAllTodos(): TodoItem[] {
        return [...this.todos];
    }

    addTodo(todo: Omit<TodoItem, 'id'>): TodoItem {
        const nextTodoId = this.todos.length === 0
            ? 1
            : Math.max(...this.todos.map(todo => todo.id)) + 1;
        const newItem: TodoItem = { ...todo, id: nextTodoId };
        this.todos.push(newItem);
        this.saveTodos();
        return newItem;
    }

    updateTodos(update: Omit<TodoItem, 'id'>, id: number): TodoItem | null {
        const idx = this.todos.findIndex(todo => todo.id === id);
        if (idx === -1) return null;
        this.todos[idx] = { ...update, id };
        this.saveTodos();
        return this.todos[idx];
    }

    findTodo(id: number) {
        return this.todos.find(todo => todo.id === id);
    }

    removeTodo(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        return this.todos;
    }
}
