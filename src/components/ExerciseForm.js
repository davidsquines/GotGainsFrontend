import {useState} from "react"
import { useExerciseContext } from "../hooks/useExerciseContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { Button, Container, Form } from "react-bootstrap"

const ExerciseForm = () => {
    const {dispatch} = useExerciseContext()
    const [exercise_name, setExercise] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user){
            setError('You must be logged in ')
            return;

        }
        const exercise_date = Date.now()
        console.log(exercise_date)
        const stats = {exercise_date, load, sets, reps}
        const exercise = {exercise_name, stats}
     
       

        const response = await fetch('https://got-gains.herokuapp.com/api/exercises/', {
            method: "POST",
            body: JSON.stringify(exercise),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${user.token}` 
            }
        })
        console.log(JSON.stringify(exercise))
        const json = await response.json();
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setExercise('')
            setSets('')
            setReps('')
            setLoad('')
            setError(null)
            setEmptyFields([])
            console.log('new exercise added', json)
            dispatch({type: "CREATE_EXERCISE", payload: json})
        }


    }

    return(
        <Container style={{textAlign:'start'}}>
            <Form>
                <Container className='my-3'>
                    <Form.Group className='w-100' controlId='formBasicText'>
                        <Form.Label>Exercise Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Exercise Name"
                            onChange={(event) => setExercise(event.target.value)}
                            value={exercise_name}
                        />
                    </Form.Group>

                </Container>
                <Container className='my-3'>
                    <Form.Group className='w-100' controlId='formBasicText'>
                        <Form.Label>Weight Lifted (In lbs):</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Weight"
                            onChange={(event) => setLoad(event.target.value)}
                            value={load}
                        />

                    </Form.Group>
                </Container>
                <Container className='my-3'>
                <Form.Group className='w-100' controlId='formBasicText'>
                    <Form.Label>Sets:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Sets"
                        onChange={(event) => setSets(event.target.value)}
                        value={sets}
                    />
                </Form.Group>
                </Container>
                <Container className='my-3'>
                    <Form.Group className='w-100' controlId='formBasicText'>
                        <Form.Label>Reps Performed: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Reps"
                            onChange={(event) => setReps(event.target.value)}
                            value={reps}
                        />
                    </Form.Group>
                </Container>
            </Form>
            <Button className='ms-2' variant="danger" type="submit" onClick={handleSubmit}>
                Create Exercise  
            </Button>
        </Container>

    )



}
export default ExerciseForm
