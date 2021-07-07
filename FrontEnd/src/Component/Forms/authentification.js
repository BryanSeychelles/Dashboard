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

        const data = {lastName : lastName, firstName : firstName, email : Email, password: password}

        if (firstName !== '') {
            if (password === confirm_password) {
                axios.post('https://jsonplaceholder.typicode.com/posts', data, {withCredentials: true}) // add true route
                .then(response => {
                    this.setState({
                        lastName: '',
                        firstName: '',
                        Email: '',
                        password:'',
                        confirm_password:'',
                    })
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
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
            <div id="formOne">
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
            Email:'',
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
        const {Email} = this.state
        const {password} = this.state

        const data = {email : Email, password: password}
        axios.post('https://jsonplaceholder.typicode.com/posts', data, {withCredentials: true})
        .then(response => {
            this.setState({
                Email: '',
                password:'',
            })
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })    
    }

    render() {
        const {Email, password} = this.state
        return (
            <div id="formOne">
                <Form onSubmit={this.handleSubmit}>
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
        <section id="inscription" >
            <div className='container'>
                <div className='row'>
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
                    </div>
                    <Button id='SignIn' href="#inscription" variant="outline-light">Sign Up</Button>
                </div>
            </div>
        </section>
    )
}