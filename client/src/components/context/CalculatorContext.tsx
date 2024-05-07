import { createContext, useState } from "react";

type initialStateType = {
  gender: string,
  setGender: React.Dispatch<React.SetStateAction<string>>,
  purpose: string,
  setPurpose: React.Dispatch<React.SetStateAction<string>>,
}

const initialState = {
    gender: "",
    purpose: "",
    setGender: () => {},
    setPurpose: () => {}
  };

export const CalculatorContext = createContext<initialStateType>(initialState);

export const CalculatorContextProvider = ({ children }: any) => {
    const [gender, setGender] = useState<string>("");
    const [purpose, setPurpose] = useState<string>("")
  
    return (
      <CalculatorContext.Provider value={{ gender, setGender, purpose, setPurpose }}>
        {children}
      </CalculatorContext.Provider>
    );
  };