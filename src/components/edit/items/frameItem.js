import React, { Component } from 'react';
import Panel from "./panel"


class frameItem extends Component
{
    state={
        origX:0,
        origY:0
    }

    dragItem=(e)=>{
        e.preventDefault();
        this.setState({origX:e.clientX})
        this.setState({origY:e.clientY})
        console.log("dragging")
        document.onmousemove = this.dragging;
        document.onmouseup = this.moveItem;
    }

    moveItem(e){
        console.log("x moved by:"+e.clientX)
        console.log("y moved by"+e.clientY)
        document.onmouseup = null;
        document.onmousemove = null;
    }

    dragging=(e)=>{
        this.props.dragging.call(this, e.clientX-this.state.origX, e.clientY-this.state.origY, this.props.id)
        this.setState({origX:e.clientX})
        this.setState({origY:e.clientY})
    }

    
    

    render(){
        console.log(this.props.fontSize)
        if(this.props.type==="Label"){
            return <div onClick={this.props.displayProperty} 
            onMouseDown={this.dragItem}
            style={
                {
                    fontSize:this.props.fontSize+"px", 
                    background:this.props.background, 
                    display:"inline-block",
                    position:"absolute",
                    left:this.props.x+"px",
                    top:this.props.y+"px"
                }
            }
            >{this.props.property}</div>;
        }
        else if(this.props.type==="Button"){
        return (<div onClick={this.props.displayProperty}
            onMouseDown={this.dragItem}
            ><button style={
            {
                borderStyle:'solid',
                textAlign:'center',
                fontSize:this.props.fontSize, 
                background:this.props.background,
                borderWidth:this.props.borderT,
                borderColor:this.props.borderColor,
                borderRadius:this.props.borderR,
                position:"absolute",
                left:this.props.x+"px",
                top:this.props.y+"px"
            }
        }>{this.props.property}</button></div>)
        }
        else if(this.props.type==="Textfield"){
            return (<div onClick={this.props.displayProperty}
                onMouseDown={this.dragItem}
                ><input style={
                {
                    borderStyle:'solid',
                    fontSize:this.props.fontSize, 
                    background:this.props.background,
                    borderWidth:this.props.borderT,
                    borderColor:this.props.borderColor,
                    borderRadius:this.props.borderR,
                    position:"absolute",
                    left:this.props.x+"px",
                    top:this.props.y+"px",
                    width:"200px"
                }
            }type="text"></input></div>)
        }
        else{
            return <div></div>
        }
    }
}

export default frameItem