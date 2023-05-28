import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import Pokeinfo from "./pokeinfo";

const Main = () => {
    const [pokeData, setPokeData] = useState([]); // Стан для зберігання списку покемонів
    const [loading, setLoading] = useState(true); // Стан для відображення стану завантаження
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/"); // URL для отримання списку покемонів
    const [nextUrl, setNextUrl] = useState(); // URL наступної сторінки
    const [prevUrl, setPrevUrl] = useState(); // URL попередньої сторінки
    const [pokeDex, setPokeDex] = useState(); // Інформація про обраного покемона
    const [perPage, setPerPage] = useState(10); // Кількість покемонів, які відображаються на сторінці
    const [searchQuery, setSearchQuery] = useState(""); // Запит для пошуку покемонів

    // Функція для отримання списку покемонів
    const pokeFun = async () => {
        setLoading(true);
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
    };

    // Функція для отримання даних конкретного покемона
    const getPokemon = async (res) => {
        const pokemonPromises = res.map(async (item) => {
            const result = await axios.get(item.url);
            return result.data;
        });

        try {
            const pokemonData = await Promise.all(pokemonPromises);
            setPokeData(pokemonData);
        } catch (error) {
            console.log(error);
        }
    };

    // Обробник події для пошуку покемонів
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Обробник події для зміни кількості покемонів на сторінці
    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value));
    };

    // Фільтрування списку покемонів на основі пошуку
    const filteredPokemon = pokeData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Список покемонів при завантаженні компонента або при зміні URL
    useEffect(() => {
        pokeFun();
    }, [url]);

    return (
        <>
            <div className="container">
                <div className="leftContent">
                    <input
                        className="inpSearch"
                        type="text"
                        placeholder="Search Pokemon"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <div>
                        Show:
                        <select value={perPage} onChange={handlePerPageChange}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    <Card
                        pokemon={filteredPokemon.slice(0, perPage)}
                        loading={loading}
                        infoPokemon={(poke) => setPokeDex(poke)}
                    />
                    <div className="btnGroup">
                        <button
                            onClick={() => {
                                setPokeData([]);
                                setUrl(prevUrl);
                            }}
                            disabled={!prevUrl}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                setPokeData([]);
                                setUrl(nextUrl);
                            }}
                            disabled={!nextUrl}
                        >
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
