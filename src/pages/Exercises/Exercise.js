import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import ExerciseHistory from '../../components/ExerciseHistory';
import ExerciseNewEntry from '../../components/ExerciseNewEntry';
import ExerciseStats from '../../components/ExerciseStats';
import { useAuthContext } from '../../hooks/useAuthContext';

const Exercise = () => {
    const {exercise_id} = useParams();
    const [exerciseDetails, setExerciseDetails] = useState([]);
    const {user} = useAuthContext();
    useEffect(()=> {
      getExercise();
      console.log(exerciseDetails)
    },[])

    const getExercise = () => {
      fetch(`https://got-gains.herokuapp.com/api/exercises/${exercise_id}`,{
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      }).then((response) => response.json())
        .then((data) => {
          setExerciseDetails(data)
       
        }) 
    }
  return (
    // <div>{exerciseDetails.exercise_name}</div>
    <div className='exercise-detail-page content-wrap'>
      <h1>{exerciseDetails.exercise_name}</h1>
      <Tabs
        defaultActiveKey='new-entry'
        id='justify-tab-example'
        className='mb-5 tab'
        justify
      >
        <Tab eventKey='new-entry' title='New'>
          <ExerciseNewEntry exercise={exerciseDetails}/>
        </Tab>
        
        <Tab eventKey='history' title='History'>
          <ExerciseHistory exercise={exerciseDetails} />
        </Tab>
        <Tab eventKey='stats' title='Stats'>
          <ExerciseStats exercise={exerciseDetails}/>
        </Tab>



      </Tabs>
    
    </div>
  )
}

export default Exercise

