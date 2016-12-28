import React, {Component} from 'react';
import Note from './Note.js'
import NoteForm from './NoteForm.js';

class List extends React.Component{
  update(index, obj){
    this.state.mang[index] = obj;
    this.setState(this.state);
  }
  remove(index){
    this.state.mang.splice(index, 1);
    this.setState(this.state);
  }
  add(obj){
    this.state.mang.push(obj);
    this.setState(this.state);
  }
  constructor(props){
    super(props);
    this.state = {
      mang: []
    }
  }
  render(){
    return (
      <div>
        <NoteForm handleAdd={this.add.bind(this)}/>
        {this.state.mang.map((e, i) => <Note key={i} index={i}
        handleRemove={this.remove.bind(this)}
        handleSave={this.update.bind(this)} info={e}/>)}
      </div>
    );
  }
  componentDidMount(){
    $.post('/select', (rows) => {
      this.state.mang = rows;
      this.setState(this.state);
    })
  }
}

module.exports = List;
