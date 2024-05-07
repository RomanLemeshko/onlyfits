import { useParams } from "react-router-dom";
import './certainProgramPage.css'
import {  useSelector } from "react-redux";
import { RootState } from "../../store";
// import {arr} from '../mainPage/MainPage'

const CertainProgramPage = () => {
const {id} = useParams()
const progs = useSelector((state:RootState)=> state.allPrograms)

const certainProg = progs.find((each) =>{ return each.id === Number(id)})

// const certainProgram:ProgramType =arr[Number(id)-1]


console.log("CertainProgram:", certainProg)
  return (
    <div id="container">
      <h1>Описание программы</h1>
      <h2>Вид программы: {certainProg?.program_type}</h2>
      <h2>Название программы: {certainProg?.program_title}</h2>
      <h2>Программа расчитана на {certainProg?.training_days} дней</h2>
      <h2>Уровень сложности: {certainProg?.program_level}</h2>
      <h2>Рейтинг программы: {certainProg?.program_rating}</h2>


      
    </div>
  );
};

export default CertainProgramPage;