import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



export class FormService extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            github : false,
            weather : false,
            youtube:false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();   
        const {github} = this.state
        const {weather}= this.state
        const {youtube} = this.state


        const data = {github : github, weather : weather, youtube : youtube}

        axios.post('https://jsonplaceholder.typicode.com/posts', data) // add true route
                .then(response => {
                    this.setState({
                        github: github,
                        youtube: youtube,
                        weather: weather,
                    })
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })

    }

    render() {

        return(
            <div className='container'>
                <Form onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <div className='col-sm'>
                            <Form.Group>
                            <Form.Label htmlFor='github'/>
                                <Form.Check type="checkbox" id='github' name='github' checked={this.state.github} onChange={this.handleChange} label="github"/>
                            </Form.Group>
                        </div>
                        <div className='col-sm'>
                            <Form.Label htmlFor='weather'/>
                            <Form.Group>
                                <Form.Check type="checkbox" id='weather' name='weather' checked={this.state.weather} onChange={this.handleChange} label="weather"/>
                            </Form.Group>
                        </div>
                        <div className='col-sm'>
                            <Form.Label htmlFor='youtube'/>
                            <Form.Group>
                                <Form.Check type="checkbox" id='youtube' name='youtube' checked={this.state.youtube} onChange={this.handleChange} label="youtube"/>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <Button style={{width : '100%'}} variant="light" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export const Service = () => {
    return (
        <section>
                <FormService/>
        </section>

    )
}