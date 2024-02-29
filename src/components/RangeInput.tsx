import { generateNumberArray } from "@/utils/helpers";

interface props {
  handleOnChangeSearch: (range: string[]) => void;
  rangeMin: number;
  setSelectedMinRange: (range: number) => void;
  rangeMax: number;
  setSelectedMaxRange: (range: number) => void;
}

export default function RangeInput({
  handleOnChangeSearch,
  rangeMin,
  rangeMax,
  setSelectedMinRange,
  setSelectedMaxRange,
}: props) {
  const maxValue = parseInt(`${rangeMax}`) + 2;

  const handleMinChange = (minValue: number) => {
    setSelectedMinRange(minValue);
    const rangeSelected = generateNumberArray(minValue, maxValue);
    handleOnChangeSearch(rangeSelected);
  };
  const handleMaxChange = (maxValue: number) => {
    setSelectedMaxRange(maxValue);
    const maxValueInt = parseInt(`${maxValue}`) + 2;
    const rangeSelected = generateNumberArray(rangeMin, maxValueInt);
    handleOnChangeSearch(rangeSelected);
  };

  return (
    <div className="grid w-full">
      <div className="flex justify-between mb-5 mt-3 px-3">
        <div className="text-[12px]">
          <span className="text-gray-500"> min </span>{" "}
          <span className="font-semibold ">{rangeMin}</span>{" "}
        </div>
        <div className="text-[12px]">
          <span className="text-gray-500">max</span>{" "}
          <span className="font-semibold">{maxValue}</span>
        </div>
      </div>
      <div className="flex-1 relative ">
        <div className="grid grid-cols-2 gap-1">
          <div className="">
            <div className="flex gap-2 ">
              <div
                className={`w-1/2 h-1 ${
                  rangeMin > 0 ? `border border-yellow` : "bg-yellow"
                }  top-1/2 transform -translate-y-1/2 rounded-xl`}
              />
              <div className="w-1/2 h-1 bg-[#FFD75C] top-1/2 transform -translate-y-1/2 rounded-xl" />
            </div>
            <input
              type="range"
              min="0"
              max="2"
              value={rangeMin}
              className={`absolute range-slider w-[50%] h-full  cursor-pointer bg-transparent -mt-2 `}
              onChange={(e: any) => handleMinChange(e.target.value)}
            />
          </div>
          <div>
            <div className="flex gap-2">
              <div className="w-1/2 h-1 bg-[#FFD75C] top-1/2 transform -translate-y-1/2 rounded-xl" />
              <div
                className={`w-1/2 h-1 ${
                  rangeMax < 2 ? `border border-yellow` : "bg-yellow"
                } top-1/2 transform -translate-y-1/2 rounded-xl`}
              />
            </div>
            <input
              type="range"
              min="0"
              max="2"
              value={rangeMax}
              className={`absolute  range-slider w-[50%] h-full opacity-1 cursor-pointer bg-transparent border-red-400 -mt-2`}
              onChange={(e: any) => handleMaxChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
