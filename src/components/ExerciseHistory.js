import React, {useState, useEffect} from 'react'
import { useExerciseContext } from '../hooks/useExerciseContext'

function getExercise(exercises, id){
  for(let i = 0; i < exercises.length; i++){
    if(exercises[i]._id == id){
      console.log(exercises)
      return exercises[i].stats;
    } 
  }
}
const ExerciseHistory = ({exercise}) => {
    const {exercises} = useExerciseContext();

    const statistics = getExercise(exercises, exercise._id);
    
    return (
        <>
          <h3 style={{'textAlign' : 'center'}}>Exercise History</h3>

          {statistics && statistics.reverse().map(function(stats, idx){
              return(
                <div className='exercise-details' key={idx}>
                  <strong>{stats.exercise_date.slice(0,10)}</strong>
                  <p>Weight: <strong>{stats.load}</strong></p>
                  <p>Sets: <strong>{stats.sets}</strong></p>
                  <p>Reps: <strong>{stats.reps}</strong></p>
             
                </div>
              )
              
          })}
          
       
        </>
    )
}

export default ExerciseHistory