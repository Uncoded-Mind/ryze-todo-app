import React, { useState, useEffect } from 'react';
import { TodoItem } from '../services/todo';


interface ITodoFormProps {
    onSave: (data: Omit<TodoItem, 'id'>, id?: string) => void;
    currentTodo: TodoItem | null;
};


const TodoForm: React.FC<ITodoFormProps> = ({ onSave, currentTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        setTitle(currentTodo?.title || '');
        setDescription(currentTodo?.description || '');
        setDate(currentTodo?.date || '');
    }, [currentTodo]);


    const handleSubmit = () => {
        if (!title || !description || !date) {
            setError('All fields required');
            return;
        }
        setError('');
        onSave({ title, description, date }, currentTodo?.id);
        setTitle('');
        setDescription('');
        setDate('');
    };


    return (
        <>
            <div className="form-field">
                <p>Title</p>
                <input value={title} maxLength={100} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="form-field">
                <p>Text</p>
                <textarea value={description} maxLength={300} onChange={e => setDescription(e.target.value)} />
                <div className="charcount">{description.length}/300</div>
            </div>
            <div className="form-field">
                <p>Date</p>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="submit-btn" onClick={handleSubmit}>Save</button>
        </>
    );
};


export default TodoForm;