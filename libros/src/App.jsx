/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import Libro from "./Libro";

function App() {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [recarga, setRecarga] = useState(false);
  const [idLibro, setIdLibro] = useState(0);

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

  return (
    <div className="App">
      <Libro id={idLibro}></Libro>
      <div className={recarga ? "loader" : "loader-hidden"}></div>
      <header>
        <input
          onChange={(event) => {
            let textoBuscar = event.target.value;
            textoBuscar = textoBuscar.replaceAll(" ", "%20");
            textoBuscar = textoBuscar.toLowerCase();
            guardado(textoBuscar);
          }}
        ></input>
      </header>
      <main>
        <div className="todo">
          {libros.map((libro) => {
            return (
              <div key={libro.id} className="libro">
                <div className="titulo">
                  <p>Title: {libro.title}</p>
                  {libro.authors.map((authors) => {
                    return <p>Author/s: {authors.name}</p>;
                  })}

                  <div className="lenguajes">
                    {libro.languages.map((languages) => {
                      return <p>Language/s: {languages}</p>;
                    })}
                  </div>
                  <div className="tipos">
                    {libro.bookshelves.map((bookshelves) => {
                      return <p>{bookshelves}</p>;
                    })}
                  </div>
                </div>

                <div
                  className="imagen"
                  onClick={() => {
                    guardadoId(libro.id);
                  }}
                >
                  <img
                    src={libro.formats["image/jpeg"]}
                    width="150px"
                    alt={libro.title}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
