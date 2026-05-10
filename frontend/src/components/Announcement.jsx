import { useEffect, useRef, useState } from "react";

const messages = [
  "WE SHIP WORLD WIDE",
  "WE SHIP WORLD WIDE"
];

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    start();
    return () => stop();
  }, []);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div
      className="w-full bg-black h-[36px] overflow-hidden flex items-center"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className="min-w-full text-center text-[11px] font-medium tracking-[0.2em] uppercase text-white"
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
