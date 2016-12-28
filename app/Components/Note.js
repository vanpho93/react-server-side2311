import React, {Component} from 'react';

class Note extends Component {
  render(){
    return (
      <div>
        <p>{this.props.children}</p>
        <button>Xoa</button>
      </div>
    )
  }
}

module.exports = Note;
