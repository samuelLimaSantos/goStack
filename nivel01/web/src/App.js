import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import api from "./services/api";
import "./App.css";

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post("/projects", {
      owner: "Mario Vergara",
      title: "Studying English",
    });
    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Página react" />

      <ul>
        {projects.map(({ owner, title, id }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar projeto
      </button>
    </>
  );
};

export default App;
