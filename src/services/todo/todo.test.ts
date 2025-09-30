import { TodoService } from "./todo";
import { TodoItem } from "../../types/types";

const EXAMPLE_TODO: Omit<TodoItem, "id"> = {
  title: "Test",
  description: "Desc",
  date: "2025-09-17",
  completed: true,
};

describe("TodoService (mocked API)", () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
    // Reset global fetch mock
    (global as any).fetch = jest.fn();
  });

  it("should get all todos", async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => { return { data: [{ id: 1, ...EXAMPLE_TODO }, { id: 2, ...EXAMPLE_TODO }] } },
    });

    const todos = await service.getAllTodos();

    expect(todos).toHaveLength(2);
    expect(todos[0].title).toBe("Test");
  });

  it("should add a todo", async () => {
    const returnedTodo = { id: 1, ...EXAMPLE_TODO };
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => returnedTodo,
    });

    const todo = await service.addTodo(EXAMPLE_TODO);
    expect(todo.id).toBe(1);
    expect(todo.title).toBe("Test");
  });

  it("should update a todo", async () => {
    const baseData = {
      title: "Updated Title",
      description: "Updated Desc",
      date: "2025-09-20",
      completed: false,
      id: 1,
    };
    const updatedTodo = {
      title: "Updated Title",
      description: "Updated Desc",
      date: "2025-09-20",
      completed: false,
      id: 2,
    };;

    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedTodo,
    });

    const result = await service.updateTodo(baseData);
    expect(result).not.toBeNull();
    expect(result?.id).toBe(2);
    expect(result?.title).toBe("Updated Title");
  });

  it("should find a todo by id", async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, ...EXAMPLE_TODO }),
    });

    const todo = await service.findTodo(1);
    expect(todo).not.toBeNull();
    expect(todo?.title).toBe("Test");
  });

  it("should mark a todo as done", async () => {
    const doneTodo = { id: 1, ...EXAMPLE_TODO, completed: true };
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => doneTodo,
    });

    const result = await service.markAsDone(1);
    expect(result.completed).toBe(true);
  });

  it("should remove a todo", async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
    });

    await expect(service.removeTodo(1)).resolves.toBeUndefined();
  });
});
