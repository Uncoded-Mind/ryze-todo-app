import { useState, useEffect, useRef } from 'react';
import { TodoItem } from '../../types/types';
//components


interface ITodoFormProps {
    onSave: (data: Omit<TodoItem, 'id'>, id?: number) => void;
    onCancel: () => void;
    currentTodo: TodoItem | null;
};

interface IFormValues {
    title: string;
    description: string;
    date: string;
}

function TodoForm({ onSave, onCancel, currentTodo }: ITodoFormProps) {

    const today = new Date().toISOString().split('T')[0];
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(today);
    const [error, setError] = useState('');
    const submitRef = useRef<() => void>(() => { });

    const hasReachedTitleMax = title.length === 100;
    const hasReachedDescriptionMax = description.length === 300;

    const validateForm = (values: IFormValues): string | undefined => {
        const rules: Record<keyof IFormValues, string> = {
            title: "Title is required",
            description: "Description is required",
            date: "Date is required",
        };

        const missing = (Object.entries(rules) as [keyof IFormValues, string][])
            .find(([field]) => !values[field]);

        return missing?.[1]

    };

    const onSubmit = () => {
        const error = validateForm({ title, description, date });
        const completed = false;
        if (error) {
            setError(error);
            return;
        }
        setError('');
        onSave({ title, description, date, completed }, currentTodo?.id);
        setTitle('');
        setDescription('');
        setDate('');
    };

    submitRef.current = onSubmit;

    useEffect(() => {
        setTitle(currentTodo?.title || '');
        setDescription(currentTodo?.description || '');
        setDate(currentTodo?.date || '');
    }, [currentTodo]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                submitRef.current();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);


    return (
        <div className='form-container'>
            <div className="form-field">
                <label htmlFor='title'>Title</label>
                <input id="title" placeholder='Give your task a title...' value={title} maxLength={100} onChange={e => setTitle(e.target.value)} />
                <p className={`charcount ${hasReachedTitleMax ? "max-length" : ""}`} >{title.length}/100</p>
            </div>
            <div className="form-field">
                <label htmlFor='description'>Title</label>
                <textarea id='description' placeholder='Describe your task...' rows={5} value={description} maxLength={300} onChange={e => setDescription(e.target.value)} />
                <p className={`charcount ${hasReachedDescriptionMax ? "max-length" : ""}`} >{description.length}/300</p>
            </div>
            <div className="form-field">
                <label htmlFor='date'>Date</label>
                <input id="date" type="date" min={today} value={date} onChange={e => setDate(e.target.value)} />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="btn-container">
                <button className="submit-btn" onClick={onSubmit}>Save</button>
                {currentTodo && <button className="btn" onClick={onCancel}>Cancel</button>}
            </div>
        </div>
    );
};


export default TodoForm;