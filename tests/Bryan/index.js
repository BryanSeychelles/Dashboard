import { React } from 'react';
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListGroup from 'react-bootstrap/ListGroup'

var edit = 'edit';
var closer = 'closer';
var cards = 'Card';

const card = [ 
    {id: 1,name : "Youtube" , img : "http://via.placeholder.com/640x360" },
    {id: 2,name : "Twitch" , img : "http://via.placeholder.com/640x360" },
    {id: 3,name : "Twitter" , img : "http://via.placeholder.com/640x360" },
    {id: 4,name : "Google" , img : "http://via.placeholder.com/640x360" },
    {id: 5,name : "Youtube" , img : "http://via.placeholder.com/640x360" },
    {id: 6,name : "Facebook" , img : "http://via.placeholder.com/640x360" },
    {id: 7,name : "Deezer" , img : "http://via.placeholder.com/640x360" },
    {id: 8,name : "AppleMusic" , img : "http://via.placeholder.com/640x360" },
    {id: 9,name : "Linkedin" , img : "http://via.placeholder.com/640x360" },
]


function OpenOption(event) {

    var id = event.currentTarget.name
    var elmt = document.getElementById(id)

    elmt.style.display = 'block'
}



function CloseOption(event) {

    var id = event.currentTarget.name
    var elmt = document.getElementById(id)
    var edit = document.getElementById('edit')

    elmt.style.display = 'none'
    edit.style.display = 'none'
}

function OpenEdit(event) {
    var id = event.currentTarget.name
    var div = edit+id
    var elmt = document.getElementsByClassName(div)
    elmt[0].style.display = 'block'
}

function CloseEdit(event) {
    var id = event.currentTarget.id
    var elmt = document.getElementById(id)
    var panel = elmt.parentNode;
    panel.parentNode.style.display = 'none'
    var lastC = id.charAt(id.length-1)
    var key = event.currentTarget.name

    switch (key) {
        case 'small':
            var item = document.getElementById(cards+lastC)
            console.log('enter in small', item)
            item.style.gridColumn = 'auto'
            item.style.gridRow = 'auto'
            break;
        case 'medium':
            var item = document.getElementById(cards+lastC)
            var itemImg = document.getElementById("img"+lastC)
            console.log('enter in medium', item)
            item.style.gridRow = '1 / 3'
            itemImg.style.height = '80%'
            break;
        case 'tall':
            var item = document.getElementById(cards+lastC)
            console.log('enter in tall' , item , itemImg)
            item.style.gridColumn = lastC + '/ 3'
            item.style.gridRow = lastC + '/ 3'
            break;
    
        default:
            break;
    }
}

console.log(document.getElementsByClassName('options').parentNode)

export const DashBoard = () => {
    return(
        <section className="container">
            <div className="row">
                <div className="container md-4">
                    <div id="containCard">
                        {card.map(item => (
                            <Card id={"Card"+item.id}>
                                <Card.Img id={'img' + item.id} className='img' variant="top" src={item.img} />
                                <div className={"options"} id={item.id}>
                                    <div className={edit + item.id} id="edit">
                                        <ListGroup>
                                            <ListGroup.Item id={closer + item.id} name={'small'} onClick={CloseEdit} action variant="info">
                                                small
                                            </ListGroup.Item>
                                            <ListGroup.Item id={closer + item.id} name={'medium'} onClick={CloseEdit} action variant="info">
                                                medium
                                            </ListGroup.Item>
                                            <ListGroup.Item id={closer + item.id} name={'tall'} onClick={CloseEdit} action variant="info">
                                                tall
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                    <ListGroup>
                                            <ListGroup.Item action variant="secondary">
                                                Application
                                            </ListGroup.Item>
                                            <ListGroup.Item onClick={OpenEdit} name={item.id} action variant="secondary">
                                                Edit
                                            </ListGroup.Item>
                                            <ListGroup.Item action variant="secondary">
                                                Delete
                                            </ListGroup.Item>
                                    </ListGroup>
                                </div>
                                <Card.Body>
                                <Card.Text>
                                <div className="row">
                                    <div className='col-8'>
                                        {item.name}
                                    </div>
                                    <div className="col-2">
                                        <button name={item.id} onClick={OpenOption} className="btn btn-light">
                                            <FontAwesomeIcon icon="arrow-up"/>
                                        </button>
                                    </div>
                                  <div className="col-2">
                                        <button name={item.id} onClick={CloseOption} style={{display : 'block'}} className="btn btn-light">
                                            <FontAwesomeIcon icon="arrow-down"/>
                                        </button>
                                    </div> 
                                </div>
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
