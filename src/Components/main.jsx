import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import Pokeinfo from "./pokeinfo";

const Main = () => {
  const [pokeData, setPokeData] = useState([]); // Стан для зберігання списку покемонів
  const [loading, setLoading] = useState(true); // Стан для відображення стану завантаження
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10"); // URL для отримання списку покемонів
  const [nextUrl, setNextUrl] = useState(); // URL наступної сторінки
  const [prevUrl, setPrevUrl] = useState(); // URL попередньої сторінки
  const [pokeDex, setPokeDex] = useState(); // Інформація про обраного покемона
  const [perPage, setPerPage] = useState(10); // Кількість покемонів, які відображаються на сторінці
  const [searchQuery, setSearchQuery] = useState(""); // Запит для пошуку покемонів

  // Функція для отримання списку покемонів
  const fetchPokemonData = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    const pokemonPromises = res.data.results.map(async (item) => {
      const result = await axios.get(item.url);
      return result.data;
    });
    try {
      const pokemonData = await Promise.all(pokemonPromises);
      setPokeData(pokemonData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Обробник події для пошуку покемонів
  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);

    setLoading(true);
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=1000`
      );
      const filteredPokemon = res.data.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      const pokemonPromises = filteredPokemon.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      });
      const filteredPokemonData = await Promise.all(pokemonPromises);
      setPokeData(filteredPokemonData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // Обробник події для зміни кількості покемонів на сторінці
  const handlePerPageChange = (props) => {
    setPerPage(props.target.value);
    setUrl(`https://pokeapi.co/api/v2/pokemon?limit=${props.target.value}`);
  };

  // Завантаження списку покемонів при зміні URL
  useEffect(() => {
    fetchPokemonData();
  }, [url]);



  return (
    <>
    <h1 className="pageTitle">PokeDex</h1>
      <div className="container">
        <div className="leftContent">
          <input
            className="inpSearch"
            type="text"
            placeholder="Search Pokemon"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="show">
            Show:
            <select className="showSelect" value={perPage} onChange={handlePerPageChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <Card
            pokemon={pokeData.slice(0, perPage)}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />
          <div className="btnGroup">
            <button onClick={() => setUrl(prevUrl)} disabled={!prevUrl}>
              Previous
            </button>
            <button onClick={() => setUrl(nextUrl)} disabled={!nextUrl}>
              Next
            </button>
          </div>
        </div>
        <div className="rightContent">
          <Pokeinfo data={pokeDex} />
          
        </div>
      </div>
    </>
  );
};

export default Main;
