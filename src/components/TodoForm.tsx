import React, { useState, useEffect, useRef } from 'react';
import { TodoItem } from '../services/todo';


interface ITodoFormProps {
    onSave: (data: Omit<TodoItem, 'id'>, id?: number) => void;
    currentTodo: TodoItem | null;
};

interface IFormValues {
    title: string;
    description: string;
    date: string;
}


const TodoForm: React.FC<ITodoFormProps> = ({ onSave, currentTodo }) => {
    const today = new Date().toISOString().split('T')[0];
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const submitRef = useRef<() => void>(() => { })

    const maxLenghtTitleIsReached = title.length === 100;
    const maxLenghtDescriptionIsReached = description.length === 300;


    const validateForm = (values: IFormValues): string | null => {
        const rules: Record<keyof IFormValues, string> = {
            title: "Title is required",
            description: "Description is required",
            date: "Date is required",
        };

        for (const [field, message] of Object.entries(rules) as [keyof IFormValues, string][]) {
            if (!values[field]) {
                return message; // return first error found
            }
        }

        return null;
    };

    const onSubmit = () => {
        const error = validateForm({ title, description, date });
        if (error) {
            setError(error);
            return;
        }
        setError('');
        onSave({ title, description, date }, currentTodo?.id);
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
        <>
            <div className="form-field">
                <p>Title</p>
                <input value={title} maxLength={100} onChange={e => setTitle(e.target.value)} />
                <p className={`charcount ${maxLenghtTitleIsReached ? "max-length" : ""}`} >{title.length}/100</p>
            </div>
            <div className="form-field">
                <p>Text</p>
                <textarea rows={5} value={description} maxLength={300} onChange={e => setDescription(e.target.value)} />
                <p className={`charcount ${maxLenghtDescriptionIsReached ? "max-length" : ""}`} >{description.length}/300</p>
            </div>
            <div className="form-field">
                <p>Date</p>
                <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)} />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="submit-btn" onClick={onSubmit}>Save</button>
        </>
    );
};


export default TodoForm;