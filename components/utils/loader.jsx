import style from "../../styles/Home.module.css";

export function Loader2() {
  return (
    <div className="flex w-full justify-center ">
      <svg
        className="w-[100px] h-[100px] fill-blue-400"
        version="1.1"
        id="L9"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
      >
        <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}

export default function Loder({ text, hideheight }) {
  return (
    <div
      className={`flex flex-col gap-2 dark:bg-transparent ${
        hideheight ? "h-autos" : "h-[300px]"
      }  w-full justify-center items-center`}
    >
      <div className={`${style.loader}`}>
        <span>
          <svg
            className="fill-blue-500"
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 50 50"
            style={{ enableBackground: "new 0 0 50 50" }}
          >
            <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </span>
      </div>
      <span className="text-3xl md:text-4xl  text-zinc-600">{text}</span>
    </div>
  );
}

export function LoginLoader() {
  return (
    <div className="w-full flex py-2 justify-center">
      <div className="stage">
        <div className={`${style["dot-pulse"]}`}></div>
      </div>
    </div>
  );
}
