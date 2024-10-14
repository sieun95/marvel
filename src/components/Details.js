import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Details.module.css";

function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState(null);

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
    <div className={styles.detailsContainer}>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className={styles.characterDetails}>
          <h1 className={styles.characterName}>{character.name}</h1>
          <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} className={styles.characterImage} />
          <p className={styles.characterDescription}>{character.description || "No description available."}</p>
          <h2>Comics:</h2>
          <ul className={styles.comicsList}>
            {character.comics.items.map((comic, index) => (
              <li key={index} className={styles.comicItem}>
                {comic.name}
              </li>
            ))}
          </ul>
          <div className={styles.attribution}>
            <a href="http://marvel.com">Data provided by Marvel. © 2023 MARVEL</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
