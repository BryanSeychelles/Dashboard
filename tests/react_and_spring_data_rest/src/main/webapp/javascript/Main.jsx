import React, { Component } from "react";
import ReactDOM from 'react-dom';
import FriendList from './FriendList';
import '../css/Main.css';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: []
        }
    }

    componentDidMount() {
        this.fetchFriends();
    }

    fetchFriends() {
        fetch("/api/friends")
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({
                        friends: response
                    });
                },
                (error) => {
                    alert(error);
                }
            )
    }

    handleSubmit(evt) {
        evt.preventDefault();
        fetch("/api/friends", {
            method: "POST",
            body: new FormData(evt.target)
        }).then((response) => {
                if (response.ok) {
                    this.fetchFriends();
                } else {
                    alert("Failed to create friend");
                }
            }
        ).catch((error) => {
            // Network errors
            alert(error);
        });
        evt.target.reset();
        return false;
    }

    render() {
        return (
            <div id="main">
                <h1>My Best Friends</h1>
                <FriendList friends={this.state.friends}/>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input id="name" name="name" type="text" placeholder="Enter name"/>
                    <button type='submit'>Create</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('react-mountpoint')
);
