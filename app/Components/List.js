import React, {Component} from 'react';
import Note from './Note.js'
class List extends Component {
  constructor(props){
    super(props);
    this.state = {mang: ['Android', 'iOS', 'NodeJS']};
  }
  render(){
    return (
      <div>
        {this.state.mang.map((e, i) => <Note key={i}>{e}</Note>)}
      </div>
    )
  }
}

module.exports = List;
