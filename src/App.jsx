import { useEffect, useState } from "react";
import "./App.css";

function App() {

//Creamos los estados
const [term, setTerm] = useState(""); //guardamos los datos.
const [pokemon, setPokemon] = useState(null); //Aquí guardamos el resultado de la API
const [error, setError] = useState("");//Cargamos
const [loading, setLoading] = useState(false);//Sirve para mostrar errores 

useEffect(() => {

const name = term.trim().toLowerCase();
//Verificar si el input está vacío
if (!name) {
setPokemon(null);//limpiar resultado
setError("");//limpiar errores
return;//detiene el código 
}

setLoading(true); //cargando
setError("");// q un error anterior no quedé en la pantalla

//Hacemos la petición a la API
fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then((res) => {
  if (res.status === 404) throw new Error("notfound");//Revisar si el Pokémon existe
    return res.json();
    })
  .then((data) => setPokemon(data))//Guardar el Pokémon
  .catch((e) => {
    setPokemon(null);
    setError(e.message === "notfound" ? "Pokémon no encontrado" : "Error");
    })
  .finally(() => setLoading(false));

}, [term]); //useEffect depende de term

return (
  <div style={{ padding: 20 }}>
  <h1>Buscador Pokémon</h1>

  <form onSubmit={(e) => e.preventDefault()}>
    <input
    value={term}
    onChange={(e) => setTerm(e.target.value)}//Esto ocurre cada vez que escribes una letra.
    placeholder="pikachu..."
    />
    </form>

{loading && <p>Cargando...</p>}
{!loading && error && <p>{error}</p>}
{!loading && !error && pokemon && ( //mostrar pokemon
    <div>
    <h2 style={{ textTransform: "capitalize" }}>
    {pokemon.name}
    </h2>

  <img
    width="200"
    src={pokemon.sprites.front_default}
    alt={pokemon.name}
  />
  <p>
  Tipo: {pokemon.types.map(t => t.type.name).join(", ")}
  </p>
  </div>
  )}

  </div>
);
}

export default App;