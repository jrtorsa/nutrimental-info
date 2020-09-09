import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState({
    busqueda: "",
    imagen: "",
    KCAL: "",
    Protein: "",
    Fat: "",
    Carbs: "",
    Fiber: ""
  });

  const { busqueda, imagen, KCAL, Protein, Fat, Carbs, Fiber } = query;

  const onSearch = (e) => {
    setQuery({
      [e.target.name]: e.target.value
    });
  };

  const conexionApi = async () => {
    const appId = "a31b4c63";
    const appKey = "cbc52fae7ab6c78ee1d8767637f73051";
    const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${busqueda}&app_id=${appId}&app_key=${appKey}`;
    const resultado = await fetch(url);
    const respuesta = await resultado.json();
    const photoUrl = respuesta.hints[0].food.image;

    const calorias = respuesta.hints[0].food.nutrients.ENERC_KCAL;
    const proteina = respuesta.hints[0].food.nutrients.PROCNT;
    const grasa = respuesta.hints[0].food.nutrients.FAT;
    const carbos = respuesta.hints[0].food.nutrients.CHOCDF;
    const fibra = respuesta.hints[0].food.nutrients.FIBTG;

    setQuery({
      imagen: photoUrl,
      KCAL: calorias,
      Protein: proteina,
      Fat: grasa,
      Carbs: carbos,
      Fiber: fibra
    });
  };

  return (
    <div className="App">
      <h1>Busqueda de Alimentos</h1>
      <input
        type="text"
        value={busqueda || ""}
        name="busqueda"
        onChange={onSearch}
      />
      <button onClick={conexionApi}>Buscar</button>
      <hr />
      <div>
        <img alt="" src={imagen} />
        <p>Informacion Nutrimental por cada 100gr.</p>
        <p>Calorias: {KCAL}</p>
        <p>Proteina: {Protein}</p>
        <p>Grasa: {Fat}</p>
        <p>Carbohidratos: {Carbs}</p>
        <p>Fibra: {Fiber}</p>
      </div>
    </div>
  );
}
