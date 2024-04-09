/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

export default function Libro(props) {
  const { id } = props;

  //Creamos el estado del pop-up, que será donde estarán almacenados cada libro
  const [libro, setLibro] = useState();

  //Nos pilla la imagen de cada libro
  const getLibro = async () => {
    fetch("https://gutendex.com/books/" + id + "/")
      .then((response) => response.json())
      .then((Libro) => {
        setLibro(Libro);
      });
  };

  // Nos detecta la id del libro en el que hagamos click para poder así identificar la información que salta en el pop-up
  useEffect(() => {
    if (id != 0) {
      getLibro();
    }
  }, [id]);

  return libro ? (
    <main>
      <div className="pop-up">
        <p className="p-about">
          <b>About the book:</b>
        </p>
        <p className="p-titulo">
          <u>Title</u>:{" " + libro.title}
        </p>
        <p className="p-autores">
          {libro.authors.map((authors) => {
            return (
              <p>
                <u>Author/s</u>:{" "}
                {`${authors.name} (${authors.birth_year}-${authors.death_year})`}
              </p>
            );
          })}
        </p>
        <p className="p-subjects">
          <u>Subjects</u>:
          {libro.subjects.map((subjects) => {
            return <p className="p-subjects-list">{subjects}</p>;
          })}
        </p>
        <p id="p-librerias">
          <u>Bookshelves</u>:
          {libro.bookshelves.map((bookshelves) => {
            return <p className="p-librerias-list">{bookshelves}</p>;
          })}
        </p>
        <p id="p-imagen">
          <img
            src={libro.formats["image/jpeg"]}
            width="150px"
            alt={libro.title}
          ></img>
        </p>
      </div>
    </main>
  ) : (
    <>
      {" "}
      <div className="loader"></div>
    </>
  );
}
