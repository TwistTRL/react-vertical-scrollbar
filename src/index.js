import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

import VerticalScrollbar from "./lib";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {width:10,height:400,color:"green",
                  realHeight:100,realRange:40,scrollStart:0};
  }
  
  render(){
    let {width,height,color,realHeight,realRange,scrollStart} = this.state;
    return (
      <Fragment>
        <div>
          width:
          <input  type="text"
                  value={width}
                  onChange={(ev)=>{
                              this.setState({width:Number.parseInt(ev.target.value) || 0});
                            }}
                  />
        </div>
        <div>
          height:
          <input  type="text"
                  value={height}
                  onChange={(ev)=>{
                              this.setState({height:Number.parseInt(ev.target.value) || 0});
                            }}
                  />
        </div>
        <div>
          color:
          <input  type="text"
                  value={color}
                  onChange={(ev)=>{
                              this.setState({color:ev.target.value});
                            }}
                  />
        </div>
        <div>
          realHeight:
          <input  type="range" min="100" max="2000" step="1"
                  value={realHeight}
                  onChange={(ev)=>{
                              this.setState({realHeight:Number.parseInt(ev.target.value)});
                            }}
                  />
        </div>
        <div>
          realRange:
          <input  type="range" min="10" max="1000" step="1"
                  value={realRange}
                  onChange={(ev)=>{
                              this.setState({realRange:Number.parseInt(ev.target.value)});
                            }}
                  />
        </div>
        <div>
          scrollStart:
          <input  type="range" min="0" max="2000" step="1"
                  value={scrollStart}
                  onChange={(ev)=>{
                              this.setState({scrollStart:Number.parseInt(ev.target.value)});
                            }}
                  />
        </div>
        <VerticalScrollbar  {...this.state}
                            updateScrollStartHandler={(scrollStart)=>this.setState({scrollStart})}
                            />
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
