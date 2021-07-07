import React from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';

function OpenOption(event) {

    var id = event.currentTarget.name
    var elmt = document.getElementById('options' + id)

    elmt.style.display = 'block'
}

function CloseOption(event) {

    var id = event.currentTarget.name
    var elmt = document.getElementById('options' + id)

    elmt.style.display = 'none'
}

function Delete(event) {
    var id = event.target.id
    console.log('in delete')
    axios.delete(`http://localhost:8080/api/delete/${id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      window.location = "/home"
    })
}

function Edit(event) {
    var id = event.target.id

    var stringParams = window.prompt('Which city do you want the weather forecast for ?')
    stringParams = stringParams.charAt(0).toUpperCase() + stringParams.substring(1).toLowerCase()
    var paramsData = {stringParams : {city : stringParams}}

    axios.put(`http://localhost:8080/api/update/${id}`, paramsData)
    .then(res => {
      console.log(res);
      console.log(res.data);
      window.location = "/home"
    })
}

export class WeatherWidgetTwo extends React.Component{

    constructor(){
        super();
        this.state = {
         serverResponse: undefined
        }
       }
       componentDidMount(){
          this.getData();
       }
       async getData(){
        const res = await axios.get('http://localhost:8080/api/weather/' + this.props.widgetInstanceId);
        const { data } = await res;
        this.setState({serverResponse: data})
        console.log(data, 'widget two data')
      }
    
    render () {

        if (this.state.serverResponse != undefined) {

            var icon = "http://openweathermap.org/img/wn/"+this.state.serverResponse.weather[0].icon+"@2x.png"

            return(
                    <Card id={"Card"+ this.props.keyUnique} style={{backgroundImage: 'http://openweathermap.org/img/wn/"+'+this.state.serverResponse.weather[0].icon+'+"@2x.png' }}>
                       <Card.Img id={'img' + this.props.keyUnique} className='img' variant="top" style={{display: 'none'}} />
                        <div className={"options"} id={ 'options' + this.props.keyUnique}>
                                <ListGroup>
                                    <ListGroup.Item action variant="secondary">
                                        Application
                                    </ListGroup.Item>
                                    <ListGroup.Item onClick={Delete} id={this.props.widgetInstanceId} action variant="secondary">
                                        Edit
                                    </ListGroup.Item>
                                    <ListGroup.Item onClick={Delete} id={this.props.widgetInstanceId} action variant="secondary">
                                        Delete
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                            <Card.Body>
                                <div className="row">
                                    <div className='col-12'>
                                    <Card.Text> <h1> {this.state.serverResponse.name}</h1></Card.Text>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-10'>
                                        <Card.Text> Longitude : {this.state.serverResponse.coord.lon} <br/> Latitude : {this.state.serverResponse.coord.lat}.</Card.Text>
                                        <Card.Text>Wind Speed :{this.state.serverResponse.wind.speed} • Degres : {this.state.serverResponse.wind.deg}</Card.Text>   
                                    </div>
                                    <div className="col-2">
                                        <button name={this.props.keyUnique} onClick={OpenOption} className="btn btn-light">
                                            <FontAwesomeIcon icon="arrow-up"/>
                                        </button>
                                        <button name={this.props.keyUnique} onClick={CloseOption} style={{display : 'block'}} className="btn btn-light">
                                            <FontAwesomeIcon icon="arrow-down"/>
                                        </button>
                                    </div>
                                </div>
                        </Card.Body>
                    </Card>
            )
        }
        return(
            <div>
                
            </div>
        )
    }
}