import { createContext, useState } from "react";

type initialStateType = {
  gender: string,
  setGender: React.Dispatch<React.SetStateAction<string>>,
  purpose: string,
  setPurpose: React.Dispatch<React.SetStateAction<string>>,
  
  functionalTraining: number,
  setFunctionalTraining: React.Dispatch<React.SetStateAction<number>>,
  strengthTraining: number,
  setStrengthTraining: React.Dispatch<React.SetStateAction<number>>,
  activeHobbies: number,
  setActiveHobbies: React.Dispatch<React.SetStateAction<number>>,

}

const initialState = {
    gender: "",
    purpose: "",
    setGender: () => {},
    setPurpose: () => {},
    
    functionalTraining: 0,
    setFunctionalTraining: () => {},
    strengthTraining: 0,
    setStrengthTraining: () => {},
    activeHobbies: 0,
    setActiveHobbies: () => {},
  };

export const CalculatorContext = createContext<initialStateType>(initialState);

export const CalculatorContextProvider = ({ children }: any) => {
    const [gender, setGender] = useState<string>("");
    const [purpose, setPurpose] = useState<string>("")
    const [functionalTraining, setFunctionalTraining] = useState<number>(0);
    const [strengthTraining, setStrengthTraining] = useState<number>(0);
    const [activeHobbies, setActiveHobbies] = useState<number>(0);
    
    return (
      <CalculatorContext.Provider value={{ gender, setGender, purpose, setPurpose, functionalTraining, setFunctionalTraining, strengthTraining, setStrengthTraining, activeHobbies, setActiveHobbies }}>
        {children}
      </CalculatorContext.Provider>
    );
  };