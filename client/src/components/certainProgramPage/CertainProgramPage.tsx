import { useParams } from "react-router-dom";
import { ProgramType } from '../mainPage/MainPage'
import './certainProgramPage.css'
import {arr} from '../mainPage/MainPage'

const CertainProgramPage = () => {
const {id} = useParams()

const certainProgram:ProgramType =arr[Number(id)-1]

console.log(certainProgram)
  return (
    <div id="container">
      <h1>Описание программы</h1>
      <h2>{certainProgram.type}</h2>
      <h2>{certainProgram.title}</h2>
      <h2>{certainProgram.duration}</h2>
      <h2>{certainProgram.level}</h2>

      
    </div>
  );
};

export default CertainProgramPage;