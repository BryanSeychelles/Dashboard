import React from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';

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

    var stringParams = window.prompt('What video do you want ?')
    var paramsData = {stringParams : {video_name : stringParams}}

    axios.put(`http://localhost:8080/api/update/${id}`, paramsData)
    .then(res => {
        console.log(res);
        console.log(res.data);
        window.location = "/home"
    })
}

export class YoutubeWidgetTwo extends React.Component{

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
        const res = await axios.get('http://localhost:8080/api/youtube/youtube_2/' + this.props.widgetInstanceId);
        const { data } = await res;
        this.setState({serverResponse: data})
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
                                    <div className='col-8'>
                                        <h4>{this.props.videoName}</h4>
                                        <Card.Text>Comments : {this.state.serverResponse.items[0].statistics.commentCount}</Card.Text>
                                        <Card.Text>Dislikes : {this.state.serverResponse.items[0].statistics.dislikeCount}</Card.Text>   
                                        <Card.Text>Favorites : {this.state.serverResponse.items[0].statistics.favoriteCount}</Card.Text>
                                        <Card.Text>Likes : {this.state.serverResponse.items[0].statistics.likeCount}</Card.Text>
                                        <Card.Text>Views : {this.state.serverResponse.items[0].statistics.viewCount}</Card.Text>
                                    </div>
                                    <div className="col-2">
                                        <button name={this.props.keyUnique} onClick={OpenOption} className="btn btn-light">
                                            <FontAwesomeIcon icon="arrow-up"/>
                                        </button>
                                    </div>
                                    <div className="col-2">
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

