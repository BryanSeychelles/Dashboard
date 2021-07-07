import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export class FormsInscription extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            lastName : '',
            firstName : '',
            Email:'',
            password: '',
            confirm_password: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();   
        const {lastName} = this.state
        const {firstName}= this.state
        const {Email} = this.state
        const {password} = this.state
        const {confirm_password} = this.state

        // const data = {firstName : firstName, lastName : lastName, email : Email, password: password}
        const data = `firstName=${firstName}&lastName=${lastName}&email=${Email}&password=${password}`

        if (firstName != '') {
            if (password === confirm_password) {
                axios.post('http://localhost:8080/register', data) // add true route
                .then(response => {
                    this.setState({
                        lastName: '',
                        firstName: '',
                        Email: '',
                        password:'',
                        confirm_password:'',
                    })
                    alert("Account created successfully! Please confirm by email before logging in!")
                    window.location = "/home"
                })
                .catch(error => {
                    alert("Error creating account : " + error)
                })    
            }
            if (password !== confirm_password) {
                alert('Password and confirm password are different')
            }
        } else {
            alert('Fill in the form')
        }

    }

    render() {
        const {lastName, firstName, Email, password, confirm_password} = this.state
        return (
            <div id="formTwo">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor='firstName'>Firstname</Form.Label>
                        <Form.Control type="text" id='firstName' name='firstName' value={firstName} onChange={this.handleChange} placeholder="Enter your Firstname" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='lastName'>Lastname</Form.Label>
                        <Form.Control type="text" id='lastName' name='lastName'  value={lastName} onChange={this.handleChange} placeholder="Enter your lastname" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='Email'>Email address</Form.Label>
                        <Form.Control type="email" id='Email' name='Email'  value={Email} onChange={this.handleChange} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <Form.Control type="password" id='password' name='password'  value={password} onChange={this.handleChange} placeholder="Password" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='confirm_password'>Confirm Password</Form.Label>
                        <Form.Control type="password" id='confirm_password' name='confirm_password' value={confirm_password} onChange={this.handleChange} placeholder="Confirm Password" />
                    </Form.Group>
                    <Button variant="light" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export class FormsLogin extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            username:'',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();   
        const {username} = this.state
        const {password} = this.state

        // const data = {username : username, password: password}
        const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

        axios.post('http://localhost:8080/login', data)
        .then(response => {
            this.setState({
                username: '',
                password:'',
            })
            window.location = "/home"
        })
        .catch(error => {
            alert("Authentication failed.")
            console.log("ERROR : " + error)
        })    
    }

    render() {
        const {username, password} = this.state
        return (
            <div id="formOne">
                 <Form onSubmit={this.handleSubmit}>
                     <Form.Group>
                         <Form.Label htmlFor='username'>Email address</Form.Label>
                         <Form.Control type="email" id='username' name='username'  value={username} onChange={this.handleChange} placeholder="Enter email" />
                         <Form.Text className="text-muted">
                         We'll never share your email with anyone else.
                         </Form.Text>
                     </Form.Group>
                     <Form.Group>
                         <Form.Label htmlFor='password'>Password</Form.Label>
                         <Form.Control type="password" id='password' name='password'  value={password} onChange={this.handleChange} placeholder="Password" />
                     </Form.Group>
                     <Button variant="light" type="submit">
                         Submit
                     </Button>
                 </Form>
            </div>
        )
    }
}

export const Inscription = () => {

    document.documentElement.style.overflow = 'hidden'

    return(
        <section id="authent">
            <div className='container'>
                <div id="inscription" className='row'>
                    <div className='col-6'>
                        <FormsInscription/>
                    </div>
                    <div className='col-6'>
                        <ul>
                            <li>
                                <FontAwesomeIcon id="icon" icon='cloud'/> &nbsp; Weather Service
                            </li>
                            <li>
                                <FontAwesomeIcon id="icon" icon={["fab", "github"]}/> &nbsp; Github Service
                            </li>
                        </ul>
                    </div>
                    <Button id='SignIn' href="#login" variant="outline-light">Sign In </Button>
                </div>
                <div id='login' className='row'>
                    <div className='col-6'>
                        <ul>
                            <li>
                                Weather Service &nbsp; <FontAwesomeIcon id="icon" icon='cloud'/> 
                            </li>
                            <li>
                                Github Service &nbsp; <FontAwesomeIcon id="icon" icon={["fab", "github"]}/> 
                            </li>
                        </ul>
                    </div>
                    <div className='col-6'>
                        <FormsLogin/>
                        <hr/>
                        <Button style={{width:'100%', color: 'rgb(165, 141, 6)'}} variant="outline-light">Sign Up with Github <FontAwesomeIcon id="icon" icon={["fab", "github"]}/> </Button>
                        <br/><br/>
                        <Button style={{width:'100%', color: 'rgb(165, 141, 6)'}} variant="outline-light">Sign Up with Google <FontAwesomeIcon id="icon" icon={["fab", "google"]}/> </Button>
                    </div>
                    <Button id='SignIn' href="#inscription" variant="outline-light">Sign Up</Button>
                </div>
            </div>
        </section>
    )
}