/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function Paginacion(props) {
  // Pasamos por props los parámetros que necesitamos
  const {
    pagina,
    scrollUp,
    maximo,
    input,
    previousPage,
    Change,
    KeyDown,
    nextPage,
  } = props;

  return (
    <div className="container">
      <button
        disabled={pagina == 1 || pagina < 1}
        className="button-paginacion"
        onClick={() => {
          scrollUp();
          previousPage();
        }}
      >
        <img
          className="img-paginacion"
          src="/img/back.png"
          alt="Botón back"
        ></img>
      </button>
      <input
        onChange={(e) => Change(e)}
        onKeyDown={(e) => {
          KeyDown(e);
        }}
        value={input}
        className="input-paginacion"
        autoComplete="off"
      />
      <p className="p-paginacion">de {maximo}</p>
      <button
        disabled={pagina == Math.ceil(maximo) || pagina > Math.ceil(maximo)}
        className="button-paginacion"
        onClick={() => {
          nextPage();
          scrollUp();
        }}
      >
        <img
          className="img-paginacion"
          src="/img/right-arrow.png"
          alt="Botón forward"
        ></img>
      </button>
    </div>
  );
}
