export type Credentials = { username: string; password: string };
export type TodoItem = {
    id: number;
    title: string;
    description: string;
    date: string;
    completed: boolean;
    createdAt?: string;
    documentId?: string;
    publishedAt?: string;
    updatedAt?: string;
};

