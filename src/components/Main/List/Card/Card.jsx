import React, { useState } from "react";

const Card = ({ data, remove, checkcompleted, edit }) => {
  const { title, description, completed } = data;

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ ...data });

  const handleEditChange = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    edit(editValues);
    setIsEditing(false);
  };

  return (
    <article className="card">
      <div className="headerCard">
        <h3
          onClick={checkcompleted}
          style={{ textDecoration: completed ? "line-through" : "none", cursor: "pointer" }}
        >
          {title || "--"}
        </h3>
      </div>
      <p className="description">{description || "--"}</p>
      <br />
      <button onClick={remove}>Eliminar</button>
      <button onClick={() => setIsEditing(true)}>Editar</button>

      {isEditing && (
        <form onSubmit={handleEditSubmit} className="formEdit">
          <input
            type="text"
            name="title"
            value={editValues.title}
            onChange={handleEditChange}
          /><br />
          <input
            type="text"
            name="description"
            value={editValues.description}
            onChange={handleEditChange}
          /><br />
          <div className="botonesEdit">
            <button type="submit">SAVE</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
    </article>
  );
};

export default Card;
