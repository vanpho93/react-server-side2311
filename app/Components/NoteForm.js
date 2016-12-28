import React from 'react';

class NoteForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {isAdding: false}
  }
  show(){
    this.setState({isAdding: true})
  }
  add(){
    // var {handleAdd} = this.props;
    // handleAdd(this.refs.txt.value);
    // this.refs.txt.value = '';
    var sub = this.refs.sub.value;
    var note = this.refs.note.value;
    $.post('/insert', {sub, note}, data => {
      this.props.handleAdd(data);
    });
    this.setState({isAdding: false})
  }
  render(){
    var xhtml = this.state.isAdding?
    <div>
      <input type="text" ref="sub" placeholder="Enter your subject"/>
      <br/><br/>
      <input type="text" ref="note" placeholder="Enter your note"/>
      <br/><br/>
      <button onClick={this.add.bind(this)}>Add</button>
    </div>:
    <button onClick={this.show.bind(this)}>Show</button>
    return (xhtml);
  }
}

module.exports = NoteForm;
