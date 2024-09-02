import { Label, Radio } from "flowbite-react";
import { IoMdFemale, IoMdMale } from "react-icons/io";

const GenderCheckbox = ({
  selectedGender,
  onCheckboxChange,
}: {
  selectedGender: string;
  onCheckboxChange: (gender: "male" | "female") => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <Label className="flex items-center gap-2 cursor-pointer" htmlFor="male">
        <IoMdMale className="w-6 h-6 text-white" />
        <span className="text-white">Male</span>
        <Radio
          id="male"
          name="male"
          value="Male"
          className="border-slate-900"
          checked={selectedGender === "male"}
          onChange={() => onCheckboxChange("male")}
        />
      </Label>
      <Label
        className="flex items-center gap-2 cursor-pointer"
        htmlFor="female"
      >
        <IoMdFemale className="w-6 h-6 text-white" />
        <span className="text-white">Female</span>
        <Radio
          id="female"
          name="female"
          value="Female"
          className="border-slate-900"
          checked={selectedGender === "female"}
          onChange={() => onCheckboxChange("female")}
        />
      </Label>
    </div>
  );
};
export default GenderCheckbox;
