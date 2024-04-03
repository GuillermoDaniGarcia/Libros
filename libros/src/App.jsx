/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import Libro from "./Libro";
import Popup from "reactjs-popup";
import CajaLibro from "./cajaLibro";
import "reactjs-popup/dist/index.css";

function App() {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [recarga, setRecarga] = useState(false);
  const [idLibro, setIdLibro] = useState(0);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  function guardado(filtro) {
    setFiltro(filtro);
  }

  function guardadoId(idLibro) {
    setIdLibro(idLibro);
  }

  const URL = "https://gutendex.com/books/";

  const getLibros = async () => {
    setRecarga(true);
    let newURL = URL;
    if (filtro != "") {
      newURL = newURL + "?search=" + filtro;
    }
    const response = await fetch(newURL);
    const listaLibros = await response.json();
    setLibros(listaLibros.results);
    setRecarga(false);
  };

  useEffect(() => {
    getLibros();
  }, [filtro]);

  function ordenarLibros() {
    var sortedLibros = [...libros].sort((a, b) =>
      a.title > b.title ? 1 : a.title < b.title ? -1 : 0
    );
    setLibros(sortedLibros);

    if (sortedLibros[0] === libros[0])
      sortedLibros = [...libros].sort((b, a) =>
        a.title > b.title ? 1 : a.title < b.title ? -1 : 0
      );

    setLibros(sortedLibros);
  }

  return (
    <div className="App">
      <div className={recarga ? "loader" : "loader-hidden"}></div>
      <header>
        <div className="input-wrapper">
          <input
            type="search"
            className="input"
            placeholder="Search"
            onChange={(event) => {
              let textoBuscar = event.target.value;
              textoBuscar = textoBuscar.replaceAll(" ", "%20");
              textoBuscar = textoBuscar.toLowerCase();
              guardado(textoBuscar);
            }}
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="input-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <button
          className="orden"
          onClick={() => {
            ordenarLibros();
          }}
        >
          Ordenar
        </button>
        <button className="favoritos">Favoritos</button>
      </header>
      <main>
        <div className="todo">
          {libros.map((libro) => {
            return (
              <CajaLibro
                libro={libro}
                guardadoId={guardadoId}
                setOpen={setOpen}
              ></CajaLibro>
            );
          })}{" "}
        </div>
      </main>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="allPopup">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <Libro id={idLibro}></Libro>
        </div>
      </Popup>
    </div>
  );
}

export default App;
