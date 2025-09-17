import { TODO_STORAGE_KEY } from "../../helper/contants";
import { TodoService } from "./todo";

const EXAMPLE_TODO = { title: 'Test', description: 'Desc', date: '2025-09-17' };

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
        const updated = service.updateTodos({ title: 'New', description: 'Updated', date: '2025-09-18' }, todo.id);
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

});
