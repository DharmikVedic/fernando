import useMediaSIze from "@/components/context/useMediaSIze";
import { Button } from "@/components/utils/buttons";
import { FetchApi } from "@/components/utils/fetchapi";
import { Loader2 } from "@/components/utils/loader";
// import { Loader2 } from "../../components/utils/loader";
import { useSprings, animated, to as interpolate } from "@react-spring/web";

import React, { useCallback, useEffect, useState } from "react";
import { randomIntArrayInRange } from "../tarot-prediction";
// import { Button } from "@/components/cards/calculatorCard";

export default function TarotCard2({}) {
  const [response, setResponse] = useState({});
  const [loader, setLoader] = useState(false);
  const [hover, setHover] = useState(null);
  const [randomTarotId, setRandomId] = useState(
    randomIntArrayInRange(1, 22, 10)
  );

  const CARD_LENGTH = 10;
  const [mobileState, setMobileState] = useState(false);

  const handler = () => {
    const list = window.matchMedia("(max-width: 768px)");
    let check = list.matches ? true : false;
    setMobileState(check);
  };

  useEffect(() => {
    handler();
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [mobileState]);

  const Call = useCallback((id) => APICall(id), []);

  const APICall = async (id) => {
    setLoader(true);
    const tarot = await FetchApi({
      apiName: "yes_no_tarot",
      userData: {
        tarot_id: id,
      },
    });

    setResponse({ ...tarot, id: id });
    setLoader(false);
  };

  const to = (i) => ({
    x:
      i > (CARD_LENGTH - 1) / 2
        ? mobileState
          ? i * 10
          : i * 30
        : mobileState
        ? i * 10
        : i * 30,
    y: 0,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  });

  const from = (_i) => ({ x: 0, rot: 0, scale: 1.3 });
  const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
      r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;

  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(
    CARD_LENGTH,
    (i) => ({
      ...to(i),
      from: from(i),
      deps: mobileState,
    }),
    [mobileState]
  );

  useEffect(() => {
    api.start((i) => ({
      ...to(i),
      onRest: () => {
        if (gone.size === CARD_LENGTH) {
          gone.clear();
          api.start((i) => to(i));
        }
      },
    }));
  }, [api, gone, mobileState]);

  const handleShuffle = () => {
    const randomArray = randomIntArrayInRange(1, 22, 10);
    setRandomId(randomArray);
    const EffectArray = randomIntArrayInRange(1, 10, 10);
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          applyTranslateY(EffectArray[i]);
        }, (j * 10 + i) * 100);
      }
    }
    setTimeout(() => {
      applyTranslateY(null);
    }, 200);
  };

  function applyTranslateY(i) {
    setHover(i);
  }

  const handleReset = () => {
    setResponse({});
    api.start((i) => ({
      ...to(i),
      onRest: () => {
        if (gone.size === CARD_LENGTH) {
          gone.clear();
          api.start((i) => to(i));
        }
      },
    }));
  };

  return (
    <>
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
            border-color: #0284c7 transparent transparent;
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
            <Button onClick={handleReset} />
          ) : (
            <Button url="/" />
          )}
          {loader ? (
            <Loader2 />
          ) : (
            <>
              {Object.keys(response).length == 0 ? (
                <>
                  <div className="w-full">
                    <div className="max-w-5xl px-5 mx-auto flex flex-col text-center gap-5">
                      <h1 className="md:text-5xl title text-center text-4xl  font-bold">
                        Yes No Tarot Prediction
                      </h1>
                      <p className="md:text-lg text-zinc-300">
                        Tarot Magic in Seconds: Your Free Yes/No Tarot Reading
                        Awaits
                      </p>
                      <span className="md:text-base text-sm bg-sky-600 text-white arrow  px-5 md:px-10 py-2 max-w-max rounded-full mx-auto  mt-5">
                        SELECT A CARDS FROM THE DECK BELOW
                      </span>
                      <div className="flex  relative h-[200px] md:h-[280px] justify-center gap-2 w-full mt-20">
                        {props.map(({ x, y, rot, scale }, i) => {
                          const spreadAngle = 90; // Adjust this value to control the spread angle
                          const spreadOffset = (CARD_LENGTH - 1) / 2;
                          const theta =
                            ((i - spreadOffset) / (CARD_LENGTH - 1)) *
                            spreadAngle *
                            (Math.PI / 180);
                          const radius = 250;
                          const xPos = 0;
                          const yPos = i == hover ? "-20px" : 0;

                          return (
                            <animated.div
                              onClick={() => Call(randomTarotId[i])}
                              onMouseOver={() => applyTranslateY(i)}
                              onMouseLeave={() => setHover(null)}
                              key={i}
                              className="deck w-[230px] cursor-pointer h-[200px] left-[20%] md:left-[10%]"
                              style={{
                                x,
                                y,
                                transform: interpolate(
                                  [rot, scale],
                                  (r, s) => `rotateY(${r}deg) scale(${s})`,
                                  trans
                                ),
                                transformOrigin: "center",
                                zIndex: CARD_LENGTH - i,
                                position: "absolute",
                                top: "50%",
                                marginLeft: -100,
                                marginTop: -150,
                                translateX: xPos,
                                translateY: yPos,
                              }}
                            >
                              {/* This is the card itself */}
                              <animated.div
                                className="card"
                                style={{
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundImage: `url(/imgs/tarotcard.png)`,
                                  transform: interpolate(
                                    [x],
                                    (x) => `translateX(${x}px)`,
                                    trans
                                  ),
                                }}
                              />
                            </animated.div>
                          );
                        })}
                      </div>
                      <div
                        className="p-[2px]  mx-auto btn max-w-max  w-full rounded-full"
                        // style={{
                        //   backgroundImage:
                        //     "linear-gradient(225deg,#32c5ff,#b620e0 51%,#f7b500)",
                        // }}
                      >
                        <h6
                          onClick={handleShuffle}
                          className=" md:text-lg w-full max-w-[250px] min-w-[250px] text-center cursor-pointer  mx-auto px-10 py-2.5 rounded-full text-lg text-white"
                        >
                          Shuffle Cards
                        </h6>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="max-w-5xl mx-auto flex flex-col md:gap-24 gap-10  px-5">
                  <h1 className="md:text-5xl text-center title text-4xl  font-bold">
                    YES/NO TAROT READING
                  </h1>
                  <div className="flex md:flex-row flex-col md:gap-14 gap-10 items-center ">
                    <div className="w-full max-w-[200px]">
                      <img
                        src={`/MajorCards/${response?.id}.png`}
                        className="w-full"
                        alt="tarot"
                      />
                    </div>
                    <div className="w-full">
                      <h2 className="font-semibold text-white md:text-2xl text-xl mb-5">
                        {response.name}
                      </h2>
                      <div
                        className="max-w-max mb-4 rounded-full p-[1px]"
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg,#cb9b51 22%,#f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%",
                        }}
                      >
                        <p className="text-white  rounded-full px-5 py-1 bg-zinc-900">
                          {response.value}
                        </p>
                      </div>
                      <p className=" text-zinc-300  flex flex-col gap-2">
                        {response.description}
                      </p>
                      <button
                        onClick={handleReset}
                        className="mt-5 p-[2px]  rounded-md bg-gradient-to-tl from-sky-400  dark:from-blue-200 to-[#333147]"
                      >
                        <h6 className="bg-zinc-800 font-semibold text-white px-10 py-3 rounded-md">
                          Pick up another card
                        </h6>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function getTarotName(id) {
  const a = tarotCards.filter((item) => item.id == id);
  return a[0]?.tarot_name;
}

export const tarots = [
  { tarot_id: 1, card_name: "The Magician" },
  { tarot_id: 2, card_name: "The Hierophant" },
  { tarot_id: 3, card_name: "The Emperor" },
  { tarot_id: 4, card_name: "Death" },
  { tarot_id: 5, card_name: "The Hermit" },
  { tarot_id: 6, card_name: "The Devil" },
  { tarot_id: 7, card_name: "Temperance" },
  { tarot_id: 8, card_name: "The Fool" },
  { tarot_id: 9, card_name: "The Chariot" },
  { tarot_id: 10, card_name: "Justice" },
  { tarot_id: 11, card_name: "The Judgment" },
  { tarot_id: 12, card_name: "Strength" },
  { tarot_id: 13, card_name: "The Empress" },
  { tarot_id: 14, card_name: "The Wheel of Fortune" },
  { tarot_id: 15, card_name: "The Star" },
  { tarot_id: 16, card_name: "The Moon" },
  { tarot_id: 17, card_name: "The Lovers" },
  { tarot_id: 18, card_name: "The Sun" },
  { tarot_id: 19, card_name: "The Hanged Man" },
  { tarot_id: 20, card_name: "The Tower" },
  { tarot_id: 21, card_name: "The World" },
  { tarot_id: 22, card_name: "The High Priestess" },
];
