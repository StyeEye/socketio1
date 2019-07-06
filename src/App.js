// import {subscibeToTimer} from './api';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

// constructor(props) {
//   super(props);
//   subscribeToTimer((err, timestamp) => this.setState({ 
//     timestamp 
//   }));
// }

// state = {
//   timestamp: 'no timestamp yet'
// };

class App extends Component {
  constructor(props) {
    super(props);


    this.state = {
      socket: io("http://localhost:8000"),
      message: "",
      messageLog: []
    }
  }

  componentDidMount = () => {
    const socket = this.state.socket;

    socket.on("serverMesasge", (message) => {
      console.log("New message: ", message);

      this.setState({
        messageLog: [...this.state.messageLog, message]
      })
    })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  sendMessage = (event) => {
    this.state.socket.emit("chatMessage", this.state.message);

    this.setState({
      message: ""
    })
  }

  render() {
    const messages = this.state.messageLog.map((e, i) => {
      return <p key={i}>{e}</p>;
    }).reverse();
    return (
      <div className="App">
        <div className="messages">
          {messages}
        </div>
        <div>
          <input type="text" name="message" value={this.state.message} onChange={this.onChange}/>
          <button onClick={this.sendMessage}>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;