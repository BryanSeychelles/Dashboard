import React from 'react'
import { useState , useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button'
import { WeatherWidgetOne } from '../Widget/WeatherOne'
import { WeatherWidgetTwo } from '../Widget/WeatherTwo'
import { YoutubeWidgetOne } from '../Widget/YoutubeOne'
import { YoutubeWidgetTwo } from '../Widget/YoutubeTwo'
import { YoutubeWidgetThree } from '../Widget/YoutubeThree'
import { RedditWidgetOne } from '../Widget/RedditOne'
import axios from 'axios'
import { Component } from 'react';

const card = []
const paramsCard = [
    {id: 1, service : "Youtube" , img : "http://via.placeholder.com/640x360", widgetName : "youtube_1", name : "Youtube Channel Statistics", description : "Display the number of subscribers for a given channel"},
    {id: 2, service : "Youtube" , img : "http://via.placeholder.com/640x360", widgetName : "youtube_2", name : "Youtube Video Statistics", description : "Display the number of views for a given video"},
    {id: 3 , service : "Youtube" , img : "http://via.placeholder.com/640x360", widgetName : "youtube_3", name : "Youtube Video Comments", description : "Display the last n comments for a given video"},
    {id: 4 , service : "Reddit" , img : "http://via.placeholder.com/640x360", widgetName : "reddit_1", name : "Reddit subreddit post", description : "Display the last n posts for a given subreddit"},
    {id: 5, service : "weather" , img : "http://via.placeholder.com/640x360", widgetName : "weather_1", name : "Météo", description : "Display temperature for a given city"},
    {id: 6, service : "weather" , img : "http://via.placeholder.com/640x360", widgetName : "weather_2", name : "Precision", description : "Display position and wind for a given city"},
]

function OpenAddWidget() {
    var div = document.getElementById('addwidget');
    var open = document.getElementById('buttonOpen');
    var close = document.getElementById('buttonClose');

    div.style.display = 'block'
    close.style.display = 'block'
    open.style.display = 'none'

}

function CloseAddWidget() {
    var div = document.getElementById('addwidget');
    var open = document.getElementById('buttonOpen');
    var close = document.getElementById('buttonClose');

    div.style.display = 'none'
    close.style.display = 'none'
    open.style.display = 'block'

}

const ParamsWidget = () => {
    
    function AddCard(event) {
        var key = event.target.name
        var paramsData = {};
        console.log(key)

        switch (key) {
            case "youtube_1":
                var stringParams = window.prompt('Which channel do you want ?')
                paramsData = {description : paramsCard[0].description, serviceName : paramsCard[0].service, stringParams : {channel_name : stringParams}, widgetName : paramsCard[0].widgetName, intParams : null}
                break;
            case "youtube_2":
                var stringParams = window.prompt('What video do you want ?')
                paramsData = {description : paramsCard[1].description, serviceName : paramsCard[1].service, stringParams : {video_name : stringParams}, widgetName : paramsCard[1].widgetName, intParams : null}
                break;
            case "youtube_3":
                var stringParams = window.prompt('What video do you want ?')
                var intParams = window.prompt('How many comments do you want to display?')
                intParams = Number(intParams)            
                paramsData = {description : paramsCard[2].description, serviceName : paramsCard[2].service, stringParams : {video_name : stringParams}, intParams : {number_of_comments : intParams}, widgetName : paramsCard[2].widgetName}
                break;
            case "reddit_1":
                var stringParams = window.prompt('What subreddit do you want to look at ? (NAME MUST BE EXACT)')
                var intParams = window.prompt('How many posts max ?')
                intParams = Number(intParams)
                paramsData = {description : paramsCard[3].description, serviceName : paramsCard[3].service, stringParams : {subreddit_name : stringParams}, intParams : {number_of_posts : intParams}, widgetName : paramsCard[3].widgetName}
                break;
            case "weather_1":
                var stringParams = window.prompt('Which city do you want the weather forecast for ?')
                stringParams = stringParams.charAt(0).toUpperCase() + stringParams.substring(1).toLowerCase()
                paramsData = {widgetName : paramsCard[4].widgetName, serviceName : paramsCard[4].service, description : paramsCard[4].description, stringParams : {city : stringParams}, intParams : null}
                break;
            case "weather_2":
                var stringParams = window.prompt('Which city would you like more information from?')
                stringParams = stringParams.charAt(0).toUpperCase() + stringParams.substring(1).toLowerCase()
                paramsData = {description : paramsCard[5].description, serviceName : paramsCard[5].service, stringParams : {city : stringParams}, widgetName : paramsCard[5].widgetName, intParams : null}
                break;
            default:
                break;
        }
        axios.post('http://localhost:8080/api/create', paramsData, {withCredentials: true}) 
        .then(response => {
            console.log(response.data)
            window.location = "/home"
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div id='test' className="container md-4">
            <div id="containCard">
            {paramsCard.map(item =>(
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.img} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <div className='row'>
                            <div className='col-sm'>
                                <Button onClick={AddCard} name={item.widgetName} variant="light">+</Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    </div>
    )
}

var col = {
    [1]: {
      items: card
    },
    [2]: {
      items: []
    },
    [3]: {
      items: []
    },
  };


  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }  
  };

export const DashBoard = () => {

    const [columns, setColumns] = useState(col);
    const [data, setData]= useState([]);

    const fetchData = async () => {
        const result = await axios.get('http://localhost:8080/api/widgetInstances', {withCredentials: true})
        setData(result.data)
        console.log(result.data)
    }
/* 
    const testYoutube1 = async () => {
        const result = await axios.get('http://localhost:8080/api/youtube/youtube_1/4', {withCredentials: true})
        console.log("YOUTUBE 1", result.data)
    }
 */
/*     const testYoutube2 = async () => {
        const result = await axios.get('http://localhost:8080/api/youtube/youtube_2/5', {withCredentials: true})
        console.log("YOUTUBE 2", result.data)
    } */

/*     const testYoutube3 = async () => {
        const result = await axios.get('http://localhost:8080/api/youtube/youtube_3/6', {withCredentials: true})
        console.log("YOUTUBE 3", result.data)
    } */

    const testReddit1 = async () => {
        const result = await axios.get('http://localhost:8080/api/reddit/reddit_1/7', {withCredentials: true})
        console.log("REDDIT 1", result.data)
    }

    useEffect(() => {
        fetchData()
/*             testYoutube1()
            testYoutube2()
            testYoutube3()
            testReddit1() */
    }, [])

    useEffect(() => {
        data.map((item, index) => {
            switch (item.widgetName) {
                case 'weather_1':
                    var instance = {id: item.id, uid: 'Weather1.' + index , div: <WeatherWidgetOne widgetInstanceId= {item.id} keyUnique={index}/> }
                    card.push(instance)
                    break;
                case 'weather_2':
                    var instance = {id: item.id, uid: 'Weather2.' + index , div: <WeatherWidgetTwo widgetInstanceId= {item.id} keyUnique={index}/> }
                    card.push(instance)
                    break;
                case 'youtube_1':
                    var instance = {id: item.id, uid: 'Youtube1.' + index , div: <YoutubeWidgetOne widgetInstanceId= {item.id} keyUnique={index} channelName={item.stringParams.channel_name}/> }
                    card.push(instance)
                    break;
                case 'youtube_2':
                    var instance = {id: item.id, uid: 'Youtube2.' + index , div: <YoutubeWidgetTwo widgetInstanceId= {item.id} keyUnique={index} videoName={item.stringParams.video_name}/> }
                    card.push(instance)
                    break;
                case 'youtube_3':
                    var instance = {id: item.id, uid: 'Youtube3.' + index , div: <YoutubeWidgetThree widgetInstanceId= {item.id} keyUnique={index} videoName={item.stringParams.video_name}/> }
                    card.push(instance)
                    break;
                case 'reddit_1':
                    var instance = {id: item.id, uid: 'Reddit1.' + index , div: <RedditWidgetOne widgetInstanceId= {item.id} keyUnique={index} subRedditName={item.stringParams.subreddit_name}/> }
                    card.push(instance)
                    break;
                default:
                    break;
            }
        })
        var col1 = []
        var col2 = []
        var col3 = []
        card.forEach((item, index) => {
            if (index % 3 == 0) {col1.push(item)}
            else if (index % 3 == 1) {col2.push(item)}
            else if (index % 3 == 2) {col3.push(item)}
        })
        setColumns({
            [1]: {
              items: col1
            },
            [2]: {
              items: col2
            },
            [3]: {
              items: col3
            },
        })
    }, [data])

    return(
        <section className="container">
            <div id="addwidget" className="row">
                <ParamsWidget/>
            </div>
            <div className="row" style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <div className="container md-4">
                    <Button id='buttonOpen' onClick={OpenAddWidget} style={{width : '100%'}} variant="light" type="submit">
                        +
                    </Button>
                    <Button id='buttonClose' onClick={CloseAddWidget} style={{width : '100%'}} variant="light" type="submit">
                        close
                    </Button>
                </div>
               <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([columnId, column], index) => (
                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided, snapshot) => {
                                return (
                                    <div
                                        className="col-sm" key={columnId}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{margin : 8}}
                                    >
                                        {column.items.map((item, index) => {
                                            return (
                                                <Draggable
                                                    key={item.uid}
                                                    draggableId={item.uid}
                                                    index={index}
                                                    column={columnId}
                                                >
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div
                                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                            >
                                                                {item.div}
                                                            </div>
                                                        );
                                                    }}
                                                </Draggable>
                                            );
                                            })}
                                        {provided.placeholder}
                                    </div>
                                );
                            }}
                        </Droppable>                  
                    ))}
                </DragDropContext>
            </div>
        </section>
    )
}
