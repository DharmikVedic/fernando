import Link from "next/link";
import React from "react";

export default function TarotIndex() {
  return (
    <div className='bg-[url("/imgs/bg1.png")] md:py-24 py-24 md:px-5 bg-cover bg-center min-h-screen w-full'>
      <div className=" max-w-5xl mx-auto px-5">
        <div className="flex flex-col gap-14">
          <h1 className="md:text-6xl  font-bold text-white sm:text-5xl text-4xl text-center ">
            Tarot Card Reading
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <TarotCard
              link="/yes-no-tarot"
              bg="bg-gradient-to-r from-blue-200 to-purple-200"
              img="/imgs/yes-no-tarot.png"
              title="Yes / No Tarot Prediction"
              desc="This popular reading gives you a simple yes or no answer with actionable advice."
              button="Pick Up Card"
            />
            <TarotCard
              link="//tarot-prediction"
              bg="bg-gradient-to-r from-lime-100 to-blue-200"
              img="/imgs/tarot3.png"
              title="Tarot Prediction"
              desc="Insight into Your Future: Get a Free Tarot Reading for Your Love, Career, and Financial Path"
              button="Pick Up Card"
            />
            <TarotCard
              link="/9-spread-tarot"
              bg="bg-gradient-to-r from-rose-100 to-blue-200"
              img="/imgs/yes-no-tarot.png"
              title="Discovering Insights: The 9-Card Spread Tarot"
              desc="Revealing invaluable insights on various aspects of life using the 9-card tarot spread."
              button="Pick Up Card"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TarotCard({ title, desc, button, img, bg, link }) {
  return (
    <Link href={link}>
      <div
        className={`${bg} rounded-[10px] flex sm:flex-row md:items-start items-center flex-col-reverse gap-5 md:gap-14 md:p-8 p-5`}
      >
        <div className="flex flex-col gap-5">
          <h2 className="md:text-2xl font-semibold text-xl">{title}</h2>
          <p className="md:text-base">{desc}</p>
          <button className="hover:bg-zinc-800 hover:text-white duration-100 ease-linear bg-white px-5 py-2 rounded-md">
            {button}
          </button>
        </div>
        <div className="w-[150px] md:w-[200px]">
          <img src={img} className="w-full" />
        </div>
      </div>
    </Link>
  );
}
