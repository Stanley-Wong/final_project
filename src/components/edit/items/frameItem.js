import React, { Component } from 'react';

class frameItem extends Component
{
    render(){
        if(this.props.type==="Label"){
            return <div style={{fontSize:this.props.fontSize, background:this.props.background}}>{this.props.property}</div>;
        }
        else if(this.props.type==="Button"){
        return (<div><button style={
            {
                borderStyle:'solid',
                textAlign:'center',
                fontSize:this.props.fontSize, 
                background:this.props.background,
                borderWidth:this.props.borderT,
                borderColor:this.props.borderColor,
                borderRadius:this.props.borderR
            }
        }>{this.props.property}</button></div>)
        }
        else if(this.props.type==="Textfield"){
            return (<div><input style={
                {
                    borderStyle:'solid',
                    fontSize:this.props.fontSize, 
                    background:this.props.background,
                    borderWidth:this.props.borderT,
                    borderColor:this.props.borderColor,
                    borderRadius:this.props.borderR
                }
            } type="text"></input></div>)
        }
    }
}

export default frameItem