import TypeIt from "typeit-react";

interface Props {
  data: string | string[];
  breakLine: boolean;
  loop: boolean;
  speed: number;
}

const TypeWriter: React.FC<Props> = ({ data, breakLine, loop, speed }) => {
  const strings = Array.isArray(data) ? data : data.split(".");
  if (!Array.isArray(data)) {
    for (let i = 0; i < strings.length - 1; i++) {
      strings[i] += ".";
    }
  }

  return (
    <TypeIt
      options={{
        loop: loop,
        strings: strings,
        lifeLike: true,
        speed: speed,
        nextStringDelay: 1000,
        cursorChar: "❚",
        breakLines: breakLine,
        loopDelay: 5000,
        deleteSpeed: 200,
        waitUntilVisible: true,
      }}
    ></TypeIt>
  );
};

export default TypeWriter;
