import React from 'react'
import {useEffect, useState} from 'react'
import ExerciseForm from '../../components/ExerciseForm'
import { useExerciseContext } from '../../hooks/useExerciseContext'
import ExerciseListDetail from '../../components/ExerciseListDetail'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
const Exercises = () => {
  const {exercises, dispatch} = useExerciseContext()
  const [query, setQuery] = useState("")
  const {user} = useAuthContext()
  const [modalShow, setModalShow] = useState(false)
  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch('https://got-gains.herokuapp.com/api/exercises/',{
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      console.log(json)
      if(response.ok){
        dispatch({type:'SET_EXERCISES', payload:json})
      }
    }
    if(user){
      fetchExercises()
    }

  },[dispatch, user])
  
  return (
    <>
    <Container>
    <div className='exercise-page-wrapper'>
      <h2>My Exercises</h2>

        <Row>
              <Col lg={9}>
                <input
                  placeholder='Enter Exercise Name'
                  onChange={(event) => setQuery(event.target.value)}
                ></input>
              </Col>
              <Col lg={3} className='end-100'>
                <Button size='lg' className='mx-0 my-2 w-100 btn btn-danger' onClick={() => setModalShow(true)}>Add Exercise</Button>
              </Col>
            </Row>    
      </div>
    
      {exercises &&
          exercises.filter((exercise) => {
            if(query === ''){
              return exercise;
            } else if(exercise.exercise_name.toLowerCase().includes(query.toLowerCase())){
              return exercise;
            } 
          })
          .map((exercise, index) => (
            <ExerciseListDetail key={exercise._id} exercise={exercise}/>

        ))}
      

    </Container>
    <CenteredExerciseForm 
      show={modalShow}
      onHide={() => setModalShow(false)}
      />
     
    </>

  )
}

function CenteredExerciseForm(props){
  return(
    <Modal 
      {...props}
      size='lg'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add New Exercise
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ExerciseForm/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Exercises