import React, { useState, useEffect, useRef, startTransition } from "react";

export default function Main({ editingTodo, onSave }) {
  // campos
  const [title, setTitle] = useState(() => editingTodo?.title || "");
  const [desc, setDesc] = useState(() => editingTodo?.desc || "");
  const [error, setError] = useState("");

  // timers
  const typingTimeoutRef = useRef(null);

  // limpia el timeout
  const clearTypingTimer = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  // limpia inputs (timer o post-submit)
  const clearInputs = () => {
    setTitle("");
    setDesc("");
    setError("");
  };

  // sincronizar state con editingTodo de forma segura
  useEffect(() => {
    startTransition(() => {
      setTitle(editingTodo?.title || "");
      setDesc(editingTodo?.desc || "");
      setError("");
      clearTypingTimer(); // reset timer si había
    });
  }, [editingTodo]);

  // efecto: timeout de 20s si el usuario deja de escribir
  useEffect(() => {
    if (title.trim() === "") {
      clearTypingTimer();
      return;
    }

    clearTypingTimer();

    typingTimeoutRef.current = setTimeout(() => {
      clearInputs();
    }, 20000);

    return clearTypingTimer;
  }, [title]);

  // submit: crear o guardar
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length < 6) {
      setError("El título debe tener al menos 6 caracteres");
      return;
    }

    setError("");

    if (editingTodo) {
      const updated = {
        ...editingTodo,
        title: title.trim(),
        desc: desc.trim(),
      };
      onSave(updated);
      clearInputs();
      clearTypingTimer();
      return;
    }

    // si no hay editingTodo, se podría añadir un onAdd externo
    console.warn("No editingTodo definido para guardar");
  };

  return (
    <main>
      <h2>{editingTodo ? "Editar tarea" : "Nueva tarea"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          placeholder="Título"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={desc}
          placeholder="Descripción (opcional)"
          onChange={(e) => setDesc(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">{editingTodo ? "Guardar cambios" : "Añadir"}</button>
      </form>
    </main>
  );
}
