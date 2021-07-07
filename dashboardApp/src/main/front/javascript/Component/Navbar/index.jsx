import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ListGroup from 'react-bootstrap/ListGroup'
import Logo from "./logo.png"



const links = [
    {name : "Identifiant" , img : "http://via.placeholder.com/640x360", route: "#", theme: "secondary" },
    {name : "Home" , img : "http://via.placeholder.com/640x360", route: "#", theme: "secondary" },
    {name : "Paramètres" , img : "http://via.placeholder.com/640x360", route: "#", theme: "secondary" },
    {name : "About" , img : "http://via.placeholder.com/640x360", route: "#", theme: "secondary" },
    {name : "Contact Us" , img : "http://via.placeholder.com/640x360", route: "#", theme: "secondary" },
    {name : "Sign out" , img : "http://via.placeholder.com/640x360", route: "#", theme: "danger" },
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
                </Navbar>                   
                <div id="sidebar">
                    <ListGroup>
                        {links.map(item => (
                            <ListGroup.Item action variant={item.theme}>
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