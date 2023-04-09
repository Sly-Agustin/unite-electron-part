import React, { Component } from "react";
//import '../index.css'

class Menu extends Component {
 /*constructor(props){
    super(props);
    
  }*/

  // Runs after the constructor, before the components render
  componentWillUnmount(){
    console.log('will mount')
  }

  // Is called after the component has finished rendering, changes here will trigger a re-render
  componentDidMount(){
    console.log('mounted')
  }

  state = {
    hideVar: false
  }

  toggle = () => {
    this.setState({
      hideVar: !this.state.hideVar 
    })
  }

  render() {
    return (
      <div className="">
        <h1>Main menu test</h1>
        {!this.state.hideVar && <p>If you press the button below im gonna hide</p>}
        <button onClick={this.toggle}>hide/show</button>
        <Test toggle={this.state.hideVar} />
      </div>
    )
  }
}

class Test extends Component {

  render() {
    const { toggle } = this.props
    console.log(toggle)
    return(
      <div>
        <p>test component</p>      
      </div>
    )
  }
}

export default Menu;