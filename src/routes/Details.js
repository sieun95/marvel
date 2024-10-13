import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState([]);
  const getCharacter = async () => {
    const json = await (await fetch(`https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`)).json();
    console.log(json);
    setCharacter(json.data.results[0]);
    setLoading(false);
  };
  useEffect(() => {
    getCharacter();
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h1>{character.name}</h1>
          <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
          <p>{character.description || "No description available."}</p>
          <h2>Comics:</h2>
          <ul>
            {character.comics.items.map((comic, index) => (
              <li key={index}>{comic.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Details;
