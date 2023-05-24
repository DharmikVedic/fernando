import { Button } from "@/components/utils/buttons";
import { FetchApi } from "@/components/utils/fetchapi";
import { Loader2 } from "@/components/utils/loader";
import React, { useCallback, useState } from "react";
import { useSpring, animated, a, useTransition } from "@react-spring/web";

const initialState = {
  love: false,
  career: false,
  finance: false,
};

export default function TarotPrediction() {
  const [response, setResponse] = useState({});
  const [loader, setLoader] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [randomId, setRandomId] = useState({
    love: randomIntArrayInRange(1, 78, 1)[0],
    career: randomIntArrayInRange(1, 78, 1)[0],
    finance: randomIntArrayInRange(1, 78, 1)[0],
  });
  const [update, setUpdate] = useState(initialState);

  const [prediction, setPrediction] = useState([
    {
      category: "career",
      active: false,
      id: randomIntArrayInRange(1, 26, 1),
    },
    {
      category: "finance",
      active: false,
      id: randomIntArrayInRange(27, 52, 1),
    },
    {
      category: "love",
      active: false,
      id: randomIntArrayInRange(53, 78, 1),
    },
  ]);

  const [layouts, setLayout] = useState([
    { left: "2%" },
    { left: "35%" },
    { left: "68%" },
  ]);

  const handleTarotShuffle = () => {
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
      handleTarotShuffle();
    }
  }

  const shufflePrediction = () => {
    const val = shuffleCards(prediction);
    setPrediction(val);
    Loop();
  };

  const shuffleCards = (array) => {
    const shuffledPrediction = [...array];
    const obj = {
      love: randomIntArrayInRange(1, 78, 1)[0],
      career: randomIntArrayInRange(1, 78, 1)[0],
      finance: randomIntArrayInRange(1, 78, 1)[0],
    };
    setRandomId(obj);
    for (let i = shuffledPrediction.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPrediction[i], shuffledPrediction[j]] = [
        shuffledPrediction[j],
        shuffledPrediction[i],
      ];
    }
    return shuffledPrediction;
  };

  const handleTarot = (key) => {
    setUpdate((prev) => ({ ...prev, [key]: true }));
    const check = ButtonStatus({
      ...update,
      [key]: true,
    });

    if (check) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  };

  const Call = useCallback(() => {
    if (buttonState) {
      APICall(randomId);
    }
  }, [randomId, buttonState]);

  const APICall = async (randomId) => {
    setLoader(true);

    const tarot = await FetchApi({
      apiName: "tarot_predictions",
      userData: randomId,
    });
    setResponse(tarot);
    setLoader(false);
  };

  function ButtonStatus(obj) {
    return Object.values(obj).every((nestedObj) => {
      return nestedObj != false;
    });
  }

  const transitions = useTransition(prediction, {
    from: { opacity: 0, transform: "translate3d(-50%, 0%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-50%, 0%, 0)" },
    config: { duration: 200 },
  });

  return (
    <div>
      <style jsx>
        {`
          .arrow {
            position: relative;
          }
          .arrow:before {
            position: absolute;
            content: "";
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 10px solid;
            border-color: #4d8fcc transparent transparent;
          }
          .title {
            background-image: linear-gradient(
              to right,

              #cb9b51 22%,
              #f6e27a 45%,
              #f6f2c0 50%,
              #f6e27a 55%,
              #cb9b51 78%,
              #462523 100%
            );
            color: transparent;
            -webkit-background-clip: text;
          }
        `}
      </style>

      <div className='bg-[url("/imgs/bg1.png")] md:py-24 py-24 md:px-5 bg-cover bg-center min-h-screen w-full'>
        <div className="bg-zinc-900/80 overflow-hidden px-5 py-10 md:p-20 flex flex-col gap-10 md:rounded-[20px] max-w-4xl mx-auto w-full">
          {Object.keys(response).length > 0 ? (
            <Button
              onClick={() => {
                setResponse({});
                setUpdate(initialState);
                setRandomId({
                  love: randomIntArrayInRange(1, 78, 1)[0],
                  career: randomIntArrayInRange(1, 78, 1)[0],
                  finance: randomIntArrayInRange(1, 78, 1)[0],
                });
              }}
            />
          ) : (
            <Button url="/" />
          )}
          {loader ? (
            <Loader2 />
          ) : (
            <>
              {Object.keys(response).length === 0 ? (
                <div className="md:mt-0 px-5 mt-14 flex flex-col">
                  <div className="flex flex-col mx-auto gap-5 text-center max-w-4xl">
                    <h1 className="md:text-5xl text-center title text-4xl  font-bold">
                      Tarot Prediction
                    </h1>
                    <p className="md:text-lg  text-zinc-300">
                      Insight into Your Future: Get a Free Tarot Reading for
                      Your Love, Career, and Financial Path
                    </p>
                  </div>

                  <div className=" flex  mt-10 h-[350px] relative w-full max-w-4xl mx-auto gap-3 sm:gap-5 md:gap-10">
                    {["love", "career", "finance"].map((item, i) => (
                      <div
                        style={{
                          left: `${i == 1 ? "43" : i == 2 ? "77" : "10"}%`,
                        }}
                        className="absolute"
                      >
                        <p className="md:text-2xl text-white capitalize text-center text-xl">
                          {item}
                        </p>
                      </div>
                    ))}

                    {transitions((styles, card, index, i) => {
                      return (
                        <>
                          <animated.div
                            key={card.category}
                            className="absolute w-[100px] h-[150px] md:w-[200px] md:h-[300px]"
                            style={{
                              ...styles,
                              transitionDuration: "200ms",
                              rotateY: "180deg",
                              top: "50px",
                              left: layouts[i % layouts.length].left,
                            }}
                          >
                            <TarotCard
                              handle={() => handleTarot(card.category)}
                              frontImage="/imgs/tarotcard.png"
                              active={update[card.category]}
                              backImage={`/tarot/${
                                randomId[card.category]
                              }.png`}
                            />
                          </animated.div>
                        </>
                      );
                    })}
                    {/* <TarotCard
                      handle={() => handleTarot("career")}
                      frontImage="/imgs/tarotcard.png"
                      active={prediction.career}
                      backImage="/imgs/34.png"
                    />
                    <TarotCard
                      handle={() => handleTarot("finance")}
                      frontImage="/imgs/tarotcard.png"
                      active={prediction.finance}
                      backImage="/imgs/34.png"
                    />
                    <TarotCard
                      handle={() => handleTarot("love")}
                      frontImage="/imgs/tarotcard.png"
                      active={prediction.love}
                      backImage="/imgs/34.png"
                    /> */}
                  </div>
                  <div
                    className="p-[2px] mt-10 mx-auto btn max-w-max  w-full rounded-full"
                    // style={{
                    //   backgroundImage:
                    //     "linear-gradient(225deg,#32c5ff,#b620e0 51%,#f7b500)",
                    // }}
                  >
                    <h6
                      onClick={shufflePrediction}
                      className=" md:text-lg w-full max-w-[250px] min-w-[250px] text-center cursor-pointer  mx-auto px-10 py-2.5 rounded-full text-lg text-white"
                    >
                      Shuffle Cards
                    </h6>
                  </div>
                  <button
                    onClick={Call}
                    disable={buttonState}
                    className={`max-w-sm mt-10 ${
                      buttonState
                        ? "hover:scale-[1.04] duration-150 ease-in"
                        : "cursor-not-allowed opacity-60"
                    }  mx-auto w-full font-semibold rounded-full md:text-xl text-lg px-20 py-3`}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right,#462523 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%",
                    }}
                  >
                    Show Tarot Reading
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="md:text-5xl text-center  title text-4xl  font-bold">
                    Tarot Prediction
                  </h2>

                  <div className=" max-w-5xl divide-y divide-zinc-500 mx-auto flex flex-col">
                    <TarotResponseCard
                      identity="love"
                      data={response.love}
                      number={randomId.love}
                    />

                    <TarotResponseCard
                      identity="career"
                      data={response.career}
                      number={randomId.career}
                    />
                    <TarotResponseCard
                      identity="finance"
                      data={response.finance}
                      number={randomId.finance}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function TarotCard({ frontImage, backImage, handle, active }) {
  const { transform, opacity } = useSpring({
    opacity: active ? 1 : 0,
    transform: `perspective(600px) rotateY(${active ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <>
      <style jsx>
        {`
          .container {
            display: flex;
            align-items: center;
            height: 100%;
            position: relative;
            justify-content: center;
          }
          .c {
            will-change: transform, opacity;
          }
        `}
      </style>

      <div
        className="relative  w-[100px] h-[150px]  md:w-[200px]  md:h-[300px]"
        onClick={handle}
      >
        <a.div
          className={`c top-0 left-0 absolute w-full h-full cursor-pointer`}
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        >
          <img loading="lazy" src={frontImage} className="w-full h-full" />
        </a.div>
        <a.div
          className={`c top-0 left-0 absolute  w-full h-full  cursor-pointer`}
          style={{
            opacity,
            transform,
          }}
        >
          <img src={backImage} loading="lazy" className="w-full h-full" />
        </a.div>
      </div>
    </>
  );
}

function TarotResponseCard({ data, number, identity }) {
  return (
    <div className="flex md:py-20 py-14 md:flex-row flex-col md:gap-14 gap-10 items-center ">
      <div className="w-full max-w-[200px]">
        <img src={`/tarot/${number}.png`} className="w-full" alt="tarot" />
      </div>
      <div className="w-full">
        <div
          className="max-w-max mb-4 rounded-full p-[1px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg,#cb9b51 22%,#f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%",
          }}
        >
          <p className="text-white  rounded-full px-5 py-1 bg-zinc-900">
            {identity}
          </p>
        </div>
        <h2 className="font-semibold md:text-2xl text-xl mb-5 text-white ">
          {getTarotName(number)}
        </h2>
        <p className="text-zinc-300">{data}</p>
      </div>
    </div>
  );
}

export const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

function getTarotName(id) {
  const a = tarotCards.filter((item) => item.id == id);
  return a[0]?.tarot_name;
}

const tarotCards = [
  { id: "1", tarot_name: "KING OF WANDS" },

  { id: "2", tarot_name: "QUEEN OF WANDS" },

  { id: "3", tarot_name: "KNIGHT OF WANDS" },

  { id: "4", tarot_name: "PAGE OF WANDS" },

  { id: "5", tarot_name: "TEN OF WANDS" },

  { id: "6", tarot_name: "NINE OF WANDS" },

  { id: "7", tarot_name: "EIGHT OF WANDS" },

  { id: "8", tarot_name: "SEVEN OF WANDS" },

  { id: "9", tarot_name: "SIX OF WANDS" },

  { id: "10", tarot_name: "FIVE OF WANDS" },

  { id: "11", tarot_name: "FOUR OF WANDS" },

  { id: "12", tarot_name: "THREE OF WANDS" },

  { id: "13", tarot_name: "TWO OF WANDS" },

  { id: "14", tarot_name: "ACE OF WANDS" },

  { id: "15", tarot_name: "KING OF SWORDS" },

  { id: "16", tarot_name: "QUEEN OF SWORDS" },

  { id: "17", tarot_name: "KNIGHT OF SWORDS" },

  { id: "18", tarot_name: "PAGE OF SWORDS" },

  { id: "19", tarot_name: "TEN OF SWORDS " },

  { id: "20", tarot_name: "NINE OF SWORDS" },

  { id: "21", tarot_name: "EIGHT OF SWORDS" },

  { id: "22", tarot_name: "SEVEN OF SWORDS" },

  { id: "23", tarot_name: "SIX OF SWORDS" },

  { id: "24", tarot_name: "FIVE OF SWORDS" },

  { id: "25", tarot_name: "FOUR OF SWORDS" },

  { id: "26", tarot_name: "THREE OF SWORDS" },

  { id: "27", tarot_name: "TWO OF SWORDS" },

  { id: "28", tarot_name: "ACE OF SWORDS" },

  { id: "29", tarot_name: "KING OF CUPS" },

  { id: "30", tarot_name: "QUEEN OF CUPS" },

  { id: "31", tarot_name: "KNIGHT OF CUPS" },

  { id: "32", tarot_name: "PAGE OF CUPS" },

  { id: "33", tarot_name: "TEN OF CUPS " },

  { id: "34", tarot_name: "NINE OF CUPS" },

  { id: "35", tarot_name: "EIGHT OF CUPS" },

  { id: "36", tarot_name: "SEVEN OF CUPS" },

  { id: "37", tarot_name: "SIX OF CUPS" },

  { id: "38", tarot_name: "FIVE OF CUPS" },

  { id: "39", tarot_name: "FOUR OF CUPS" },

  { id: "40", tarot_name: "THREE OF CUPS" },

  { id: "41", tarot_name: "TWO OF CUPS" },

  { id: "42", tarot_name: "ACE OF CUPS " },

  { id: "43", tarot_name: "KING OF PENTACLES" },

  { id: "44", tarot_name: "QUEEN OF PENTACLES" },

  { id: "45", tarot_name: "KNIGHT OF PENTACLES " },

  { id: "46", tarot_name: "PAGE OF PENTACLES" },

  { id: "47", tarot_name: "TEN OF PENTACLES" },

  { id: "48", tarot_name: "NINE OF PENTACLES" },

  { id: "49", tarot_name: "EIGHT OF PENTACLES" },

  { id: "50", tarot_name: "SEVEN OF PENTACLES" },

  { id: "51", tarot_name: "SIX OF PENTACLES" },

  { id: "52", tarot_name: "FIVE OF PENTACLES" },

  { id: "53", tarot_name: "FOUR OF PENTACLES" },

  { id: "54", tarot_name: "THREE OF PENTACLES" },

  { id: "55", tarot_name: "TWO OF PENTACLES" },

  { id: "56", tarot_name: "ACE OF PENTACLES" },

  { id: "57", tarot_name: "THE FOOL" },

  { id: "58", tarot_name: "THE MAGICIAN" },

  { id: "59", tarot_name: "THE HIGH PRIESTESS" },

  { id: "60", tarot_name: "THE EMPERESS" },

  { id: "61", tarot_name: "THE EMPEROR" },

  { id: "62", tarot_name: "THE HIEROPHPANT" },

  { id: "63", tarot_name: "THE LOVERS" },

  { id: "64", tarot_name: "THE CHARIOT" },

  { id: "65", tarot_name: "STRENGTH" },

  { id: "66", tarot_name: "THE HERMIT" },

  { id: "67", tarot_name: "WHEEL OF FORTUNE" },

  { id: "68", tarot_name: "JUSTICE" },

  { id: "69", tarot_name: "THE HANGED MAN" },

  { id: "70", tarot_name: "DEATH" },

  { id: "71", tarot_name: "TEMPERANCE" },

  { id: "72", tarot_name: "THE DEVIL" },

  { id: "73", tarot_name: "THE TOWER" },

  { id: "74", tarot_name: "THE STAR" },

  { id: "75", tarot_name: "THE MOON" },

  { id: "76", tarot_name: "THE SUN" },

  { id: "77", tarot_name: "JUDGEMENT" },

  { id: "78", tarot_name: "THE WORLD" },
];
