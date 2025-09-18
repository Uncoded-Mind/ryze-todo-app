
import { TODO_STORAGE_KEY } from "../../helper/constants";
import { TodoItem } from "../../types/types";
import { TodoService } from "./todo";

const EXAMPLE_TODO: Omit<TodoItem, "id"> = { title: 'Test', description: 'Desc', date: '2025-09-17', completed: true };

function createTodo(service: TodoService) {
    return service.addTodo(EXAMPLE_TODO);
}

describe('TodoService', () => {
    let service: TodoService;

    beforeEach(() => {
        localStorage.clear();
        service = new TodoService();
    });

    it('should start with no todos', () => {
        expect(service.getAllTodos()).toEqual([]);
    });

    it('should add a todo and save to localStorage', () => {
        const todo = createTodo(service);
        expect(todo.id).toBe(1);
        expect(service.getAllTodos()).toHaveLength(1);
        const storedTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || '[]');
        expect(storedTodos).toHaveLength(1);
        expect(storedTodos[0].title).toBe('Test');
    });

    it('should update a todo', () => {
        const todo = createTodo(service);
        const updated = service.updateTodos({ title: 'New', description: 'Updated', date: '2025-09-18', completed: true }, todo.id);
        expect(updated).not.toBeNull();
        expect(updated?.title).toBe('New');
        const storedTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || '[]');
        expect(storedTodos[0].title).toBe('New');
    });

    it('should find a todo by id', () => {
        const todo = createTodo(service);
        const found = service.findTodo(todo.id);
        expect(found).toEqual(todo);
    });

    it('should remove a todo', () => {
        const todo = createTodo(service);
        service.removeTodo(todo.id);
        expect(service.getAllTodos()).toHaveLength(0);
        const storedTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || '[]');
        expect(storedTodos).toHaveLength(0);
    });

    it('should mark as done', () => {
        const todo = createTodo(service);
        service.markAsDone(todo.id);
        expect(todo.completed).toBe(true);
    })

});
