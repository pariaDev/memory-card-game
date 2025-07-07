import { useState, useEffect, useMemo } from "react";
import Cards from "./components/card.js";

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    //i=1     [0,1) *2= [0,2)    0.9  j=1
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function App() {
  const numOfCards = 12;
  const [seed, setSeed] = useState(0);

  //1 bar ejra mishe va array ro shuffle mikne
  const values = useMemo(() => {
    const raw = [
      "🍉",
      "🌭",
      "🌽",
      "🍦",
      "🍟",
      "🍣",
      "🍉",
      "🌭",
      "🌽",
      "🍦",
      "🍟",
      "🍣",
    ];
    return shuffle(raw);
  }, [seed]);

  const [flipped, setFlipped] = useState(Array(numOfCards).fill(false));
  const [lockBoard, setLockBoard] = useState(false);
  const [showCards, setShowCards] = useState(Array(numOfCards).fill(true));
  const [gameWon, setGameWon] = useState("NOT THERE YET...");

  function flipCard(i) {
    // age flip shode bashe ya aslan visible nabashe ya lock shode bashe card ro flip nakon
    if (lockBoard || !showCards[i] || flipped[i]) return;
    setFlipped((prev) => {
      const copy = [...prev];
      copy[i] = true;
      return copy;
    });
  }

  useEffect(() => {
    const open = flipped
      .map((val, i) => (val ? i : null))
      .filter((i) => i !== null);
    if (open.length !== 2) return;

    const [a, b] = open;
    setLockBoard(true);

    // matched -> hide the cards
    if (values[a] === values[b]) {
      setTimeout(() => {
        cardMatched(a, b);
      }, 800);
      // match nashod -> hame cardha flip mishan
    } else {
      setTimeout(() => {
        setFlipped(Array(numOfCards).fill(false));
        setLockBoard(false);
      }, 800);
    }

    const end = showCards
      .map((val, i) => (val ? i : null))
      .filter((i) => i !== null);
    if (end.length === 2) {
      setGameWon("YOU WON!");
    }
  }, [flipped]);

  function cardMatched(firstFlipped, secondflipped) {
    setShowCards((prev) => {
      const copy = [...prev];
      copy[firstFlipped] = copy[secondflipped] = false;
      return copy;
    });
    setFlipped(Array(numOfCards).fill(false));
    setLockBoard(false);
  }

  return (
    <div className="App">
      <h3 className="winner">{gameWon}</h3>
      <div className="main-page">
        {values.slice(0, 4).map((v, i) => (
          <Cards
            key={i}
            value={v}
            isFlipped={flipped[i]}
            onCardClick={() => flipCard(i)}
            isVisible={showCards[i]}
          />
        ))}
      </div>
      <div className="main-page">
        {values.slice(4, 8).map((v, i) => (
          <Cards
            key={i + 4}
            value={v}
            isFlipped={flipped[i + 4]}
            onCardClick={() => flipCard(i + 4)}
            isVisible={showCards[i + 4]}
          />
        ))}
      </div>
      <div className="main-page">
        {values.slice(8, 12).map((v, i) => (
          <Cards
            key={i + 8}
            value={v}
            isFlipped={flipped[i + 8]}
            onCardClick={() => flipCard(i + 8)}
            isVisible={showCards[i + 8]}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
