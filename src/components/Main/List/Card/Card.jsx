import React from "react";

const Card = ({ todo, onDelete, onToggleDone, onEdit }) => {
  return (
    <div className={`todo-item ${todo.isDone ? "done" : ""}`}>
      <div className="todo-main">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.desc && <p className="todo-desc">{todo.desc}</p>}
      </div>

      <div className="todo-actions">
        <button className="btn small" onClick={onToggleDone}>
          {todo.isDone ? "Desmarcar" : "Marcar"}
        </button>
        <button className="btn small" onClick={onEdit}>Editar</button>
        <button className="btn danger small" onClick={onDelete}>BORRAR</button>
      </div>
    </div>
  );
}

export default Card;