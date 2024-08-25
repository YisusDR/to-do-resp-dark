//src/App.jsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";
import TodoComputed from "./components/TodoComputed";
import TodoFilter from "./components/TodoFilter";

import { DragDropContext } from "@hello-pangea/dnd";

const initialStateTodo = JSON.parse(localStorage.getItem("todos")) || [];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App = () => {
  const [todos, setTodos] = useState(initialStateTodo);
  const [editingTodoId, setEditingTodoId] = useState(null); // Estado para manejar cuál todo se está editando

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const createTodo = (titulo) => {
    const newTodo = {
      id: Date.now(),
      titulo: titulo.trim(),
      complete: false,
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const EditTodo = (id, nuevoTitulo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, titulo: nuevoTitulo } : todo
      )
    );
    setEditingTodoId(null); // Salimos del modo de edición
  };
  const computedItemLeft = todos.filter((todo) => !todo.complete).length;

  const clearComplete = () => {
    setTodos(todos.filter((todo) => !todo.complete));
  };

  const [filter, setFilter] = useState("all");

  const filteredTodos = () => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.complete);
      case "complete":
        return todos.filter((todo) => todo.complete);
      default:
        return todos;
    }
  };

  const changeFilter = (filter) => setFilter(filter);

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    setTodos((prevTasks) =>
      reorder(prevTasks, source.index, destination.index)
    );
  };

  return (
    <div className="bg-[url('./assets/images/bg-mobile-light.jpg')] bg-no-repeat bg-contain bg-gray-200 min-h-screen dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] md:bg-[url('./assets/images/bg-desktop-light.jpg')] dark:md:bg-[url('./assets/images/bg-desktop-dark.jpg')]">
      <Header />
      <main className="container mx-auto px-4 mt-8 md:max-w-xl">
        <TodoCreate createTodo={createTodo} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <TodoList
            todos={filteredTodos()}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            EditTodo={EditTodo}
            editingTodoId={editingTodoId}
            setEditingTodoId={setEditingTodoId}
          />
        </DragDropContext>
        <TodoComputed
          computedItemLeft={computedItemLeft}
          clearComplete={clearComplete}
        />

        <TodoFilter changeFilter={changeFilter} />
      </main>

      <footer className="text-center mt-8 text-gray-400">Drag and drop </footer>
    </div>
  );
};

export default App;
