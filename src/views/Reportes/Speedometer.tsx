import React, { useEffect, useState } from "react";

interface SpeedometerProps {
  speed: number;
  effectiveType: string;
  infoText: string;
  maxSpeed: number;
}

const Speedometer: React.FC<SpeedometerProps> = ({
  speed,
  infoText,
  maxSpeed,
}) => {
  const [angle, setAngle] = useState(calcAngle(speed, maxSpeed));

  useEffect(() => {
    const updateAngle = () => {
      const newAngle = calcAngle(speed, maxSpeed);
      setAngle(newAngle);
    };

    updateAngle();
  }, [speed, maxSpeed]);

  function calcAngle(value: number, max: number) {
    let angle = -90;
    if (value < max / 4) {
      angle = (value / (max / 4)) * 60 - 90;
    } else if (value >= max / 4 && value < (max * 3) / 4) {
      angle = ((value - max / 4) / (max / 2)) * 90 - 30;
    } else {
      angle = ((value - (max * 3) / 4) / (max / 4)) * 30 + 60;
    }
    return Math.round(angle);
  }

  return (
    <div className="flex items-center justify-center p-2 bg-white">
      <div className="mx-auto max-w-sm overflow-hidden">
        <div className="items-center flex justify-center p-4 flex-col">
          <div className="speedometr relative">
            <div className="scale low"></div>
            <div className="scale middle"></div>
            <div className="scale hight"></div>
            <div
              id="arrow"
              className="arrow"
              style={{ transform: `rotate(${angle}deg)` }}
            ></div>
            {/* Números del velocímetro */}
          </div>

          <div
            id="counter"
            className="text-gray-800 text-center text-base font-semibold pt-4 pb-0"
          >
            {speed.toFixed(1)} unidades
          </div>
        </div>
        <div className="py-4 px-8 text-sm font-medium text-gray-800 leading-normal">
          <p>{infoText}</p>
        </div>
      </div>
    </div>
  );
};

export default Speedometer;
