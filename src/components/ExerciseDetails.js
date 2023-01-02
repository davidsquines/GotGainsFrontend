import React from 'react'

const ExerciseDetails = ({exercise}) => {
    return (
        <div className="exercise-details">
            <h4>{exercise.exercise_name}</h4>
            <p><strong>Weight (lbs): </strong>{exercise.stats[exercise.stats.length - 1].load}</p>
            <p><strong>Sets:</strong> {exercise.stats[exercise.stats.length - 1].sets}</p>
            <p><strong>Reps:</strong>{exercise.stats[exercise.stats.length - 1].reps}</p>
            <p>{exercise.stats[exercise.stats.length-1].exercise_date.slice(0,10)}</p>
        </div>
  )
}

export default ExerciseDetails