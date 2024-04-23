/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
export default function CajaLibro(props) {
  // Importamos las variables que necesitamos
  const { libro, guardadoId, setOpen } = props;

  // Creamos un estado para saber si el libro es favorito o no
  const [isFav, setIsFav] = useState(false);

  // Creamos un método que nos guarde en el local storage la id del libros que sea favoritos
  const setLocalStorage = (value) => {
    const valoresLocal = JSON.parse(window.localStorage.getItem("isFav"));
    let listaFav = [];
    try {
      if (valoresLocal != null) {
        listaFav = valoresLocal;
      }
      listaFav.push(value);
      window.localStorage.setItem("isFav", JSON.stringify(listaFav));
    } catch (error) {
      console.error(error);
    }
  };

  // Creamos una función que nos almacene en el local storage la id del libro que sea favorito o no
  function marcarFav() {
    if (!isFav) {
      setLocalStorage(libro.id);
    } else {
      removeLocalStorage(libro.id);
    }
    setIsFav(!isFav);
  }

  // Creamos un método que nos quite del local storage la id del libro que deja de ser favorito
  const removeLocalStorage = (value) => {
    try {
      const valoresLocal = JSON.parse(window.localStorage.getItem("isFav"));
      if (valoresLocal != null) {
        const resultado = valoresLocal.filter((valor) => valor != value);
        window.localStorage.setItem("isFav", JSON.stringify(resultado));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Creamos un método que nos detecta si el libro está en favorito o no, para cambiar el estado cada vez que isFav cambie
  useEffect(() => {
    const valoresLocal = JSON.parse(window.localStorage.getItem("isFav"));
    const resultado = valoresLocal.filter((valor) => valor == libro.id);
    if (resultado.length == 0) {
      setIsFav(false);
    } else {
      setIsFav(true);
    }
  }, []);

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
      <div className="todo-imagen">
        <div className="imagen">
          <img
            src={libro.formats["image/jpeg"]}
            width="150px"
            height="230px"
            alt={libro.title}
          ></img>
        </div>
        <div className="debajo-imagen">
          <div className="botoncitos">
            <button
              className="ver-datos"
              onClick={() => {
                guardadoId(libro.id);
                // Abre el pop-up
                setOpen((o) => !o);
              }}
            >
              Ver datos
            </button>
          </div>
          <a href={libro.formats["application/octet-stream"]} target="_blank">
            <img
              className="download"
              src="/img/download.png"
              alt="download"
            ></img>
          </a>
          <img
            className="imagenes img_favs"
            // Si es favorito pon una imagen y si no lo es pon otra
            src={isFav ? "/img/heart.png" : "/img/favourite.png"}
            alt="Favourite"
            onClick={() => {
              //Llamamos al método que nos detecta si el libro es favorito o no
              marcarFav();
            }}
          ></img>
        </div>
      </div>
    </div>
  );
}
