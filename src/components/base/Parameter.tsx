import { Children } from "react";

interface ParameterProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: React.HTMLInputTypeAttribute;
  value: string;
  name: string;
  parameterType: string;
  children: React.ReactNode;
}

const Parameter: React.FC<ParameterProps> = ({
  onChange,
  type,
  value,
  name,
  parameterType,
  children
}) => {
  if (parameterType === "text") {
    return (
      <div>
        <p>{name}</p>
        <input
          className="
            dark:bg-gray-800
            dark:text-gray-300
            p-1
            mr-2
            w-xl
            rounded-lg
          "
          type={type}
          onChange={onChange}
          value={value}
        />
      </div>
    );
  } else {
    return (
      <div>
        <p>{name}</p>
        <select
          className="
            dark:bg-gray-800
            dark:text-gray-300
            p-1
            mr-2
            w-20
            rounded-lg
          "
          type={type}
          value={value}
          onChange={onChange}
        >{children}</select>
      </div>
    );
  }

  // Return null or other parameter types as needed
  return null;
};

export default Parameter;