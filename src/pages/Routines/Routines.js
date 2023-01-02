import React, {useEffect, useState} from 'react'
import { useExerciseContext } from '../../hooks/useExerciseContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Col, Container, Row, Button } from 'react-bootstrap'
import RoutineListDetail from '../../components/RoutineListDetail'
import { NavLink } from 'react-router-dom'
import { useRoutineContext } from '../../hooks/useRoutineContext'

const Routines = () => {
  const {routines, dispatch} = useRoutineContext()
  const {user} = useAuthContext()
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchRoutines = async () => {
      const response = await fetch('https://got-gains.herokuapp.com/api/routines', {
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      console.log(json)
      if(response.ok) {
        dispatch({type: 'SET_ROUTINES', payload: json})
      }
    }
    if(user){
      fetchRoutines();
    }
  },[dispatch, user])
  return (
    <Container>
      <div className='exercise-page-wrapper'>
        <h2>My Routines</h2>
        <Row>
          <Col lg={9}>
            <input 
              placeholder='Enter Routine Name'
              onChange={(e) => setQuery(e.target.value)}/>
          </Col>
          <Col lg={3} className='end-100'>
              <NavLink to='/routines/createRoutine'> 
              <Button size='lg' className='mx-0 my-2 w-100' variant='danger'> Create Routine</Button>
              </NavLink>
            
          </Col>
        </Row>
      </div>
      {routines && routines.filter((routine)=> {
        if(query === ''){
          return routine
        } else if (routine.routine_name.toLowerCase().includes(query.toLowerCase())){
          return routine
        }
      }).map((routine, idx)=> (
        <>
          <RoutineListDetail key={routine._id} routine={routine}/>
        
        </>
      ))}
    </Container>
  )
}

export default Routines