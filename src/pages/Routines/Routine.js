import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useExerciseContext } from '../../hooks/useExerciseContext'
import { Button, Row, Col } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'

function getExercise(exercises, id){
    for(let i = 0; i < exercises.length; i++){
      if(exercises[i]._id == id){
        console.log(exercises)
        return exercises[i];
      } 
    }
}

const Routine = () => {
    const {routine_id} = useParams()
    const [routineDetails, setRoutineDetails] = useState([])
    const [routineExercises, setRoutineExercises] = useState([])
    const {user} = useAuthContext();
    const {exercises} = useExerciseContext()
    useEffect(()=> {
        const getRoutine = async () => {
            await fetch(`https://got-gains.herokuapp.com/api/routines/${routine_id}`, {
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            }).then((response) => response.json())
              .then((data) => {
                setRoutineDetails(data)
                setRoutineExercises(data.exercises)
            })       
        }
        getRoutine();
        console.log(routineDetails)
    },[])
    

    return (
        <div className='exercise-detail-page exercise-page-wrapper'>
            <h4 style={{"marginBottom" : "10px"}}>{routineDetails.routine_name}</h4>
            {routineDetails.exercises && routineDetails.exercises.map((exercise, idx)=> {
                return(
                    <div>
                        <NavLink to={'/exercise/'+exercise.exercise_id}>
                            <RoutineExerciseDetail exercise={getExercise(exercises, exercise.exercise_id)}/>

                        </NavLink>
                       
                           
                        
                        {/* <ExerciseDetails key={exercise.exercise_id} exercise={getExercise(exercise.exercise_id)}/> */}
                        
                    </div>
                    
                )
            })}
        </div>
    )
}
function RoutineExerciseDetail(props){
    {console.log('exercise',props.exercise)}

    return(
        <>
        <div className='exercise-details exercise'>
            <div>
                <strong>{props.exercise.exercise_name}</strong>
                <p>Date: <strong>{props.exercise.stats[props.exercise.stats.length-1].exercise_date.slice(0,10)}</strong></p>
                <p>Weight: <strong>{props.exercise.stats[props.exercise.stats.length-1].load}</strong></p>
                <p>Sets: <strong>{props.exercise.stats[props.exercise.stats.length-1].sets}</strong></p>
                <p>Reps: <strong>{props.exercise.stats[props.exercise.stats.length-1].reps}</strong></p>

                
            </div>
            <div style={{marginTop: "30px",marginRight: "10px", top:"50%", left:"50%", color:"#A93F60", fontSize:"1.5rem"}}>
                <FaPlus/>
            </div>

            
           
        </div>
        
       
        </>
       
    )

}

export default Routine