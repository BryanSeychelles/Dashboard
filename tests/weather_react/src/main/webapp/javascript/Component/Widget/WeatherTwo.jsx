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

function DeleteCard(event) {
    var id = event.target.name
    var elmt = document.getElementById(cards+id)
    elmt.style.display = "none";
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
        const res = await axios.get('http://localhost:8080/api/weather/weatherByCity/paris/fr');
        const { data } = await res;
        this.setState({serverResponse: data})
      }
    
    render () {

        if (this.state.serverResponse != undefined) {

            var icon = "http://openweathermap.org/img/wn/"+this.state.serverResponse.weather[0].icon+"@2x.png"

            var weather = this.state.serverResponse
            console.log(weather)
            return(
                    <Card id={"Card"+ this.state.serverResponse.id}>
                        <Card.Img id={'img' + this.state.serverResponse.id} className='img' variant="top" src={icon} />
                        <div className={"options"} id={ 'options' + this.state.serverResponse.id}>
                                <ListGroup>
                                    <ListGroup.Item action variant="secondary">
                                        Application
                                    </ListGroup.Item>
                                    <ListGroup.Item action variant="secondary">
                                        Delete
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                            <Card.Body>
                                <div className="row">
                                    <div className='col-10'>
                                        <Card.Text> Longitude : {this.state.serverResponse.coord.lon} • Latitude : {this.state.serverResponse.coord.lat}.</Card.Text>
                                        <Card.Text>Wind Speed :{this.state.serverResponse.wind.speed} • Degres : {this.state.serverResponse.wind.deg}</Card.Text>   
                                    </div>
                                    <div className="col-2">
                                        <button name={this.state.serverResponse.id} onClick={OpenOption} className="btn btn-light">
                                            <FontAwesomeIcon icon="arrow-up"/>
                                        </button>
                                        <button name={this.state.serverResponse.id} onClick={CloseOption} style={{display : 'block'}} className="btn btn-light">
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
                Waiting...
            </div>
        )
    }
}