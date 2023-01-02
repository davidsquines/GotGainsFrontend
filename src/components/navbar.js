import React, {useState} from 'react'
import styled from 'styled-components'

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { NavLink, useNavigate } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {logout} = useLogout();
  const {user} = useAuthContext();
  const navigate = useNavigate()
  const handleClick = () => {
    logout()
    navigate('/login')


  }


  
  return (
    <>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand='lg'>

          <Navbar.Brand href='/' className='ms-3'>Got Gains</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          
          <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end mx-3 my-3 px-3'>
            <Nav >

                {user && (
                  <>
                    <Nav.Link as={NavLink} className='mx-3' to='/exercises'>My Exercises</Nav.Link>
                    <Nav.Link as={NavLink} className='mx-3' to='/routines'>My Routines</Nav.Link>
                    <Button variant='outline-danger' className='w-30 btn-outline-danger'onClick={handleClick}>Log Out</Button>
                  </>
                )}
                {!user && (
                  <>
                    <Nav.Link as={NavLink} to='/login'>Login</Nav.Link>
                    <Nav.Link as={NavLink} to='/register'>Register</Nav.Link>
                  </>
                )}
              
              
            </Nav>
          </Navbar.Collapse>



      </Navbar>
    
    </>
  )
}

export default NavBar