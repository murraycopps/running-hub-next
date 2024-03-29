import PageWrapper from "@/components/PageWrapper";
import TimeInput from "@/components/TimeInput";
import { outTime } from "@/scripts";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [inputDistance, setInputDistance] = useState(1);
  const [outputDistances, setOutputDistances] = useState([0]);
  const [time, setTime] = useState(0);
  const [output, setOutput] = useState([""]);

  const outputDistanceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputDistance <= 0 || time <= 0) return;
    setOutput(
      outputDistances.map((o) => {
        return o + ": " + outTime((o / inputDistance) * time);
      })
    );
  }, [outputDistances, inputDistance, time]);

  return (
    <PageWrapper
      page="Unusual"
      className="flex flex-col min-h-screen gap-4 p-4 overflow-x-hidden text-center"
    >
      <h1 className="text-4xl">Convert Unusual Distances</h1>
      <div className="grid gap-4 sm:grid-cols-2 grow place-items-center">
        <div className="flex flex-col items-center h-full sm:h-3/4 justify-evenly">
          <input
            type="number"
            placeholder="Input Distance"
            onChange={(e) => {
              if (e.target.value !== "")
                setInputDistance(parseFloat(e.target.value));
              else setInputDistance(0);
            }}
            className="w-full p-4 text-3xl text-black bg-white rounded-full"
          />
          <TimeInput time={time} setTime={setTime} />

          <input
            type="number"
            ref={outputDistanceRef}
            placeholder="Output Distance"
            onChange={(e) =>
              setOutputDistances((oldValue) => [
                ...oldValue.slice(0, -1),
                e.target.valueAsNumber,
              ])
            }
            className="w-full p-4 text-3xl text-black bg-white rounded-full"
          />

          <div className="grid w-full grid-cols-3 gap-4">
            <button
              className="p-2 text-xl text-white rounded-full sm:p-4 bg-lavender-600 hover:bg-lavender-700"
              onClick={() => {
                setOutputDistances((oldValue) => [...oldValue, 0]);
                if (outputDistanceRef.current)
                  outputDistanceRef.current.value = "";
              }}
            >
              Add Distance
            </button>
            <button
              className="p-2 text-xl text-white rounded-full sm:p-4 bg-lavender-600 hover:bg-lavender-700"
              onClick={() => {
                if (outputDistances.length !== 1) {
                  setOutputDistances((oldValue) => [...oldValue.slice(0, -1)]);
                  if (outputDistanceRef.current)
                    outputDistanceRef.current.value =
                      outputDistances[outputDistances.length - 2].toString();
                }
              }}
            >
              Remove Distance
            </button>
            <button
              className="p-2 text-xl text-white rounded-full sm:p-4 bg-lavender-600 hover:bg-lavender-700"
              onClick={() => {
                setOutputDistances([0]);
                outputDistanceRef.current!.value = "";
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="w-full p-4 text-3xl text-left text-black whitespace-pre-wrap bg-white h-115 rounded-3xl">
          <p>{output.join("\n")}</p>
        </div>
      </div>
    </PageWrapper>
  );
}
