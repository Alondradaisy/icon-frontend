import React, { Component } from "react";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";

export class FriendsList extends Component {
  state = {
    toggle: false,
    firstName: "",
    lastName: "",
    friendEmail: "",
  };

  handleToggle = () => {
      this.setState((prevState) => {
          return {
            toggle: !prevState.toggle,
          };
      });
  };

  handleUpdateFriendChange = (event) => {
      this.setState({
          [event.target.name]: event.target.value,
      });
  };

  handleUpdateClick = async (id) => {
      try {
        let updatedFriend = await Axios.put(
            `/api/friend/update-friend-by-id/${id}`,
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                friendEmail: this.state.friendEmail,
            }
        );
        this.props.handleUpdateFriendData(updatedFriend.data.payload);
        this.handleToggle();
      } catch (e) {
          toast.error(e.response.data.payload);
      }
  };

  handleDeleteClick = async (id) => {
      try {
        let deletedFriend = await Axios.delete(`/api/friend/delete-friend-by-id/${id}`);
        console.log(deletedFriend);

        this.props.handleDeleteByFriend(deletedFriend.data.payload);
      } catch (e) {
        toast.error(e.response.data.payload);
      }
  };

  render() {

    const { friends } = this.props;
    const { toggle } = this.state;
    return (
        <tr key={friends._id}>
            {toggle ? (
                <>
                <td>
                    <input 
                        name="firstName"
                        onChange={this.handleUpdateFriendChange}
                        defaultValue={friends.firstName}
                    />
                </td>

                <td>
                    <input 
                        name="lastName"
                        onChange={this.handleUpdateFriendChange}
                        defaultValue={friends.lastName}
                    />
                </td>

                <td>
                    <input 
                        name="friendEmail"
                        onChange={this.handleUpdateFriendChange}
                        defaultValue={friends.friendEmail}
                    />
                </td>
                </>
            )}
            {toggle ? (
                <td onClick={() => this.handleUpdateClick(friends._id)}>Update</td>
            ) : (
                <td onClick={() => this.handleToggle}>Update Info</td>
            )}
            <td onClick={() => this.handleDeleteClick(friends._id)}>Delete</td>
        </tr>
    );
  }
}

export default FriendsList;
