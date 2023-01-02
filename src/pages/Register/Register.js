import React, {useState} from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import * as FaIcons from "react-icons/fa"; 
import { useSignup } from '../../hooks/useSignUp';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

export const LogoHeader = styled(NavLink)`
    font-size: 100px;
    font-weight: 600;
    margin: 40px 0;
    color: #A93F60;
    position: relative;
`
const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const {signup, error, isLoading} = useSignup()
    const handleSubmit = async (e) =>{
        console.log(email)

        e.preventDefault();
        await signup(firstName, lastName, username, email, password);
    }

  return (
    <div className='justify-content-center d-flex flex-column align-items-center'>
        <LogoHeader to="/"><FaIcons.FaDumbbell/></LogoHeader>
        <h2>Register</h2>
        <Form>
            <Container className='mt-4'>
                <Row>
                    <Col sm={12} lg={6}>
                        <Form.Group className='mb-3' controlId='formBasicText'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='First Name'
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}/>

                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={6}>
                    <Form.Group className='mb-3' controlId='formBasicText'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='Last Name'
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}/>

                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className='mb-3' controlId='formBasicText'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Username'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}/>
                </Form.Group>
                <Button className='mx-auto' variant="primary" type="submit" onClick={handleSubmit}>
                    Register 
                </Button>

            </Container>
            

        </Form>
        {
            error && <div>{error}</div>
        }

    </div>
    // <LoginContainer>
    //     <LogoHeader to="/"><FaIcons.FaDumbbell/></LogoHeader>
    //     <LoginCard>
    //         <h2>Register</h2>
    //         <form onSubmit={handleSubmit}>
    //         <StyledInputGroup>
    //                 <label >First Name</label>
    //                 <StyledInput 
    //                     type='text' 
    //                     placeholder='enter first name'
    //                     onChange={(e) => setFirstName(e.target.value)}
    //                     value={firstName}/>
    //             </StyledInputGroup>
    //             <StyledInputGroup>
    //                 <label >Last Name</label>
    //                 <StyledInput 
    //                     type='text' 
    //                     placeholder='enter last name'
    //                     onChange={(e) => setLastName(e.target.value)}
    //                     value={lastName}/>
    //             </StyledInputGroup>
    //             <StyledInputGroup>
    //                 <label >Username</label>
    //                 <StyledInput 
    //                     type='text' 
    //                     placeholder='enter username'
    //                     onChange={(e) => setUsername(e.target.value)}
    //                     value={username}/>
    //             </StyledInputGroup>
    //             <StyledInputGroup>
    //                 <label >Email Address</label>
    //                 <StyledInput 
    //                     type='text' 
    //                     placeholder='enter email'
    //                     onChange={(e) => setEmail(e.target.value)}
    //                     value={email}/>
    //             </StyledInputGroup>
    //             <StyledInputGroup>
    //                 <label>Password</label>
    //                 <StyledInput 
    //                     type='text' 
    //                     placeholder='password'
    //                     onChange={(e) => setPassword(e.target.value)}
    //                     value={password}/>
    //             </StyledInputGroup>
    //             <StyledInputGroup>
    //                 <LoginButton type="submit" disabled={isLoading}>Sign Up</LoginButton>
    //                 {
    //                   error && <div>{error}</div>
    //                 }
    //             </StyledInputGroup>
    //         </form>
    //     </LoginCard>
    // </LoginContainer>

  )
}



export default Register