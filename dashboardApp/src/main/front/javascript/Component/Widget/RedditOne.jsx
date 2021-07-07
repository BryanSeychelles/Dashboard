import React from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';
import {Link} from 'react-router-dom';

var edit = 'edit';
var closer = 'closer';
var cards = 'Card';

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

    axios.delete(`http://localhost:8080/api/delete/${id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      window.location = "/home"
    })
}

function Edit(event) {
    var id = event.target.id

    var stringParams = window.prompt('What subreddit do you want to look at ? (NAME MUST BE EXACT)')
    var intParams = window.prompt('How many posts max ?')
    intParams = Number(intParams)
    var paramsData = {stringParams : {subreddit_name : stringParams}, intParams : {number_of_posts : intParams}}

    axios.put(`http://localhost:8080/api/update/${id}`, paramsData)
    .then(res => {
      console.log(res);
      console.log(res.data);
      window.location = "/home"
    })
}

function View(event) {
    var link = event.target.name 
    console.log(link)
    window.location.href = link
}

export class RedditWidgetOne extends React.Component{

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
        const res = await axios.get('http://localhost:8080/api/reddit/reddit_1/' + this.props.widgetInstanceId);
        const { data } = await res;
        this.setState({serverResponse: data})
        console.log(data)
      }
    
    render () {

        if (this.state.serverResponse != undefined) {

            return(
                <Card id={"Card"+ this.props.keyUnique}>
                <Card.Img id={'img' + this.props.keyUnique} className='img' variant="top" style={{display : 'none'}} />
                <div className={"options"} id={ 'options' + this.props.keyUnique}>
                        <ListGroup>
                            <ListGroup.Item action variant="secondary">
                                Application
                            </ListGroup.Item>
                            <ListGroup.Item onClick={Edit} id={this.props.widgetInstanceId} action variant="secondary">
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
                            <h4>{this.props.subRedditName}</h4>
                            <ListGroup>
                            {this.state.serverResponse.data.children.map(item => (
                                <ListGroup.Item onClick={View} name={item.data.url} action variant="secondary">
                                    <h4>{item.data.author}</h4>
                                    {item.data.title}
                                </ListGroup.Item>
                            ))}
                            </ListGroup>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-6">
                                <button name={this.props.keyUnique} onClick={OpenOption} className="btn btn-light">
                                    <FontAwesomeIcon icon="arrow-up"/>
                                </button>
                            </div>
                            <div className="col-6">
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

