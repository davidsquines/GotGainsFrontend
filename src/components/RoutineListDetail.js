import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useExerciseContext } from '../hooks/useExerciseContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { NavLink } from 'react-router-dom'
import { useRoutineContext } from '../hooks/useRoutineContext'

const RoutineListDetail = ({routine}) => {
  const {dispatch} = useRoutineContext();
  const {user} = useAuthContext();
  const deleteRoutine = async () => {
    if(!user){
      return
    }
    const response = await fetch('https://got-gains.herokuapp.com/api/routines/'+routine._id, {
      method: 'DELETE',
      headers: {
        'Authorization' : `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type: 'DELETE_ROUTINE', payload: json})
    }

  }

  
  return (
    <div className='exercise'>
        <NavLink to={`/routines/${routine._id}`}>
            <h4>{routine.routine_name}</h4>
        </NavLink>
        <button type='button' onClick={deleteRoutine}><FaTrash/></button>
    </div>
  )
}

export default RoutineListDetail