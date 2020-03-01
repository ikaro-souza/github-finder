import React, { Component } from "react";
import axios from "axios";

import Navbar from "../Navbar";
import UserList from "../Users/UserList";

const styles = {
    position: "relative"
};

class App extends Component {
    state = {
        userList: {
            isFetching: false,
            users: []
        }
    };

    async componentDidMount() {
        // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)

        this.setState({
            userList: {
                isFetching: true
            }
        });

        const result = await axios.get(`https:/api.github.com/users?
            client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({
            userList: {
                isFetching: false,
                users: result.data
            }
        });
    }

    render() {
    return (
      <div className="App" >
        <Navbar />

        <main className="container" style={styles}>
          <UserList userList={this.state.userList}/>
        </main>
      </div>
    );
  }
}

export default App;
