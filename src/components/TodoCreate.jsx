//src\components\TodoCreate.jsx
import React, { useState } from "react";

const TodoCreate = ({ createTodo }) => {
  const [titulo, setTitulo] = useState("");

  const handleSubmitAddTodo = (e) => {
    e.preventDefault();
    if (!isNaN(titulo)) {
      return setTitulo("");
    }
    createTodo(titulo);
    setTitulo("");
  };

  return (
    <form
      onSubmit={handleSubmitAddTodo}
      className="bg-white rounded-md overflow-hidden py-3 gap-4 items-center px-3 flex mt-8 dark:bg-gray-800 "
    >
      <span className="rounded-full border-2 inline-block h-5 w-5"></span>
      <input
        type="text"
        placeholder="create a new todo.."
        className="w-full text-gray-400 outline-none dark:bg-gray-800 "
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
    </form>
  );
};

export default TodoCreate;
