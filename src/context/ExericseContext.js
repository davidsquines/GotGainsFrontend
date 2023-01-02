import {createContext, useReducer } from "react"

export const ExerciseContext = createContext()
//used to keep local state of exercises and routines in sync with exercises in the datebase without page refresh
export const exerciseReducer = (state, action) =>{
    switch(action.type){
        case 'SET_EXERCISES':
            console.log(state.exercises)
            return{
                exercises: action.payload
            }
        case 'CREATE_EXERCISE':
            
            return{
                exercises: [action.payload, ...state.exercises]
            }
        case 'UPDATE_EXERCISE': 
            const updatedExercise = action.payload;
            const updatedExercises = state.exercises.map((exercise) => {
                if(exercise._id == updatedExercise._id){
                    return updatedExercise
                }
                return exercise;
            })
            console.log(state.exercises)
            return {
                exercises: updatedExercises
            }
        case 'DELETE_EXERCISE':
            console.log(action.payload._id)
            return {
         
                exercises: state.exercises.filter((e) => e._id !== action.payload._id)
            }
        
            
        default:
            return state

    }
}

export const ExerciseContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(exerciseReducer, {
        exercises:null,
    })

    
    return (
        <ExerciseContext.Provider value={{...state, dispatch}}>
            {children}
        </ExerciseContext.Provider>
    )
}