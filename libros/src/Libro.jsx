/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function Libro(props) {
  const { id } = props;
  const [libro, setLibro] = useState();
  const getLibro = async () => {
    fetch("https://gutendex.com/books/" + id + "/")
      .then((response) => response.json())
      .then((Libro) => {
        setLibro(Libro);
      });
  };
  useEffect(() => {
    if (id != 0) {
      getLibro();
    }
  }, [id]);
  return libro ? (
    <main>
      <div className="pop-up">
        <p className="p-about">About the book:</p>
        <p className="p-titulo">
          Title:
          {libro.title}
        </p>
        <p className="p-autores">
          {libro.authors.map((authors) => {
            return (
              <p>
                Author/s:{" "}
                {`${authors.name} (${authors.birth_year}-${authors.death_year})`}
              </p>
            );
          })}
        </p>
        <p className="p-subjects">
          Subjects:
          {libro.subjects.map((subjects) => {
            return <p className="p-subjects-list">{subjects}</p>;
          })}
        </p>
        <p id="p-librerias">
          Bookshelves:
          {libro.bookshelves.map((bookshelves) => {
            return <p className="p-librerias-list">{bookshelves}</p>;
          })}
        </p>
        <p id="lenguajes">
          {libro.languages.map((languages) => {
            return <p>Language/s: {languages}</p>;
          })}
        </p>
        <p id="imagen">
          <img
            src={libro.formats["image/jpeg"]}
            width="150px"
            alt={libro.title}
          ></img>
        </p>
      </div>
    </main>
  ) : (
    <></>
  );
}
