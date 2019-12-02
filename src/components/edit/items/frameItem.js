import React, { Component } from 'react';
import Panel from "./panel"


class frameItem extends Component
{
    render(){
        if(this.props.type==="Label"){
            return <div onClick={this.props.displayProperty} 
            style={
                {
                    fontSize:this.props.fontSize, 
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
        return (<div onClick={this.props.displayProperty}><button style={
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
            return (<div onClick={this.props.displayProperty}><input style={
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
            } type="text"></input></div>)
        }
        else{
            return <div></div>
        }
    }
}

export default frameItem