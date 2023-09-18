import React from "react";

const Pokeinfo = ({ data }) => {
  return (
    <>
      {!data ? (
        <>
        <div className="fakeCards">
          <div className="fCard">
          <div className="object"><span>?</span></div>
          <h1>Pokemon Undefined</h1>
          </div>
          <div className="fCard"></div>
          <div className="fCard"></div>
          <div className="fCard"></div>
        </div>
        <div className="pokeInfoUndefined">
          <div className="spinObject"><span>?</span></div>
          <h1>Pokemon Undefined</h1>
        </div>
        </>
      ) : (
        <>
        <div className="fakeCards">
          <div className="fCard">
          <div className="object"><span>?</span></div>
          <h1>Pokemon Undefined</h1>
          </div>
          <div className="fCard"></div>
          <div className="fCard"></div>
          <div className="fCard"></div>
        </div>
        <div className="pokeInfoBorder">
        <div className="pokeInfoCard">
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=""
          />
          <div className="types">
            {data.types.map((poke) => {
              return (
                <>
                  <div className="type">
                    <h2>{poke.type.name}</h2>
                  </div>
                </>
              );
            })}
          </div>
          <div className="abilities">
            {data.abilities.map((poke) => {
              return (
                <>
                  <div className="group">
                    <h2>{poke.ability.name}</h2>
                  </div>
                </>
              );
            })}
          </div>
          <div className="baseStats">
            {data.stats.map((poke) => {
              return (
                <>
                  <h3>
                    {poke.stat.name} : {poke.base_stat}
                  </h3>
                </>
              );
            })}
          </div>
          </div>
          </div>
        </>
      )}
    </>
  );
};
export default Pokeinfo;
