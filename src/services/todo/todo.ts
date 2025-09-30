import { TodoItem } from "../../types/types";

const API_BASE_URL = "http://localhost:1337/api/todos";

export class TodoService {
    async getAllTodos(): Promise<TodoItem[]> {
        const res = await fetch(API_BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch todos");
        const data = await res.json();
        return data.data;
    }

    async addTodo(todo: Omit<TodoItem, 'id'>): Promise<TodoItem> {
        console.log("addTodo", todo);

        const res = await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: todo }),
        });
        if (!res.ok) throw new Error("Failed to add todo");
        return await res.json();
    }

    async updateTodo(update: Omit<TodoItem, 'id'>): Promise<TodoItem> {
        const { documentId, createdAt, updatedAt, publishedAt, ...fields } = update;
        const res = await fetch(`${API_BASE_URL}/${documentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: fields }),
        });
        if (!res.ok) throw new Error("Failed to update todo");
        return await res.json();
    }

    async findTodo(id: number): Promise<TodoItem | null> {
        const res = await fetch(`${API_BASE_URL}/${id}`);
        if (!res.ok) return null;
        return await res.json();
    }

    async markAsDone(id: number): Promise<TodoItem> {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: "PATCH", // use PATCH if supported
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: true }),
        });
        if (!res.ok) throw new Error("Failed to mark todo as done");
        return await res.json();
    }

    async removeTodo(id: number): Promise<void> {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete todo");
    }
}
