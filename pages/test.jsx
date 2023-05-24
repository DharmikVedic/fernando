import React, { useState } from "react";
import { useTransition, animated, config } from "@react-spring/web";

export default function App() {
  const [prediction, setPrediction] = useState([
    { category: "career", active: false },
    { category: "finance", active: false },
    { category: "love", active: false },
  ]);

  const [layouts, setLayout] = useState([
    { left: "5%" },
    { left: "35%" },
    { left: "65%" },
  ]);

  const handleTarot = () => {
    const keys = [
      "career",
      "finance",
      "love",
      "career",
      "finance",
      "love",
      "career",
      "finance",
      "love",
    ];
    const randomIndex = Math.floor(Math.random() * keys.length);
    const category = keys[randomIndex];
    const layout = shuffleCards(layouts);
    setLayout(layout);
    setPrediction((prev) =>
      prev.map((card) =>
        card.category === category ? { ...card, active: !card.active } : card
      )
    );
  };

  function Loop() {
    for (let i = 0; i < 10; i++) {
      handleTarot();
    }
  }

  const shufflePrediction = () => {
    const val = shuffleCards(prediction);
    setPrediction(val);
    Loop();
  };

  const shuffleCards = (array) => {
    const shuffledPrediction = [...array];
    for (let i = shuffledPrediction.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPrediction[i], shuffledPrediction[j]] = [
        shuffledPrediction[j],
        shuffledPrediction[i],
      ];
    }
    return shuffledPrediction;
  };

  //   const layouts = [{ left: "5%" }, { left: "35%" }, { left: "65%" }];

  const transitions = useTransition(prediction, {
    from: { opacity: 0, transform: "translate3d(-50%, 0%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-50%, 0%, 0)" },
    config: { duration: 200 },
  });

  return (
    <div>
      <div className="relative max-w-3xl bg-red-100 mx-auto w-full h-[500px]">
        {transitions((styles, card, index, i) => {
          return (
            <animated.div
              key={card.category}
              className="absolute w-[100px] h-[150px] md:w-[200px] md:h-[300px]"
              style={{
                ...styles,
                transitionDuration: "200ms",
                left: layouts[i % layouts.length].left,
              }}
            >
              <img
                loading="lazy"
                src="/imgs/tarotcard.png"
                className="w-full h-full"
              />
            </animated.div>
          );
        })}
      </div>
      <button onClick={() => shufflePrediction()}>Shuffle Cards</button>
    </div>
  );
}
