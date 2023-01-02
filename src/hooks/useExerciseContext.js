import { ExerciseContext } from "../context/ExericseContext";
import { useContext } from "react";

export const useExerciseContext = () =>{
    const context = useContext(ExerciseContext)

    if(!context) {
        throw Error('useExerciseContext must be inside an AuthContextProvider')
    }
    return context


}