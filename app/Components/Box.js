import React, {Component} from 'react';

class Box extends Component {
  constructor(props){
    super(props);
    this.state = {num: 0}
  }
  add(){
    this.setState({num : this.state.num + 1})
  }
  render(){
    return <button onClick={this.add.bind(this)}>{this.state.num}</button>
  }
}

module.exports = Box;
