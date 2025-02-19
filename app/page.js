"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=50"
        );
        const results = response.data.results;
        const pokemonData = await Promise.all(
          results.map(async (p) => {
            const details = await axios.get(p.url);
            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default,
            };
          })
        );
        setPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Pokémon List</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        className="p-2 border rounded mb-4 text-black"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemon
          .filter((p) => p.name.includes(search))
          .map((p) => (
            <div key={p.id} className="p-4 border rounded shadow-md">
              <img src={p.image} alt={p.name} className="mx-auto" />
              <p className="mt-2 font-semibold">{p.name.toUpperCase()}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
