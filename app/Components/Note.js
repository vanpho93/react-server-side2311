import React, {Component} from 'react';

class Note extends React.Component{
  constructor(props){
    super(props);
    this.state = {isUpdating: false}
  }
  save(){
    var {handleSave, index} = this.props;
    //handleSave(index, this.refs.txt.value);
    var content = this.refs.note.value;
    var sub = this.refs.sub.value;
    var id = this.props.info.id;
    $.post('/update', {id, content, sub}, data => {
      //Xu ly loi neu co
      console.log(data);
      handleSave(index, data);
    });
    this.setState({isUpdating: false});
  }
  cancel(){
    this.setState({isUpdating: false});
  }
  update(){
    this.setState({isUpdating: true});
  }
  remove(){
    var {handleRemove, index} = this.props;
    var {id} = this.props.info;
    $.post('/remove', {id}, data => {
      if(data == 'Thanh cong'){
        handleRemove(index);
      }else{
        alert('Loi: ' + data)
      }
    });
    //handleRemove(index);
  }
  render(){
    var xhtml = this.state.isUpdating?
    <div>
      <h1>{this.props.info.subject}</h1>
      <input type="text" defaultValue={this.props.info.subject} ref="sub"/>
      <br/><br/>
      <input type="text" defaultValue={this.props.info.content} ref="note"/>
      <br/><br/>
      <button onClick={this.save.bind(this)}>Luu</button>
      <button onClick={this.cancel.bind(this)}>Huy</button>
    </div>:
    <div>
      <h1>{this.props.info.subject}</h1>
      <p>{this.props.info.content}</p>
      <button onClick={this.remove.bind(this)}>Xoa</button>
      <button onClick={this.update.bind(this)}>Sua</button>
    </div>
    return (xhtml);
  }
}

module.exports = Note;
