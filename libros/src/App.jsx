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
  // Creamos los diferentes estados que va a tener la página
  // Para cargar los libros
  const [libros, setLibros] = useState([]);

  // Para el buscador
  const [filtro, setFiltro] = useState("");

  // Para el loader
  const [recarga, setRecarga] = useState(false);

  // Para almacenar las id de los libros
  const [idLibro, setIdLibro] = useState(0);

  // Estados para el pop-up
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  // Estados para la paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(32);

  // Creamos estado para el input de la paginación
  const [input, setInput] = useState(1);

  // Variable pàra el máximo de páginas que van a haber
  const maximo = libros.length / porPagina;

  // Creamos método para pasar a la página anterior
  const previousPage = async () => {
    setInput(parseInt(input) - 1);
    setPagina(parseInt(pagina) - 1);
    setRecarga(true);
    let newURL = URL;
    if (input != "") {
      newURL = newURL + "?page=" + input;
    }
    const response = await fetch(newURL);
    const listaLibros = await response.json();
    setLibros(listaLibros.results);
    setRecarga(false);
  };

  // Creamos método para pasar a la página siguiente
  const nextPage = async () => {
    setInput(parseInt(input) + 1);
    setPagina(parseInt(pagina) + 1);
    setRecarga(true);
    let newURL = URL;
    if (input != "") {
      newURL = newURL + "?page=" + input;
    }
    const response = await fetch(newURL);
    const listaLibros = await response.json();
    setLibros(listaLibros.results);
    setRecarga(false);
  };

  // Método para comprobar los números que nos deja escribir en el input
  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      setPagina(parseInt(e.target.value));
      if (
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(maximo) ||
        isNaN(parseInt(e.target.value))
      ) {
        setPagina(1);
        setInput(1);
      } else {
        setPagina(parseInt(e.target.value));
      }
    }
  };

  // Método que si escribimos letras en el input, lo cambie al valor original
  const onChange = (e) => {
    setInput(e.target.value);
  };

  // Función que nos guarda el filtro
  function guardadoFiltro(filtro) {
    setFiltro(filtro);
  }

  // Función que nos guarda la id
  function guardadoId(idLibro) {
    setIdLibro(idLibro);
  }

  // Creamos una variable con la api y a continuación creamos el método que nos va a realizar el fetch
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

  //Creamos un useEffect para actualizar el estado cada vez que realicemos una búsqueda
  useEffect(() => {
    getLibros();
  }, [filtro]);

  // Creamos una función que nos ordena los libros de A-Z o Z-A
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

  // Creamos un método para mostrar los libros que son favoritos
  const mostrarFav = () => {
    const valoresLocal = JSON.parse(window.localStorage.getItem("isFav"));
    const recorrerLibroId = [];

    libros.map((libro) => {
      if (valoresLocal.includes(libro.id)) {
        recorrerLibroId.push(libro);
      }
    });
    setLibros(recorrerLibroId);
  };

  // Creamos un método que nos carga los libros de la manera que estaban originalmente
  const mostrarOriginal = async () => {
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

  return (
    <div className="App">
      {/* Si la página se recarga, que se muestre el loader */}
      <div className={recarga ? "loader" : "loader-hidden"}></div>
      <header>
        {/* Creamos el input para el buscador */}
        <div className="input-wrapper">
          <input
            type="search"
            className="input"
            placeholder="Search"
            onChange={(event) => {
              let textoBuscar = event.target.value;
              textoBuscar = textoBuscar.replaceAll(" ", "%20");
              textoBuscar = textoBuscar.toLowerCase();
              guardadoFiltro(textoBuscar);
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
        {/* Botones del header para las distintas funcionalidades, que llaman a los métodos creados anteriormente */}
        <button
          className="orden"
          onClick={() => {
            ordenarLibros();
          }}
        >
          Ordenar
        </button>
        <button
          className="favoritos"
          onClick={() => {
            mostrarFav();
          }}
        >
          Favoritos
        </button>
        <button
          className="mostrar-original"
          onClick={() => {
            mostrarOriginal();
          }}
        >
          Mostrar Original
        </button>
      </header>
      <main>
        {/* Llamamos a cada libro en una caja independiente, ya que cada libro tendrá estados propios */}
        <div className="todo">
          {libros
            .slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            )
            .map((libro) => {
              return (
                <CajaLibro
                  pagina={pagina}
                  setPagina={setPagina}
                  maximo={maximo}
                  libro={libro}
                  guardadoId={guardadoId}
                  setOpen={setOpen}
                ></CajaLibro>
              );
            })}{" "}
        </div>
      </main>
      <footer>
        <div className="container">
          <button
            disabled={pagina == 1 || pagina < 1}
            className="button-paginacion"
            onClick={previousPage}
          >
            <img
              className="img-paginacion"
              src="/img/back.png"
              alt="Botón back"
            ></img>
          </button>
          <input
            onChange={(e) => onChange(e)}
            onKeyDown={(e) => onKeyDown(e)}
            value={input}
            className="input-paginacion"
            autoComplete="off"
          />
          <p>de {maximo}</p>
          <button
            disabled={pagina == Math.ceil(maximo) || pagina > Math.ceil(maximo)}
            className="button-paginacion"
            onClick={nextPage}
          >
            <img
              className="img-paginacion"
              src="/img/right-arrow.png"
              alt="Botón forward"
            ></img>
          </button>
        </div>
      </footer>
      {/* Creamos el pop-up */}
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
