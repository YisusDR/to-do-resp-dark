//src\components\TodoItem.jsx
import React, { useState } from "react";
import CrossIcon from "./icons/CrossIcon";
import IconCheck from "./icons/IconCheck";
import IconEdit from "./icons/IconEdit";

const TodoItem = React.forwardRef(
  (
    {
      todo,
      removeTodo,
      updateTodo,
      EditTodo,
      editingTodoId,
      setEditingTodoId,
      ...props
    },
    ref
  ) => {
    const { id, titulo, complete } = todo;
    const [newTitle, setNewTitle] = useState(titulo);

    const handleEdit = () => {
      if (editingTodoId === id) {
        EditTodo(id, newTitle);
      } else {
        setEditingTodoId(id);
      }
    };

    const handleChange = (e) => {
      setNewTitle(e.target.value); // Actualiza el estado con el nuevo título
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleEdit(); // Guarda los cambios al presionar "Enter"
      }
    };

    return (
      <article
        {...props}
        ref={ref}
        className="flex gap-4 py-4 border-b border-b-gray-300 dark:bg-gray-800"
      >
        <button
          className={`rounded-full border-2 h-5 w-5 inline-block ${complete ? "flex-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center" : "flex-none"}`}
          onClick={() => updateTodo(id)}
        >
          <IconCheck />
        </button>

        {editingTodoId === id ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleChange}
            onBlur={handleEdit} // Guarda cambios al perder el foco
            onKeyDown={handleKeyDown} // Guarda cambios al presionar "Enter"
            className="grow w-full text-gray-400 outline-none dark:bg-gray-800 dark:text-gray-300"
          />
        ) : (
          <p
            className={`text-gray-400 grow dark:text-gray-300 ${complete && "line-through"}`}
          >
            {titulo}
          </p>
        )}

        <button className="flex-none" onClick={() => removeTodo(id)}>
          <CrossIcon />
        </button>
        <button className="flex-none" onClick={handleEdit}>
          <IconEdit />
        </button>
      </article>
    );
  }
);
export default TodoItem;
