import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';






class App extends Component {


  constructor(props){
    super(props);

    this.state = {
      twitter_tweet_ids :[],
      screen_name: '',
      users: []
    }

 this.nameChanged = this.nameChanged.bind(this);
  this.test = this.test.bind(this);
  this.loadtweetids = this.loadtweetids.bind(this);

  }


  nameChanged(e) {
    console.log('ok');
    this.setState({ screen_name: e.target.value });

      }

    test(){
      console.log(this.state.screen_name);
    }


  loadtweetids(url){

  fetch(url)
  .then(response => response.json())
  .then(json => {
    console.log(json);
  })
  .then(err => {
    console.log(err);
  });

   }

  // componentDidMount() {
  //    fetch('/users')
  //      .then(res => res.json())
  //      .then(users => this.setState({ users }));
  //  }


  render() {

    return (
    <div>
     <p>Twitter App</p>
      <input type='text' onChange={this.nameChanged} />
        <input
           type="button"
           value="Click it!"
           onClick={this.loadtweetids.bind(this,`http://127.0.0.1:3002/users?screen_name=${this.state.screen_name}&count=10`)}
         />
      <h1>{this.state.screen_name}</h1>
    </div>
    // <div className="App">
    //    <h1>Users</h1>
    //    {this.state.users.map(user =>
    //      <div key={user.id}>{user.username}</div>
    //    )}
    //  </div>
    );
  }
}

export default App;
