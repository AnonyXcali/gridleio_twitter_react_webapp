import React, { Component } from 'react';
import './App.css';
import HeaderFile from './components/HeaderComponent';
import HeartAnimLoader from './components/HeartAnim';
import NotificationSystem from 'react-notification-system';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      twitter_tweet_ids :[],
      screen_name: '',
      user_image :'',
      followers_count : 0,
      user_desc : '',
      tweet_combo : 0,
      _notificationSystem: null
    }

 this.nameChanged = this.nameChanged.bind(this);
  this.test = this.test.bind(this);
  this.loadtweetids = this.loadtweetids.bind(this);
  this.liketweets = this.liketweets.bind(this);
  this._addNotification = this._addNotification.bind(this);
  }

  _addNotification(status) {

  if(status === "success"){
    this._notificationSystem.addNotification({
      message: 'Liked!',
      level: 'success'
    });
  }else if( status === "error"){
    this._notificationSystem.addNotification({
      message: 'Error Occured',
      level: 'error'
    });
  }else if( status === "user_error"){
    this._notificationSystem.addNotification({
      message: 'User Does Not Exist!',
      level: 'error'
    });
  }else if( status === "server_error"){
    this._notificationSystem.addNotification({
      message: 'Server Error , try restarting the backend',
      level: 'error'
    });
  }


   }

   componentDidMount(){
    this._notificationSystem = this.refs.notificationSystem;
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
  .then(function(response) {
       if (!response.ok) {
         console.log('wtf');
          console.log(response.statusText);
       }
       return response;
   })
  .then(response => response.json())
  .then(json => {
    console.log(json);

    if(json[0].code === 34){
      this._addNotification("user_error");

    }else{


        this.setState(
          {
            twitter_tweet_ids: json,
            // followers_count : json[0].user.followers_count,
//            user_desc : json[0].user.description,


          }
        )

    this.liketweets(this.state.twitter_tweet_ids);
    }


}).catch(function(error) {
     alert("Server Error , Please Check your Connection");
    });

   }



 liketweets(twitterIDArray){

 let url = `http://127.0.0.1:3002/users/like?id=`;
 twitterIDArray.forEach((tweet,index) => {
   console.log(tweet.id_str);
   fetch(url+tweet.id_str)
   .then(response => response.json())
   .then(json => {
     console.log(json.favorited);
     if(json.favorited === true){
       this.setState({
         tweet_combo : this.state.tweet_combo + 1
       })
       this._addNotification("success");
     }

     if(json.favorited === undefined){
       this._addNotification("error");

     }

   })
   .then(err => {
     console.log(err);
   });
 })

 }




  render() {

    return (

    <div id="mainInputArea">
      <NotificationSystem ref="notificationSystem" />

      <HeaderFile/>
    <a rel="noopener noreferrer" target="_blank" href="https://github.com/AnonyXcali/gridleio_twitter_react_webapp" className="githubLink"><i className="fa fa-github-alt" aria-hidden="true"></i></a>
    <input className="style-2 inputBox solid" placeholder="Search a Twitter User" type='text' onChange={this.nameChanged} />
          <button
             className="btn striped-shadow blue"
             type="button"
             value="Click it!"
             onClick={this.loadtweetids.bind(this,`http://127.0.0.1:3002/users?screen_name=${this.state.screen_name}&count=10`)}
           >
           <HeartAnimLoader/>

          </button>
          <a rel="noopener noreferrer" className="userName" target="_blank" href={`https://twitter.com/${this.state.screen_name}`}>
<h1 >{`@${this.state.screen_name}`}<span className="atRate">_</span></h1>

          </a>
          <h1 className="statusNow">{this.state.tweet_combo} tweets liked!</h1>

    </div>

    );
  }





}

export default App;
