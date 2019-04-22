import React, {PureComponent,Fragment} from "react";
import PropTypes from 'prop-types';
import DragOverlay from "./DragOverlay";
import "./VerticalScrollbar.css";

const MODE_HOVERING = "hovering";
const MODE_GROVE_DRAGGING = "grove_dragging";
const MODE_THUMB_DRAGGING = "thumb_dragging";

class VerticalScrollbar extends PureComponent {
  constructor(props){
    super(props);
    this.ref = React.createRef();
    this.state = {mode:MODE_HOVERING
                  };
    this.snapshot = {};
  }
  
  render(){
    let { width,height,color,
          realHeight,realRange,
          scrollStart
          } = this.props;
    let {mode} = this.state;
    let thumbTop = scrollStart/realHeight*height;
    let thumbHeight = Math.max(10,realRange/realHeight*height);
    
    if (mode===MODE_HOVERING){
      return (
        <Fragment>
          <div  className="VerticalScrollbar-container" 
                style={{height:height,width:width}}
                onMouseDown={this.startGroveDragging}
                ref={this.ref}
                >
            <div  className="VerticalScrollbar-grove">
            </div>
            <div  className="VerticalScrollbar-thumb"
                  style={{height:thumbHeight,top:thumbTop,backgroundColor:color}}
                  onMouseDown={this.startThumbDragging}
                  >
            </div>
          </div>
        </Fragment>
      );
    }
    else if (mode===MODE_GROVE_DRAGGING) {
      return (
        <Fragment>
          <div  className="VerticalScrollbar-container" 
                style={{height:height,width:width}}
                ref={this.ref}
                >
            <div className="VerticalScrollbar-grove">
            </div>
            <div  className="VerticalScrollbar-thumb"
                  style={{height:thumbHeight,top:thumbTop,backgroundColor:color}}
                  onMouseDown={this.startThumbDragging}
                  >
            </div>
          </div>
          <DragOverlay  mouseMoveHandler={this.handleGroveDraggingMouseMove}
                        mouseUpHandler={this.endDragging}
                        style={{height:thumbHeight,top:thumbTop}}
                        cursor="ns-resize"/>
        </Fragment>
      );
    }
    else if (mode===MODE_THUMB_DRAGGING) {
      return (
        <Fragment>
          <div  className="VerticalScrollbar-container" 
                style={{height:height,width:width}}
                ref={this.ref}
                >
            <div className="VerticalScrollbar-grove">
            </div>
            <div  className="VerticalScrollbar-thumb"
                  style={{height:thumbHeight,top:thumbTop,backgroundColor:color}}
                  onMouseDown={this.startThumbDragging}
                  >
            </div>
          </div>
          <DragOverlay mouseMoveHandler={this.handleThumbDraggingMouseMove}
                       mouseUpHandler={this.endDragging}
                       cursor="ns-resize"/>
        </Fragment>
      );
    }
    else {
      throw new TypeError("Unknown mode",mode);
    }
  }
  
  startGroveDragging = (ev)=> {
    ev.preventDefault();
    ev.stopPropagation();
    let {height, realHeight, realRange} = this.props;
    let domY = ev.clientY - this.ref.current.getBoundingClientRect().top;
    
    let scrollStart = domY*realHeight/height-realRange/2;
    this.setState({mode:MODE_GROVE_DRAGGING});
    this.updateScrollStart(scrollStart);
  }
  
  startThumbDragging = (ev)=> {
    ev.preventDefault();
    ev.stopPropagation();
    this.snapshot.scrollStart = this.props.scrollStart;
    this.snapshot.clientY = ev.clientY;
    this.setState({mode:MODE_THUMB_DRAGGING});
  }
  
  endDragging = (ev)=> {
    this.setState({mode:MODE_HOVERING});
  }
  
  handleGroveDraggingMouseMove = (ev)=> {
    let {height, realHeight, realRange} = this.props;
    let domY = ev.clientY - this.ref.current.getBoundingClientRect().top;
    let scrollStart = domY*realHeight/height-realRange/2;
    this.updateScrollStart(scrollStart);
  }
  
  handleThumbDraggingMouseMove = (ev)=> {
    let {height, realHeight} = this.props;
    let scrollStart = this.snapshot.scrollStart + realHeight/height*(ev.clientY-this.snapshot.clientY);
    this.updateScrollStart(scrollStart);
  }
  
  updateScrollStart(scrollStart) {
    let {updateScrollStartHandler} = this.props;
    scrollStart = this.capScrollStart(scrollStart);
    if (updateScrollStartHandler && this.props.scrollStart !== scrollStart) {
      updateScrollStartHandler(scrollStart);
    }
  }
  
  capScrollStart(scrollStart) {
    let {realHeight,realRange} = this.props;
    return Math.max(0,Math.min(realHeight-realRange,scrollStart));
  }
}

VerticalScrollbar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  realHeight: PropTypes.number.isRequired,
  realRange: PropTypes.number.isRequired,
  scrollStart: PropTypes.number.isRequired,
  updateScrollStartHandler: PropTypes.func.isRequired,
}

export default VerticalScrollbar;
