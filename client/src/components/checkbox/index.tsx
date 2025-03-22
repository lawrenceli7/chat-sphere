import { Label, Radio } from "flowbite-react";
import { IoMdFemale, IoMdMale } from "react-icons/io";

// GenderCheckbox component definition
const GenderCheckbox = ({
  selectedGender, // Currently selected gender
  onCheckboxChange, // Callback function to handle gender selection
}: {
  selectedGender: string; // Type for the selected gender
  onCheckboxChange: (gender: "male" | "female") => void; // Function to handle gender change
}) => {
  return (
    <div className="flex items-center justify-center gap-6">
      {/* Male gender option */}
      <Label className="flex items-center gap-2 cursor-pointer" htmlFor="male">
        <IoMdMale className="w-6 h-6 text-white" />
        <span className="text-white">Male</span>
        <Radio
          id="male"
          name="male"
          value="Male"
          className="border-slate-900"
          checked={selectedGender === "male"} // Check if the male option is selected
          onChange={() => onCheckboxChange("male")} // Trigger callback on selection
        />
      </Label>

      {/* Female gender option */}
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
          checked={selectedGender === "female"} // Check if the female option is selected
          onChange={() => onCheckboxChange("female")} // Trigger callback on selection
        />
      </Label>
    </div>
  );
};

export default GenderCheckbox;
