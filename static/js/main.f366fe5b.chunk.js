(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a(2),l=a(4),o=a(3),i=a(5),s=a(0),c=a.n(s),u=a(7),g=a.n(u),h=(a(14),function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(i)))).handleMouseMove=function(e){e.preventDefault(),e.stopPropagation(),(0,a.props.mouseMoveHandler)(e)},a.handleMouseUp=function(e){e.preventDefault(),e.stopPropagation(),(0,a.props.mouseUpHandler)(e)},a}return Object(i.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this.props.cursor;return c.a.createElement("div",{className:"DragOverlay-fullscreen",style:{cursor:e}})}},{key:"componentDidMount",value:function(){document.addEventListener("mousemove",this.handleMouseMove,!0),document.addEventListener("mouseup",this.handleMouseUp,!0)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousemove",this.handleMouseMove,!0),document.removeEventListener("mouseup",this.handleMouseUp,!0)}},{key:"ignoreScroll",value:function(e){e.preventDefault(),e.stopPropagation()}}]),t}(s.PureComponent)),m=(a(15),"hovering"),p="grove_dragging",v="thumb_dragging",d=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(o.a)(t).call(this,e))).startGroveDragging=function(e){e.preventDefault(),e.stopPropagation();var t=a.props,r=t.height,n=t.realHeight,l=t.realRange,o=(e.clientY-a.ref.current.getBoundingClientRect().top)*n/r-l/2;a.setState({mode:p}),a.updateScrollStart(o)},a.startThumbDragging=function(e){e.preventDefault(),e.stopPropagation(),a.snapshot.scrollStart=a.props.scrollStart,a.snapshot.clientY=e.clientY,a.setState({mode:v})},a.endDragging=function(e){a.setState({mode:m})},a.handleGroveDraggingMouseMove=function(e){var t=a.props,r=t.height,n=t.realHeight,l=t.realRange,o=(e.clientY-a.ref.current.getBoundingClientRect().top)*n/r-l/2;a.updateScrollStart(o)},a.handleThumbDraggingMouseMove=function(e){var t=a.props,r=t.height,n=t.realHeight,l=a.snapshot.scrollStart+n/r*(e.clientY-a.snapshot.clientY);a.updateScrollStart(l)},a.ref=c.a.createRef(),a.state={mode:m},a.snapshot={},a}return Object(i.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this.props,t=e.width,a=e.height,r=e.color,n=e.realHeight,l=e.realRange,o=e.scrollStart,i=this.state.mode,u=o/n*a,g=Math.max(10,l/n*a);if(i===m)return c.a.createElement(s.Fragment,null,c.a.createElement("div",{className:"VerticalScrollbar-container",style:{height:a,width:t},onMouseDown:this.startGroveDragging,ref:this.ref},c.a.createElement("div",{className:"VerticalScrollbar-grove"}),c.a.createElement("div",{className:"VerticalScrollbar-thumb",style:{height:g,top:u,backgroundColor:r},onMouseDown:this.startThumbDragging})));if(i===p)return c.a.createElement(s.Fragment,null,c.a.createElement("div",{className:"VerticalScrollbar-container",style:{height:a,width:t},ref:this.ref},c.a.createElement("div",{className:"VerticalScrollbar-grove"}),c.a.createElement("div",{className:"VerticalScrollbar-thumb",style:{height:g,top:u,backgroundColor:r},onMouseDown:this.startThumbDragging})),c.a.createElement(h,{mouseMoveHandler:this.handleGroveDraggingMouseMove,mouseUpHandler:this.endDragging,style:{height:g,top:u},cursor:"ns-resize"}));if(i===v)return c.a.createElement(s.Fragment,null,c.a.createElement("div",{className:"VerticalScrollbar-container",style:{height:a,width:t},ref:this.ref},c.a.createElement("div",{className:"VerticalScrollbar-grove"}),c.a.createElement("div",{className:"VerticalScrollbar-thumb",style:{height:g,top:u,backgroundColor:r},onMouseDown:this.startThumbDragging})),c.a.createElement(h,{mouseMoveHandler:this.handleThumbDraggingMouseMove,mouseUpHandler:this.endDragging,cursor:"ns-resize"}));throw new TypeError("Unknown mode",i)}},{key:"updateScrollStart",value:function(e){var t=this.props.updateScrollStartHandler;e=this.capScrollStart(e),t&&this.props.scrollStart!==e&&t(e)}},{key:"capScrollStart",value:function(e){var t=this.props,a=t.realHeight,r=t.realRange;return Math.max(0,Math.min(a-r,e))}}]),t}(s.PureComponent),f=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(o.a)(t).call(this,e))).state={width:10,height:400,color:"green",realHeight:100,realRange:40,scrollStart:0},a}return Object(i.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.width,r=t.height,n=t.color,l=t.realHeight,o=t.realRange,i=t.scrollStart;return c.a.createElement(s.Fragment,null,c.a.createElement("div",null,"width:",c.a.createElement("input",{type:"text",value:a,onChange:function(t){e.setState({width:Number.parseInt(t.target.value)||0})}})),c.a.createElement("div",null,"height:",c.a.createElement("input",{type:"text",value:r,onChange:function(t){e.setState({height:Number.parseInt(t.target.value)||0})}})),c.a.createElement("div",null,"color:",c.a.createElement("input",{type:"text",value:n,onChange:function(t){e.setState({color:t.target.value})}})),c.a.createElement("div",null,"realHeight:",c.a.createElement("input",{type:"range",min:"100",max:"2000",step:"1",value:l,onChange:function(t){e.setState({realHeight:Number.parseInt(t.target.value)})}})),c.a.createElement("div",null,"realRange:",c.a.createElement("input",{type:"range",min:"10",max:"1000",step:"1",value:o,onChange:function(t){e.setState({realRange:Number.parseInt(t.target.value)})}})),c.a.createElement("div",null,"scrollStart:",c.a.createElement("input",{type:"range",min:"0",max:"2000",step:"1",value:i,onChange:function(t){e.setState({scrollStart:Number.parseInt(t.target.value)})}})),c.a.createElement(d,Object.assign({},this.state,{updateScrollStartHandler:function(t){return e.setState({scrollStart:t})}})))}}]),t}(s.Component);g.a.render(c.a.createElement(f,null),document.getElementById("root"))},8:function(e,t,a){e.exports=a(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.f366fe5b.chunk.js.map