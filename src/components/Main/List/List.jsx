import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card/Card";
import Tasks from "../../todos.json";

const List = () => {
  const [tasks, setTasks] = useState(
    Tasks.map((t) => ({ ...t, id: uuidv4(), completed: false })) // Inicializamos tareas del JSON con id único y completed false
  );
  const [mensaje, setMensaje] = useState(""); // Mensaje de éxito
  const [error, setError] = useState("");    // Mensaje de error
  const [values, setValues] = useState({
    title: "",
    description: "",
    completed: false,
  }); // Estado del formulario

  // Se ejecuta cada vez que el usuario escribe en un input
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setError(""); // Limpiar error al escribir
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que recargue la página

    if (values.title.length < 6) { // Validación del título
      setError("El título debe tener al menos 6 caracteres");
      return; 
    }

    // Crear nueva tarea y añadirla al estado
    const newTask = { ...values, id: uuidv4(), completed: false };
    setTasks([...tasks, newTask]);

    // Mostrar mensaje de éxito y limpiarlo después de 3 segundos
    setMensaje("Tarea añadida correctamente");
    setTimeout(() => setMensaje(""), 3000);

    // Limpiar formulario
    setValues({ title: "", description: "", completed: false });
  };

  // Función para eliminar una tarea por id
  const removeTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  // Función para marcar/desmarcar tarea como completada
  const toggleCompleted = (id) =>
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

  // Función para editar una tarea
  const editTask = (id, updatedTask) =>
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));

  // Función que devuelve los componentes Card
  const paintData = () =>
    tasks.map((task) => (
      <Card
        key={task.id}                   // React necesita key única
        data={task}                     // Pasamos los datos de la tarea
        remove={() => removeTask(task.id)}       // Función para eliminar
        checkcompleted={() => toggleCompleted(task.id)} // Función para tachar
        edit={(updatedTask) => editTask(task.id, updatedTask)} // Función para editar
      />
    ));

  // Funciones para resetear o vaciar la lista
  const removeData = () => setTasks([]);
  const loadData = () =>
    setTasks(Tasks.map((t) => ({ ...t, id: uuidv4(), completed: false })));

  // RETURN -> lo que renderizaremos en la pantalla
  return (
    <div>
      <form onSubmit={handleSubmit} className="formulario">
        <label htmlFor="title">Título de la tarea</label>
        <br />
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Descripción</label>
        <br />
        <input
          type="text"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
        <br />
        {/* Validación para completar los campos */}
        {values.title && values.description ? (
          <button type="submit">ADD</button>
        ) : (
          <b className="completar">Completa los campos</b>
        )}
      </form>

      <article className="mensajes">
        {error && <div className="error">{error}</div>}
        {mensaje && <div className="mensaje">{mensaje}</div>}
      </article>

      <div className="botones">
        {/* Botones para resetear o vaciar la lista */}
        <button onClick={loadData}>Reset</button>
        <button onClick={removeData}>Clear</button>
      </div>

      {/* Pintamos las tarjetas */}
      {paintData()}
    </div>
  );
};

export default List;
