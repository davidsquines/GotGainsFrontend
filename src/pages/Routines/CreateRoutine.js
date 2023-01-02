
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useExerciseContext } from '../../hooks/useExerciseContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Container, Form, Row, Col, Button, Modal } from 'react-bootstrap'
import {FaPlus, FaMinus} from 'react-icons/fa'
import { useRoutineContext } from '../../hooks/useRoutineContext'


const CreateRoutine = () => {
    const {dispatch, exercises} = useExerciseContext()
    const [routine_name, setRoutineName] = useState('')
    const [addedExercises, setExercises] = useState([])
    const [query, setQuery] = useState("")
    const [modalShow, setModalShow] = useState(false)
    
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchExercises = async () => {
          const response = await fetch('/api/exercises/',{
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
    //return false if duplicate not found
    //returns true if duplicate is found 
    const checkDuplicate = (exercises, exercise_id) => {
        if(exercises.length === 0) {
            return false;
        }
        for(let i = 0; i < exercises.length; i++){
            console.log(exercises[i].exercise_id)
            console.log(exercise_id)
            if(exercises[i].exercise_id == exercise_id){
                return true;
            }
        }
        return false;

    }

  return (
    <div className='routine-page'>
        <h3>Create New Routine</h3>
        <div className='routine-page-blocks'>
            <Form>
                <Form.Group className='w-25 mx-auto' controlId='formBasicText'>
                    <Form.Label>Routine Name: </Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder='Enter Routine Name'
                        onChange={(e) => setRoutineName(e.target.value)}
                        value = {routine_name}/>
                </Form.Group>
            </Form>
        </div>
        <div className='routine-page-blocks'>
            <Container>
                <h4>Add Exercises</h4>
                <Row>
                    <Col lg={6} sm={12}>
                        <input
                            placeholder='Enter Exercise Name'
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <div className='added-exercises-container'>
                        {exercises &&
                                exercises.filter((exercise) => {
                                    if(query === ''){
                                    return exercise;
                                    } else if(exercise.exercise_name.toLowerCase().includes(query.toLowerCase())){
                                    return exercise;
                                    } 
                                })
                                .map((exercise, index) => (
                                    <div className='exercise-to-add'>
                                        <p>{exercise.exercise_name}</p>
                                        <Button type="submit" 
                                            onClick={() => {
                                                if(!checkDuplicate(addedExercises, exercise._id)){
                                                    setExercises([
                                                        {exercise_name : exercise.exercise_name, exercise_id : exercise._id},
                                                        ...addedExercises
                                                    ])
                                                }
                                                else{
                                                    console.log('hit')
                                                }
                                            }}
                                        
                                        >

                                            <FaPlus/>
                                        </Button>
                                        
                                    </div>

                                ))}


                        </div>
                    </Col>
                    <Col lg={6} sm={12}>
                        {console.log(addedExercises)}
                        {addedExercises && 
                            addedExercises.map((ex, idx) => {
                                return (
                                    <div className='exercise-to-add' key={ex.exercise_id}>
                                        <p>{ex.exercise_name}</p>
                                        <Button type="submit" 
                                            onClick={() => {
                                             
                                                var newExercises = [...addedExercises]
                                                var filteredExercises = newExercises.filter(exercise => exercise.exercise_id !== ex.exercise_id)
                                                setExercises(filteredExercises)
                                            }}
                                        ><FaMinus/> </Button>
                                    </div>
                                )
                             
                            })    
                        }
                    </Col>
                </Row>
            </Container>
        </div>
        <Button size='lg' className='mx-0 my-2 w-25' onClick={() => setModalShow(true)}>Add Routine</Button>
        <ConfirmRoutineModal
            show={modalShow}
            onHide={ () => setModalShow(false)}
            addedExercises= {addedExercises}
            routineName = {routine_name}
        />
    </div>
  )
}

function ConfirmRoutineModal(props){
    const {dispatch} = useRoutineContext();
    const {user} = useAuthContext();
    const navigate = useNavigate()

    const submitRoutine = async (e) => {
        e.preventDefault();

        const routine_name = props.routineName
        const exercises = props.addedExercises
        const user_id = user._id
        const newRoutine = {routine_name, exercises, user_id}

        const response = await fetch('https://got-gains.herokuapp.com/api/routines/', {
            method: 'POST',
            body: JSON.stringify(newRoutine),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${user.token}` 
            }
        })

        console.log( JSON.stringify(newRoutine))
        const json = await response.json();
        if(response.ok){
            dispatch({type: 'CREATE_ROUTINES', payload: json})
            navigate(`/routines/${json._id}`)
        }

    }

    return(
      <Modal 
        {...props}
        size='lg'
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Confirm Routine
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <h3>Routine Name: </h3>
          
                <h5>{props.routineName}</h5>
                <hr/>
            </div>
            <div>
                <h5>Exercises:</h5>
                <hr/>
                {props.addedExercises.map((exercise, idx) => {
                    return(
                        <>
                            <p>{exercise.exercise_name}</p>
                        </>
                    )
                })}
            </div>
            
            
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitRoutine}>Confirm</Button>  
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }

export default CreateRoutine