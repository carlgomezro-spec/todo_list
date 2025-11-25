import React from "react";
import Card from "./Card/Card";


const TodoList = ({ todos, onDelete, onToggleDone, onEdit }) => {
  if (!todos || todos.length === 0) {
    return <div className="empty">No hay tareas</div>;
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <Card
          key={todo._id}
          todo={todo}
          onDelete={() => onDelete(todo._id)}
          onToggleDone={() => onToggleDone(todo._id)}
          onEdit={() => onEdit(todo)}
        />
      ))}
    </div>
  );
}

export default TodoList;