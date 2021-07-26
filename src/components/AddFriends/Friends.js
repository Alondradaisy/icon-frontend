import React, { Component } from "react";
import FriendsList from "./FriendsList";

export class Friends extends Component {
  render() {
    return (
      <div className="update-container">
        <table id="friends">
          <thead>
            <tr id="tr">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Update Info</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.friendArray.map((friend) => {
              return (
                <FriendsList
                  handleUpdatedFriendData={this.props.handleUpdatedFriendData}
                  handleDeleteByFriend={this.props.handleDeleteByFriend}
                  key={friend._id}
                  friend={friend}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Friends;
