import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderFile from './components/HeaderComponent';
import InputAreaDiv from './components/InputArea';
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
      error_status:'None',
      status_clr :'green',
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
  .then(response => response.json())
  .then(json => {
    console.log(json);

    var image = json[0].user.profile_image_url_https;
    var modImg = image.replace("_normal","");


      this.setState(
        {
          twitter_tweet_ids: json,
          user_image : modImg,
          followers_count : json[0].user.followers_count,
          user_desc : json[0].user.description,


        }
      )

  this.liketweets(this.state.twitter_tweet_ids);
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
    <input className="style-2 inputBox solid" placeholder="Search a Twitter User" type='text' onChange={this.nameChanged} />
          <button
             className="btn striped-shadow blue"
             type="button"
             value="Click it!"
             onClick={this.loadtweetids.bind(this,`http://127.0.0.1:3002/users?screen_name=${this.state.screen_name}&count=10`)}
           >
           <HeartAnimLoader/>

          </button>
          <a className="userName" href={`https://twitter.com/${this.state.screen_name}`}>
<h1 >{`@${this.state.screen_name}`}<span className="atRate">_</span></h1>

          </a>
          <h1 className="statusNow">{this.state.tweet_combo} tweets liked!</h1>

    </div>

    );
  }





}

export default App;
