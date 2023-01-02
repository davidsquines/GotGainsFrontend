import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useExerciseContext } from '../hooks/useExerciseContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { NavLink } from 'react-router-dom'

const ExerciseListDetail = ({exercise}) => {
  const {dispatch}  = useExerciseContext()
  const {user} = useAuthContext();
  const handleClick = async () => {
    if(!user){
      return
    }
    const response = await fetch('https://got-gains.herokuapp.com/api/exercises/' + exercise._id, {
        method: 'DELETE',
        headers: {
          'Authorization' : `Bearer ${user.token}`

        }
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_EXERCISE', payload: json})

    }
 }

  return (
      <div className='exercise'>
      <NavLink 
        to={`/exercise/${exercise._id}`
        }>
        <h4>{exercise.exercise_name}</h4>
      </NavLink>
        <button type="button" onClick={handleClick}><FaTrash/></button> 
      </div>

 
   
   
  )
}

export default ExerciseListDetail