import React, {Component} from 'react';
import Note from './Note.js'
import NoteForm from './NoteForm.js';

class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      mang: []
    }
  }
  render(){
    return (
      <div>
        <NoteForm/>
        {this.state.mang.map((e, i) => <Note key={i} index={i}
        handleSave={this.update.bind(this)} info={e}/>)}
      </div>
    );
  }
  componentDidMount(){
    socket = io();
    socket.on('SERVER_SEND_LIST', rows => {
      this.state.mang = rows;
      this.setState(this.state);
    });
    socket.on('SERVER_CONFIRM_ADD', row => {
      this.state.mang.push(row);
      this.setState(this.state);
    });
    socket.on('SERVER_CONFIRM_REMOVE', id => {
      this.state.mang = this.state.mang.filter(e => e.id != id);
      this.setState(this.state);
    });
    socket.on('SERVER_CONFIRM_UPDATE', info => {
      var index = this.state.mang.findIndex(e => e.id == info.id);
      this.state.mang[index].content = info.note;
      this.state.mang[index].subject = info.sub;
      this.setState(this.state);
    });
  }
}

module.exports = List;
