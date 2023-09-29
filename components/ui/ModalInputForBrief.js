import { useState } from "react";
import { InputErrorMessage } from "./InputErrorMessage";
import MaskedInput from "react-input-mask";

export default function ModalInputForBrief({
  type,
  id,
  placeholder,
  error,
  register,
  name,
  pattern,
  max = 50,
}) {
  const [tel, setTel] = useState("");
  return (
    <>
      <MaskedInput
        mask="+7 (921) 000-0000"
        alwaysShowMask
        onChange={(e) => setTel(e.target.value)}
        value={tel}
        name={name} // Fix: Use the correct prop name
      >
        {(inputProps) => (
          <input
            className="py-3 px-5 w-full border border-link-water rounded-5xl lg:max-w-[422px] lg:py-3.8"
            type={type}
            id={id}
            placeholder={placeholder}
            {...register(name, { pattern })} // Fix: Pass the pattern inside an object
            {...inputProps}
            min={type === "number" ? 0 : undefined}
            max={type === "number" ? max : undefined}
          />
        )}
      </MaskedInput>
      {error && <InputErrorMessage message={error} />}
    </>
  );
}
