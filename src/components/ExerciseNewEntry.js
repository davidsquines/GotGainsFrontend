import React, {useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Button, Container, Form } from "react-bootstrap"
import { useExerciseContext } from '../hooks/useExerciseContext'
const ExerciseNewEntry = ({exercise}) => {
  const {dispatch} = useExerciseContext();
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [load, setLoad] = useState('')
  const [error, setError] = useState(null)
  const {user} = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
      setError('You must be logged in')
      return;
    }
    const exercise_date = Date.now()
    console.log(exercise_date)
    const stats = {exercise_date, sets, reps, load}
    console.log('stats', JSON.stringify(stats))

    const response = await fetch(`https://got-gains.herokuapp.com/api/exercises/${exercise._id}`, {
      method: "PATCH",
      body: JSON.stringify(stats),
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${user.token}` 
      }
    })
    const json = await response.json();
    if(!response.ok){
      setError(json.error)

    }
    if(response.ok){
      console.log(json)
      setSets('')
      setReps('')
      setLoad('')
      dispatch({type: 'UPDATE_EXERCISE', payload: json.exercise})
    }
    


  }
  return (
    <Container className='w-100' style={{textAlign:'start'}}>
      <h3 style={{'textAlign' : 'center'}}>Enter New Entry</h3>

            <Form>
                <Container className='my-3'>
                    <Form.Group className='w-100' controlId='formBasicText'>
                        <Form.Label>Weight Lifted (In lbs):</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Weight"
                            onChange={(event) => setLoad(event.target.value)}
                            value={load}
                            min="0"
                            max='1000'
                        />

                    </Form.Group>
                </Container>
                <Container className='my-3'>
                <Form.Group className='w-100' controlId='formBasicText'>
                    <Form.Label>Sets:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Sets"
                        onChange={(event) => setSets(event.target.value)}
                        value={sets}
                        min='1'
                        max='20'
                    />
                </Form.Group>
                </Container>
                <Container  className='my-3'>
                    <Form.Group className='w-100' controlId='formBasicText'>
                        <Form.Label>Reps Performed: </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Reps"
                            onChange={(event) => setReps(event.target.value)}
                            value={reps}
                            min='1'
                            max='700'
                        />
                    </Form.Group>

                </Container>
            </Form>
            <Button className='ms-2' variant="danger" type="submit" onClick={handleSubmit}>
                Add New Entry
            </Button>
        </Container>
  )
}

export default ExerciseNewEntry