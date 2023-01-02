import React, {useState} from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import * as FaIcons from "react-icons/fa"; 
import { useLogin } from '../../hooks/useLogin';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export const LogoHeader = styled(NavLink)`
    font-size: 100px;
    font-weight: 600;
    margin: 40px 0;
    color: #A93F60;
    position: relative;
`


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await login(email, password);
        navigate('/')
    }


  return (
    <div className='justify-content-center d-flex flex-column align-items-center'>
         <LogoHeader to="/"><FaIcons.FaDumbbell/></LogoHeader>
          <h2>Login</h2>
        <Form>
            <Form.Group className="mb-3 my-4" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}/>
            </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}/>
        </Form.Group>
        <Button className='mx-auto' variant="primary" type="submit" onClick={handleSubmit}>
            Login 
        </Button>
        </Form>
        {
            error && <div>{error}</div>
        }
        <span>Don't have an account? <NavLink to='/register'>Sign Up</NavLink></span>
    </div>

  )
}



export default Login