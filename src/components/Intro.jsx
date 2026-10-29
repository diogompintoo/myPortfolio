import { useState, useEffect } from "react";

const LINES = [
  "$ portfolio --init",
  "> Loading Diogo Pinto profile...",
  "> Mounting projects...",
  "> Stack: Java · Spring Boot · Angular · React",
  "> Ready.",
  "",
  "Welcome.",
];

export default function Intro({ onFinish }) {
  const [displayed, setDisplayed] = useState("");
  const [finishedTyping, setFinishedTyping] = useState(false);
  const [falling, setFalling] = useState(false);
  const [hide, setHide] = useState(false);

  // Typing effect
  useEffect(() => {
    const fullText = LINES.join("\n");
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setFinishedTyping(true), 600);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  // Depois de escrever → letras caem
  useEffect(() => {
    if (!finishedTyping) return;

    const timer = setTimeout(() => {
      setFalling(true);

      setTimeout(() => {
        setHide(true);
        setTimeout(() => {
          onFinish();
        }, 500); // fade de 0.5s
      }, 1400);
    }, 400);

    return () => clearTimeout(timer);
  }, [finishedTyping, onFinish]);

  // Skip com clique ou tecla
  useEffect(() => {
    const skip = () => {
      setFalling(true);
      setTimeout(() => {
        setHide(true);
        setTimeout(onFinish, 500);
      }, 800);
    };

    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [onFinish]);

    const renderFallingText = () => {
    return displayed.split("").map((char, index) => {
      if (char === "\n") {
        return <br key={index} />;
      }

      const delay = Math.random() * 0.5;
      const duration = 0.9 + Math.random() * 0.6;
      const x = (Math.random() - 0.5) * 80;

      return (
        <span
          key={index}
          className={`inline-block ${falling ? "falling-letter" : ""}`}
          style={
            falling
              ? {
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  "--fall-x": `${x}px`,
                }
              : {}
          }
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };


  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative max-w-2xl px-6 font-mono text-sm sm:text-base text-green-400 leading-relaxed select-none">
        <pre className="whitespace-pre-wrap">{renderFallingText()}</pre>

        {!finishedTyping && (
          <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse align-middle" />
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-green-800">
        PRESS ANY KEY OR CLICK TO SKIP
      </div>
    </div>
  );
}