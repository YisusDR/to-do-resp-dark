//src\components\TodoList.jsx
import React from "react";
import TodoItem from "./TodoItem";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const TodoList = ({
  todos,
  removeTodo,
  updateTodo,
  EditTodo,
  editingTodoId,
  setEditingTodoId,
}) => {
  return (
    <Droppable droppableId="todos">
      {(droppableProvider) => (
        <div
          ref={droppableProvider.innerRef}
          {...droppableProvider.droppableProps}
          className="bg-white overflow-hidden rounded-t-md [&>article]:px-4 mt-8 dark:bg-gray-800"
        >
          {todos.length === 0 ? (
            <p className="text-center text-gray-400 py-4">
              No hay datos en el array 😣
            </p>
          ) : (
            todos.map((todo, index) => (
              <Draggable key={todo.id} index={index} draggableId={`${todo.id}`}>
                {(draggableProvider) => (
                  <TodoItem
                    todo={todo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                    EditTodo={EditTodo}
                    editingTodoId={editingTodoId}
                    setEditingTodoId={setEditingTodoId}
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.dragHandleProps}
                    {...draggableProvider.draggableProps}
                  />
                )}
              </Draggable>
            ))
          )}
          {droppableProvider.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoList;
