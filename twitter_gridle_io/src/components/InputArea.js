import React from 'react';
import App from '../App';

const InputAreaDiv= () => {
  return (
    <div className="inputArena">
    <input type='text' onChange={this.nameChanged} />
      <input
         type="button"
         value="Click it!"
         onClick={this.loadtweetids.bind(this,`http://127.0.0.1:3002/users?screen_name=${this.state.screen_name}&count=10`)}
       />
  </div>
  )

}




export default InputAreaDiv;
