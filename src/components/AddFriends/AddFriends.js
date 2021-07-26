import React, { Component } from ("react");
import { toast } from "react-toastify";

import Friends from "./Friends";

import Axios from "../utils/Axios";

export class AddFriends extends Component {
    state = {
        friendFirstName: "",
        friendLastName: "",
        friendEmail: "",
        friendArray: [],
    };

    componentDidMount() {
        this.handleGetAllFriends();
    }

    handleOnFriendChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleFriendSubmit = async (event) => {
        event.preventDefault();
        try {
            let addedFriends = await Axios.post("/api/friends/add-friends", {
                friendFirstName: this.state.friendFirstName,
                friendLastName: this.state.friendLastName,
                friendEmail: this.state.friendEmail,
            });

            this.setState({
                friendFirstName: "",
                friendLastName: "",
                friendEmail: "",
                friendArray: [...this.state.friendArray, addedFriends.data],
            });

            toast.success("Friend Created!");
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.payload);
        }
    };

    handleGetAllFriends = async () => {
        try {
            let getAllFriends = await Axios.get("/api-friends/get-all-friends");

            this.setState({
                friendArray: getAllFriends.data.friends,
            });
        } catch (e) {
            toast.error(e.response.data.payload);
        }
    };

    handleUpdatedFriendData = (user) => {
        let updatedFriendArr = this.state.friendArray.map((friend) => {
            if(friends._id === user._id) {
                friends = user;
            }
            return friends;
        });
    };

    handleDeleteByFriend = (user) => {
        let newArr = this.state.friendArray.filter(
            (friends) => friends._id !== user._id
        );
    };

    render() {
        return (
    
            <div className="update-container">
                <h2>Add Friends</h2>
                <form onSubmit={this.handleFriendSubmit}>
                    <div className="input-div">
                        <input
                            value={this.state.friendFirstName}
                            name="friendFirstName"
                            placeholder="First Name"
                            onChange={this.handleFriendSubmit}
                        />
                    </div>

                    <div className="input-div">
                        <input
                            value={this.state.friendLastName}
                            name="friendLastName"
                            placeholder="Last Name"
                            onChange={this.state.friendLastName}
                        />
                    </div>

                    <div className="input-div">
                        <input
                            value={this.state.friendEmail}
                            name="friendEmail"
                            placeholder="Email"
                            onChange={this.state.friendEmail}
                        />
                    </div>

                    <div className="button-div">
                        <button>Add Friend</button>
                    </div>
                </form>
            </div>
            <Friend 
                friendArray={this.state.friendArray}
                handleUpdatedFriendData={this.handleUpdatedFriendData}
                handleDeleteByFriend={this.handleDeleteByFriend}
            />
        );
    }
}

export default AddFriends;