/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import Libro from "./componentes/Libro";
import Popup from "reactjs-popup";
import CajaLibro from "./componentes/cajaLibro";
import "reactjs-popup/dist/index.css";
import Paginacion from "./componentes/Paginacion";
import Header from "./componentes/Header";

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

  // Función que nos guarda el filtro
  function guardadoFiltro(filtro) {
    setFiltro(filtro);
  }

  // Función que nos guarda la id
  function guardadoId(idLibro) {
    setIdLibro(idLibro);
  }

  // Estados para la paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(32);
  const [totalLibros, setTotalLibros] = useState();

  // Creamos estado para el input de la paginación
  const [input, setInput] = useState(1);

  // Variable para el máximo de páginas que van a haber
  var maximo = 0;
  if (totalLibros % porPagina != 0) {
    maximo = parseInt(totalLibros / porPagina) + 1;
  } else {
    maximo = totalLibros / porPagina;
  }

  // Creamos una variable con la api y a continuación creamos el método que nos va a realizar el fetch
  const URL = "https://gutendex.com/books/";

  const getLibros = () => {
    setRecarga(true);
    let newURL = URL;
    if (filtro != "") {
      newURL = newURL + "?search=" + filtro;
    }
    fetch(newURL)
      .then((response) => response.json())
      .then((listaLibros) => {
        setLibros(listaLibros.results);
        setTotalLibros(listaLibros.count);
        setRecarga(false);
      });

    setInput(1);
  };

  //Creamos un useEffect para actualizar el estado cada vez que realicemos una búsqueda
  useEffect(() => {
    getLibros();
  }, [filtro]);

  // Creamos un método que nos carga los libros de la manera que estaban originalmente
  const mostrarOriginal = async () => {
    setRecarga(true);
    let newURL = URL;
    if (filtro != "") {
      newURL = newURL + "?search=" + filtro;
    }
    fetch(newURL)
      .then((response) => response.json())
      .then((listaLibros) => {
        setLibros(listaLibros.results);
        setRecarga(false);
      });

    setInput(1);
  };

  // Creamos una función que nos ordena los libros de A-Z o Z-A
  const ordenarLibros = () => {
    var sortedLibros = [...libros].sort((a, b) =>
      a.title > b.title ? 1 : a.title < b.title ? -1 : 0
    );
    setLibros(sortedLibros);

    if (sortedLibros[0] === libros[0])
      sortedLibros = [...libros].sort((b, a) =>
        a.title > b.title ? 1 : a.title < b.title ? -1 : 0
      );

    setLibros(sortedLibros);
  };

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

  // Creamos método para pasar a la página anterior
  const previousPage = () => {
    const newInput = parseInt(input) - 1;
    const newPage = newInput;
    setRecarga(true);
    let newURL = URL;
    if (input != "") {
      newURL = newURL + "?page=" + newInput;
    }
    console.log(newURL);
    fetch(newURL)
      .then((response) => response.json())
      .then((listaLibros) => {
        setLibros(listaLibros.results);
        setRecarga(false);
      });
    setInput(newInput);
    setPagina(newPage);
  };

  // Método para comprobar los números que nos deja escribir en el input
  const KeyDown = (e) => {
    if (e.keyCode == 13) {
      scrollUp();
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
      const newInput = parseInt(input);
      const newPage = newInput;
      setRecarga(true);
      let newURL = URL;
      if (input != "") {
        newURL = newURL + "?page=" + newInput;
      }
      fetch(newURL)
        .then((response) => response.json())
        .then((listaLibros) => {
          setLibros(listaLibros.results);
          setRecarga(false);
        });
      setInput(newInput);
      setPagina(newPage);
    }
  };

  // Método que si escribimos letras en el input, lo cambie al valor original
  const Change = (e) => {
    setInput(e.target.value);
  };

  // Creamos método para pasar a la página siguiente
  const nextPage = () => {
    const newInput = parseInt(input) + 1;
    const newPage = newInput;
    setRecarga(true);
    let newURL = URL;
    if (input != "") {
      newURL = newURL + "?page=" + newInput;
    }
    fetch(newURL)
      .then((response) => response.json())
      .then((listaLibros) => {
        setLibros(listaLibros.results);
        setRecarga(false);
      });
    setInput(newInput);
    setPagina(newPage);
  };

  // Creamos un método para que al cambiar de página nos ponga el scroll arriba del todo
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("hola");
  };

  return (
    <div className="App">
      {/* Si la página se recarga, que se muestre el loader */}
      <div className={recarga ? "loader" : "loader-hidden"}></div>
      <Header
        guardadoFiltro={guardadoFiltro}
        ordenarLibros={ordenarLibros}
        maximo={maximo}
        input={input}
        mostrarFav={mostrarFav}
        mostrarOriginal={mostrarOriginal}
      ></Header>
      <main>
        {/* Llamamos a cada libro en una caja independiente, ya que cada libro tendrá estados propios */}
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
      <footer>
        <Paginacion
          pagina={pagina}
          scrollUp={scrollUp}
          previousPage={previousPage}
          Change={Change}
          KeyDown={KeyDown}
          nextPage={nextPage}
          input={input}
          maximo={maximo}
        ></Paginacion>
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
