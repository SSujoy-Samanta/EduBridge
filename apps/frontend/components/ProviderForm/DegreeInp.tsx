"use client";
import { degrees } from "@/utils/course";
export const DegreeInp = ({
  currEducation,
  setcurrEducation,
  pastEducation,
  setpastEducation,
}: {
  currEducation: string;
  setcurrEducation: React.Dispatch<React.SetStateAction<string>>;
  pastEducation: string;
  setpastEducation: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleCurrEducation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setcurrEducation(event.target.value);
  };
  const handlePaseEducation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setpastEducation(event.target.value);
  };
  return (
    <div className="pt-2">
      <div className="flex justify-between p-2 gap-3 xxs:flex-col xxs:gap-3">
        <div className="flex gap-2 items-center">
          <label
            className="font-bold text-amber-700"
            htmlFor="currEducation-selector"
          >
            Present
          </label>
          <select
            name="currEducation"
            id="currEducation-selector"
            onChange={handleCurrEducation}
            value={currEducation || ""}
            className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
          >
            <option value="">Degrees</option>
            <option value="Passed out">Passed Out</option>
            {degrees.map((x, ind) => {
              return (
                <option value={x} key={ind}>
                  {x}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex gap-2 items-center ">
          <label
            className="font-bold text-amber-700"
            htmlFor="pastEducation-selector"
          >
            Past
          </label>
          <select
            name="pastEducation"
            id="pastEducation-selector"
            onChange={handlePaseEducation}
            value={pastEducation || ""}
            className="text-white rounded-md bg-neutral-800 border border-cyan-400 p-1"
          >
            <option value="">Degrees</option>
            {degrees.map((x, ind) => {
              return (
                <option value={x} key={ind}>
                  {x}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};
