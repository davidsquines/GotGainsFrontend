import React from 'react'
import {useEffect, useState} from 'react'
import { useExerciseContext } from '../../hooks/useExerciseContext'
import { useAuthContext } from '../../hooks/useAuthContext';
import Login from '../Login/Login';
import {getAllExercise} from '../../services/api'

//components
import ExerciseDetails from '../../components/ExerciseDetails'

export const Home = () => {
  const {exercises, dispatch} = useExerciseContext()
  const {user} = useAuthContext();
  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch('https://got-gains.herokuapp.com/api/exercises/', {
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type:'SET_EXERCISES', payload:json})
      }
    }

    
    if(user){
      fetchExercises()

    }
   
  },[dispatch, user])
  return (
    <div className='content-wrap'>
      {user && (
         <div className='home'>
         <div>
           <h1>Recent Exercises</h1>
           {exercises && exercises.filter((exercise,idx) => idx < 5).map((exercise)=>(
             <ExerciseDetails key={exercise._id} exercise={exercise}>
             </ExerciseDetails>
          
           ))}
         </div>
       </div>
      )}
      {!user && (
        <Login/>

      )}


    </div>
   
  )
}
