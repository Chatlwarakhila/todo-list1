import { useState } from 'react';
import './App.css';

function App() {
    let [todoInput, updateInput] = useState('');
    let [todoList, updateTodos] = useState([
        {
            id: 1,
            task: 'Learn React',
        },
        {
            id: 2,
            task: 'Learn Angular',
        },
    ]);

    let [isEditing, setIsEditing] = useState(false); // Track if we are editing a task
    let [editId, setEditId] = useState(null); // Track the id of the task being edited

    let nextId = 3;

    function addNewTodo() {
        if (todoInput.trim() === '') {
            alert('Please add a task');
            return;
        }

        if (isEditing) {
            // Edit the existing task
            let updatedTodos = todoList.map((todo) =>
                todo.id === editId ? { id: todo.id, task: todoInput } : todo
            );
            updateTodos(updatedTodos);
            setIsEditing(false);
            setEditId(null);
        } else {
            // Add a new task
            let newTodos = [
                ...todoList,
                {
                    id: nextId++,
                    task: todoInput,
                },
            ];
            updateTodos(newTodos);
        }

        updateInput(''); // Clear the input field
    }

    function deleteTodo(id) {
        let filteredTodos = todoList.filter((todo) => todo.id !== id);
        updateTodos(filteredTodos);
    }

    function editTodo(id, task) {
        updateInput(task); // Set the input field with the task to edit
        setIsEditing(true); // Enable editing mode
        setEditId(id); // Set the id of the task being edited
    }

    return (
        <div className="container mt-5 w-50">
            <h3 className="text-center">Todo App</h3>
            <div className="input-group">
                <input
                    className="form-control"
                    onChange={(e) => {
                        let task = e.target.value;
                        updateInput(task);
                    }}
                    type="text"
                    value={todoInput}
                />
                <button
                    onClick={() => {
                        addNewTodo();
                    }}
                    className="btn btn-primary"
                >
                    {isEditing ? 'Update' : 'Add'}
                </button>
            </div>
            <ul className="list-group mt-4">
                {todoList.map((todo) => (
                    <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <p>{todo.task}</p>
                        <div>
                            <button
                                onClick={() => {
                                    editTodo(todo.id, todo.task);
                                }}
                                className="btn btn-warning me-2"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => {
                                    deleteTodo(todo.id);
                                }}
                                className="btn btn-danger"
                            >
                                ❌
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
