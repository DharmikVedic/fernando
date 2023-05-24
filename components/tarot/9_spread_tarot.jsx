import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import { LoginLoader } from "../utils/loader";
import Response, { getFilterObject } from "@/components/tarot/response";
import { randomIntArrayInRange } from "@/pages/tarot-prediction";
import { Button } from "../utils/buttons";
const TarotResponse = require("../../components/jsonData/9-spread-tarot-response");

const initialState = {
  past: {
    tarot1: false,
    tarot2: false,
    tarot3: false,
  },
  present: {
    tarot1: false,
    tarot2: false,
    tarot3: false,
  },
  future: {
    tarot1: false,
    tarot2: false,
    tarot3: false,
  },
};

export default function SpreadTarot9() {
  const [buttonState, setButtonState] = useState(false);
  const [response, setResponse] = useState({});
  const [shuffle, setShuffle] = useState(false);
  const [randomId, setRandomId] = useState(randomIntArrayInRange(1, 78, 9));

  const [state, setState] = useState(initialState);

  if (shuffle) {
    setTimeout(() => setShuffle(false), 2000);
  }

  const handleUpdate = (key, val) => {
    setState((prev) => ({ ...prev, [key]: { ...prev[key], [val]: true } }));
    const check = ButtonStatus({
      ...state,
      [key]: { ...state[key], [val]: true },
    });
    if (check) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  };

  function ButtonStatus(obj) {
    return Object.values(obj).every((nestedObj) => {
      return Object.values(nestedObj).every((value) => value === true);
    });
  }

  const handleRoute = () => {
    const obj = {
      past: [
        getFilterObject(TarotResponse, randomId[0], "past"),
        getFilterObject(TarotResponse, randomId[3], "past"),
        getFilterObject(TarotResponse, randomId[6], "past"),
      ],
      present: [
        getFilterObject(TarotResponse, randomId[1], "present"),
        getFilterObject(TarotResponse, randomId[4], "present"),
        getFilterObject(TarotResponse, randomId[7], "present"),
      ],
      future: [
        getFilterObject(TarotResponse, randomId[2], "future"),
        getFilterObject(TarotResponse, randomId[5], "future"),
        getFilterObject(TarotResponse, randomId[8], "future"),
      ],
    };
    setResponse(obj);
  };

  const handleShuffle = () => {
    setShuffle(true);
    const randomArray = randomIntArrayInRange(1, 78, 9);
    setRandomId(randomArray);
    setState(initialState);
  };

  // const shuffleCards = () => {
  //   setState((prev) => {
  //     const shuffledState = {
  //       past: shuffleArray(prev.past),
  //       present: shuffleArray(prev.present),
  //       future: shuffleArray(prev.future),
  //     };
  //     return shuffledState;
  //   });
  // };

  // const shuffleArray = (arr) => {
  //   const shuffledArr = [...arr];
  //   for (let i = shuffledArr.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  //   }
  //   return shuffledArr;
  // };

  return (
    <>
      <style jsx>
        {`
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
      {Object.keys(response).length == 0 ? (
        <div className='bg-[url("/imgs/bg1.png")] md:py-24 py-24 md:px-5 bg-cover bg-center min-h-screen w-full'>
          <Button url="/" />
          <div className="bg-zinc-900/80 px-5 py-10 md:p-20 flex flex-col gap-10 md:rounded-[20px] max-w-4xl mx-auto w-full">
            <div className="flex flex-col gap-5 text-center">
              <h1 className="md:text-6xl text-center text-4xl sm:text-5xl title font-bold">
                9 CARD TAROT SPREADS
              </h1>
              <p className="md:text-lg text-zinc-300 max-w-xl mx-auto">
                Tarot 9 cards method gives more detailed information about your
                past, present and future than 3 cards method.
              </p>
              <div
                className="p-[2px]  mx-auto btn max-w-max  w-full rounded-full"
                // style={{
                //   backgroundImage:
                //     "linear-gradient(225deg,#32c5ff,#b620e0 51%,#f7b500)",
                // }}
              >
                <h6
                  disable={shuffle}
                  onClick={handleShuffle}
                  className=" md:text-lg w-full max-w-[250px] min-w-[250px] text-center cursor-pointer  mx-auto px-10 py-2.5 rounded-full text-lg text-white"
                >
                  {shuffle ? <LoginLoader /> : "Shuffle Cards"}
                </h6>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 md:gap-10 w-full">
              <TatorPast
                active={[randomId[0], randomId[3], randomId[6]]}
                shuffle={shuffle}
                title="Past"
                identity="past"
                arr={state.past}
                handleUpdate={handleUpdate}
              />
              <TatorPast
                active={[randomId[1], randomId[4], randomId[7]]}
                shuffle={shuffle}
                title="Present"
                identity="present"
                arr={state.present}
                handleUpdate={handleUpdate}
              />
              <TatorPast
                active={[randomId[2], randomId[5], randomId[8]]}
                shuffle={shuffle}
                title="Future"
                identity="future"
                arr={state.future}
                handleUpdate={handleUpdate}
              />
            </div>
            <button
              onClick={handleRoute}
              disable={buttonState}
              className={`max-w-sm ${
                buttonState
                  ? "hover:scale-[1.04] duration-150 ease-in"
                  : "cursor-not-allowed opacity-60"
              }  mx-auto w-full font-semibold rounded-full md:text-xl text-lg px-20 py-3`}
              style={{
                backgroundImage:
                  "linear-gradient(to right,#462523 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%",
              }}
            >
              Get My Reading
            </button>
          </div>
        </div>
      ) : (
        <>
          {Object.keys(response).length > 0 && (
            <Button
              onClick={() => {
                setResponse({});
                handleShuffle();
                setState(initialState);
              }}
            />
          )}
          <Response data={response} />
        </>
      )}
    </>
  );
}

function TatorPast({ title, arr, handleUpdate, identity, shuffle, active }) {
  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <h2 className="md:text-3xl text-xl sm:text-2xl text-white font-sans">
        {title}
      </h2>

      <div className="flex flex-col gap-2 md:gap-5">
        {Object.keys(arr).map((item, i) => (
          <TarotCard
            key={i}
            shuffle={shuffle}
            handle={() => handleUpdate(identity, `tarot${i + 1}`)}
            frontImage="/imgs/tarotcard.png"
            active={arr[`tarot${i + 1}`]}
            backImage={`/tarot/${active[i]}.png`}
          />
        ))}
      </div>
    </div>
  );
}

export function TarotCard({ frontImage, backImage, handle, active, shuffle }) {
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
            position: relative;
            justify-content: center;
          }
          .c {
            will-change: transform, opacity;
          }
        `}
      </style>

      <div
        className={`relative ${
          shuffle ? "shuffle" : ""
        }  w-[100px] h-[140px] md:w-[200px] md:h-[300px]`}
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
            // rotateX: "180deg",
          }}
        >
          <img src={backImage} loading="lazy" className="w-full h-full" />
        </a.div>
      </div>
    </>
  );
}
