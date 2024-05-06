import { createContext, useState } from "react";

const initialState = {
    gender: "",
    purpose: "",
  };

export const CalculatorContext = createContext(initialState);

export const CalculatorContextProvider = ({ children }: any) => {
    const [gender, setGender] = useState("");
    const [purpose, setPurpose] = useState("")
  
    return (
      <CalculatorContext.Provider value={{ gender, setGender, purpose, setPurpose }}>
        {children}
      </CalculatorContext.Provider>
    );
  };