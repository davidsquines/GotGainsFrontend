import {createContext, useReducer } from "react"

export const RoutineContext = createContext()

export const routineReducer = (state, action) => {
    switch(action.type){
        case 'SET_ROUTINES':
            return{
                
                routines: action.payload
            }
        case 'CREATE_ROUTINES':
            return{
                routines: [action.payload, ...state.routines]
            }
        case 'UPDATE_ROUTINES':
            const updatedRoutine = action.payload;
            const updatedRoutines = state.routines.map((routine) => {
                if(routine._id == updatedRoutine._id){
                    return updatedRoutine
                }
                return routine
            })
            return {
                routines: updatedRoutines
            }
        case 'DELETE_ROUTINE':
            return {
                routines: state.routines.filter((e) => e._id !== action.payload._id)
            }
        default:
            return state
    }
}
export const RoutineContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(routineReducer, {
        routines: null
    })
    return (
        <RoutineContext.Provider value={{...state, dispatch}}>
            {children}
        </RoutineContext.Provider>
    )
}