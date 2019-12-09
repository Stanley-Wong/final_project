import React, { Component } from 'react';
import Panel from "./panel"
import { placeholder } from '@babel/types';


class frameItem extends Component
{
    state={
        origX:0,
        origY:0,
    }

    dragItem=(e)=>{
        e.preventDefault();
        this.setState({origX:e.clientX})
        this.setState({origY:e.clientY})
        console.log("dragging")
        document.onmousemove = this.dragging;
        document.onmouseup = this.moveItem;
    }

    //for dragging the bottom right corner
    dragBR=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        this.setState({origX:e.clientX})
        this.setState({origY:e.clientY})
        console.log("dragging BR")
        document.onmousemove = this.draggingBR;
        document.onmouseup = this.moveItem;
    }

    draggingBR=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log("width is changed by: "+(e.clientX-this.state.origX));
        console.log("height is changed by: "+(e.clientY-this.state.origY));
        this.props.draggingBR.call(this, e.clientX-this.state.origX, e.clientY-this.state.origY, this.props.item.id)
        this.setState({origX:e.clientX})
        this.setState({origY:e.clientY})
    }

    

    moveItem(){
        document.onmouseup = null;
        document.onmousemove = null;
    }

    dragging=(e)=>{
        this.props.dragging.call(this, e.clientX-this.state.origX, e.clientY-this.state.origY, this.props.item.id)
        this.setState({origX:e.clientX})
        this.setState({origY:e.clientY})
    }


    render(){
        let item = this.props.item;
        let show={
            position:"absolute",
            left:item.xCoord+"px",
            top:item.yCoord+"px",
            border:"1px solid",
            background:"rgba(255,255,255,0)",
            textAlign:"center"
        }
        let noShow={
            position:"absolute",
            left:item.xCoord+"px",
            top:item.yCoord+"px",
            background:"rgba(255,255,255,0)",
            textAlign:"center"
        }
        if(item.type==="Label"){
            return <div 
            style={(item.showSelect)?show:noShow}
            >
            {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", top:"-3px",right:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", top:"-3px",left:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", bottom:"-3px",left:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div onMouseDown={this.dragBR} style={{background:"black", width:"6px", height:"6px", bottom:"-3px",right:"-3px",position:"absolute"}}></div>):null}    
            <div 
            onClick={this.props.displayProperty} 
            onMouseDown={this.dragItem}
            bounds='parent'
            style={
                {
                    fontSize:item.fontSize+"px", 
                    background:item.background, 
                    display:"inline-block",
                    margin:"5px",
                    color:item.textColor,
                    height:item.height+"px",
                    width:item.width+"px",
                }
            }
            >{item.property}</div>
            </div>;
        }
        else if(item.type==="Button"){
        return (<div onClick={this.props.displayProperty} 
            onMouseDown={this.dragItem}
            style={(item.showSelect)?show:noShow}
            >
            {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", top:"-3px",right:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", top:"-3px",left:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", bottom:"-3px",left:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div onMouseDown={this.dragBR} style={{background:"black", width:"6px", height:"6px", bottom:"-3px",right:"-3px",position:"absolute"}}></div>):null}    
            <button style={
            {
                borderStyle:'solid',
                textAlign:'center',
                fontSize:item.fontSize, 
                background:item.background,
                borderWidth:item.borderT,
                borderColor:item.borderColor,
                borderRadius:item.borderR,
                margin:"5px",
                color:item.textColor,
                height:item.height+"px",
                width:item.width+"px",
            }
        }>{item.property}</button></div>)
        }
        else if(item.type==="Textfield"){
            return (<div onClick={this.props.displayProperty} 
                onMouseDown={this.dragItem}
                style={(item.showSelect)?show:noShow}
                >
                {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", top:"-3px",right:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", top:"-3px",left:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", bottom:"-3px",left:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div onMouseDown={this.dragBR} style={{background:"black", width:"6px", height:"6px", bottom:"-3px",right:"-3px",position:"absolute"}}></div>):null}    
                <input style={
                {
                    borderStyle:'solid',
                    fontSize:item.fontSize, 
                    background:item.background,
                    borderWidth:item.borderT,
                    borderColor:item.borderColor,
                    borderRadius:item.borderR,
                    height:item.height+"px",
                    width:(item.width-4)+"px",
                    margin:"5px",
                    color:item.textColor,
                }
            }
            type="text"
            placeholder={item.property}></input></div>)
        }
        else if(item.type==="Container"){
            return <div
            style={(item.showSelect)?show:noShow}
            >
            {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", top:"-3px",right:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", top:"-3px",left:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div style={{background:"black", width:"6px", height:"6px", bottom:"-3px",left:"-3px",position:"absolute"}}></div>):null}
            {(item.showSelect)?(<div onMouseDown={this.dragBR} style={{background:"black", width:"6px", height:"6px", bottom:"-3px",right:"-3px",position:"absolute"}}></div>):null}    
            <div class="card" onClick={this.props.displayProperty} 
            onMouseDown={this.dragItem}
            style={
                {
                    borderStyle:"solid",
                    fontSize:item.fontSize+"px", 
                    background:item.background, 
                    display:"inline-block",
                    height:item.height+"px",
                    width:item.width+"px",
                    borderWidth:item.borderT,
                    borderColor:item.borderColor,
                    borderRadius:item.borderR,
                    margin:"5px",
                    color:item.textColor
                }}
            >
            </div></div>
        }
    }
}

export default frameItem