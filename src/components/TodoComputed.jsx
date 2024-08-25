//src\components\TodoComputed.jsx
import React from "react";

const TodoComputed = ({ computedItemLeft, clearComplete }) => {
  return (
    <section className="py-4 px-4 flex justify-between bg-white rounded-b-md dark:bg-gray-800 ">
      <span className="text-gray-300">{computedItemLeft} item left</span>
      <button className="text-gray-300" onClick={clearComplete}>
        clear complete
      </button>
    </section>
  );
};

export default TodoComputed;
