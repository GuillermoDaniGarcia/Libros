/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
export default function CajaLibro(props) {
  const { libro, guardadoId, setOpen } = props;
  const [isFav, setIsFav] = useState(false);

  const setLocalStorage = (value) => {
    let listaFav = [];
    try {
      if (isFav) {
        const valoresLocal = JSON.parse(window.localStorage.getItem("isFav"));
        if (valoresLocal != null) {
          listaFav = valoresLocal;
        }
        listaFav.push(value);
        const miArrayJSON = JSON.stringify(listaFav);
        window.localStorage.setItem("isFav", miArrayJSON);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLocalStorage(libro.id);
  }, [isFav]);

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
          setOpen((o) => !o);
        }}
      >
        <img
          src={libro.formats["image/jpeg"]}
          width="150px"
          alt={libro.title}
        ></img>
      </div>

      <img
        className="imagenes img_favs"
        src={isFav ? "/img/heart.png" : "/img/favourite.png"}
        alt="Favourite"
        onClick={() => {
          guardadoId(libro.id);
          setIsFav(!isFav);
          console.log(libro.id);
        }}
      ></img>
    </div>
  );
}
