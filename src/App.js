import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));

    // .get("https://jsonplaceholder.typicode.com/todos")
    // .then((res) => setTodos(res.data));
  }, []);

  const totalPages = Math.ceil(todos.length / todosPerPage);
  const page = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const previousPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const nextPageHandler = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="App">
      {visibleTodos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      <span onClick={previousPageHandler}>previous</span>
      <p>
        {page.map((singlePage) => (
          <span
            key={singlePage}
            onClick={() => setCurrentPage(singlePage)}
            className={`${
              currentPage === singlePage ? "green-background" : ""
            }`}
          >{`${singlePage}  `}</span>
        ))}
      </p>
      <span onClick={nextPageHandler}>Next</span>
    </div>
  );
}
