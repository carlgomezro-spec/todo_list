import React, {useState}from "react";
import preloadData from "./components/todos.json"
import Card from "./components/Main/List/Card/Card";
import List from "./components/Main/List/List";


const App = () => {
    // estado principal: array de todos
   const [todos, setTodos] = useState(() => preloadData);

  const [message, setMessage] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

 
  // ADD o SAVE (si editingTodo)
  const handleAdd = (newTodo) => {
    setTodos(prev => [newTodo, ...prev]);
    // mensaje "tarea añadida" 5s
    setMessage("tarea añadida");
    setTimeout(() => setMessage(""), 5000);
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(t => t._id !== id));
    // si está editando la misma tarea, cancelar edición
    if (editingTodo && editingTodo._id === id) setEditingTodo(null);
  };

  const handleClear = () => setTodos([]);

  const handleReset = () => {
    setTodos(preloadData);
    setEditingTodo(null);
  };

  const handleToggleDone = (id) => {
    setTodos(prev => prev.map(t => t._id === id ? {...t, isDone: !t.isDone} : t));
  };

  const handleStartEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleSaveEdit = (updated) => {
    setTodos(prev => prev.map(t => t._id === updated._id ? updated : t));
    setEditingTodo(null);
    // mostrar mensaje breve
    setMessage("tarea guardada");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="app-container">
      <h1>TODO List - Ejercicio</h1>
      <div className="controls">
        <button className="btn secondary" onClick={handleClear}>CLEAR (borrar todo)</button>
        <button className="btn secondary" onClick={handleReset}>RESET (tareas precargadas)</button>
      </div>

      <Card
        onAdd={handleAdd}
        onSaveEdit={handleSaveEdit}
        editingTodo={editingTodo}
        cancelEdit={() => setEditingTodo(null)}
      />

      {message && <div className="message">{message}</div>}

      <List
        todos={todos}
        onDelete={handleDelete}
        onToggleDone={handleToggleDone}
        onEdit={handleStartEdit}
      />
    </div>
  );
}

export default App;
