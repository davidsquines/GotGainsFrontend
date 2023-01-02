import React from 'react'
import { useExerciseContext } from '../hooks/useExerciseContext';
import {ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip} from 'recharts';

function getExercise(exercises, id){
  for(let i = 0; i < exercises.length; i++){
    if(exercises[i]._id == id){

      return exercises[i].stats.reverse();
    } 
  }
}
const dateFormatter = (tickItem) => {
  return tickItem.toString().slice(0,10);
}
const ExerciseStats = ({exercise}) => {
  const {exercises} = useExerciseContext();
  const stats = getExercise(exercises, exercise._id)
  

  return (
    <div className='exercise-stats'>
      <h3>Exercise Statistics (Ordered by Weight)</h3>
       <ResponsiveContainer width='100%' height={300} minHeight={100}>
        <LineChart width='100%' height={500} data={stats} margin={{ top: 50, right: 50}}>
          <Line type='monotone' dataKey='load' stroke="#8884d8"/>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="exercise_date" tickFormatter={dateFormatter}/>
          <YAxis />
          <Tooltip labelFormatter={dateFormatter}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
      


   
    
  )
}

export default ExerciseStats