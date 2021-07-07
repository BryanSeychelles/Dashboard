import { React } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ListGroup from 'react-bootstrap/ListGroup'
import Logo from "./logo.png"

const links = [
    {name : "Identifiant", href : "#"},
    {name : "Home", href : "#"},
    {name : "Paramètres", href : "#"},
    {name : "About", href : "#"},
    {name : "Contact Us", href : "#"},
]

function anime(params) {
    var sidebar = document.getElementById("sidebar")
    var contain = document.getElementById("contain")

        sidebar.animate([
            // keyframes
            { marginLeft: '-100%' }, 
            { marginLeft: '0%' }
          ], { 
            // timing options
            duration: 100,
          });
          sidebar.style.marginLeft = '0%'
          contain.style.display = 'block'
          document.documentElement.style.overflow = 'hidden'

}

function close(params) {
    var sidebar = document.getElementById("sidebar")
    var contain = document.getElementById("contain")

    sidebar.animate([
        // keyframes
        { marginLeft: '-100%' }, 
        { marginLeft: '0%' }
      ], { 
        // timing options
        duration: 1000,
        direction: 'reverse'
      });
      sidebar.style.marginLeft = '-100%'
      contain.style.display = 'none'
      document.documentElement.style.overflow = 'scroll'
    }

export const Menu = () => {
    return(
            <section id="containNavbar">
                <Navbar bg="light" expand="lg">
                    <div id="buttonAnime" onClick={anime}>
                        <img
                            alt=""
                            src= {Logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        <Navbar.Brand href="#home">ashBoard</Navbar.Brand>
                    </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>                   
                <div id="sidebar">
                    <ListGroup>
                        {links.map(item => (
                            <ListGroup.Item action variant="secondary">
                                {item.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                <div id='contain' onClick={close}>

                </div>
            </section>
    )
}