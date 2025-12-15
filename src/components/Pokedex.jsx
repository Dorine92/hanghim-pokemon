function Pokedex({ pokedex }) {
  if (pokedex.length === 0) {
    return (
      <section className="pokedex">
        <p>Pokedex vide…</p>
      </section>
    );
  }

  return (
    <div className="pokedex">
      <h2>Pokedex</h2>

      <div className="pokedex-grid">
        {pokedex
          .sort((a, b) => a.pokedexId - b.pokedexId)
          .map(pokemon => (
            <div key={pokemon.pokedexId} className="pokedex-card">
              <span className="pokedex-id">
                #{pokemon.pokedexId.toString().padStart(3, "0")}
              </span>

              <img src={pokemon.image} alt={pokemon.name} />

              <p>{pokemon.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Pokedex;
