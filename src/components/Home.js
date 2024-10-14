import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const getCharacters = async () => {
    const json = await (await fetch("https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023")).json();
    setCharacters(json.data.results);
    setLoading(false);
  };
  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1>{loading ? "로딩 중..." : "마블 캐릭터들"}</h1>
      <div className={styles.charactersGrid}>
        {characters.map((character) => (
          <Link to={`/character/${character.id}`} key={character.id} className={styles.characterCard}>
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} className={styles.characterImage} />
            <div className={styles.characterInfo}>
              <h2 className={styles.characterName}>{character.name}</h2>
              <p>{character.description ? (character.description.length > 100 ? `${character.description.substring(0, 100)}...` : character.description) : "No description available."}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
