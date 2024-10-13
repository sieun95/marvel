import Characters from "../components/Characters";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const getCharacters = async () => {
    const json = await (
      await fetch("https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023")
    ).json();
    console.log(json);
    setCharacters(json.data.results);
    setLoading(false);
  };
  useEffect(() => {
    getCharacters();
  }, []);
  return (
    <div>
      <h1>{loading ? "Loading..." : "Characters"}</h1>
      <div>
        {characters.map((character) => (
          <Link to={`/character/${character.id}`}>
            <Characters key={character.id} id={character.id} name={character.name} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
