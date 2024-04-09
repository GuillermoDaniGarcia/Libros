/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function Header(props) {
  // Pasamos por props los parámetros que necesitamos
  const {
    guardadoFiltro,
    ordenarLibros,
    maximo,
    input,
    mostrarFav,
    mostrarOriginal,
  } = props;

  return (
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
      <div className="botones">
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
      </div>
      <div className="num-pags">
        Página {input} de {maximo}
      </div>
    </header>
  );
}
