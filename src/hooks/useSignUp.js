import {useState} from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    
    const signup = async (firstName, lastName, givenUsername, givenEmail, givenPassword) => {
        setIsLoading(true)
        setError(null)
        console.log(firstName, lastName, givenUsername, givenEmail, givenPassword)


        const response = await fetch('https://got-gains.herokuapp.com/api/user/signup' , {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                username: givenUsername,
                email: givenEmail,
                password: givenPassword
            })
        })
  
        
        const json = await response.json()
        console.log(json)
        

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            setError('Account Created Successfully')
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            



        }
    }
    return {signup, isLoading, error}
}