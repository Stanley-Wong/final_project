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

    moveItem(e){
        console.log("x moved by:"+e.clientX)
        console.log("y moved by"+e.clientY)
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
            background:"rgba(255,255,255,0)"
        }
        let noShow={
            position:"absolute",
            left:item.xCoord+"px",
            top:item.yCoord+"px",
            background:"rgba(255,255,255,0)",
        }
        console.log(item.fontSize)
        if(item.type==="Label"){
            return <div 
            style={(item.showSelect)?show:noShow}
            >
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", top:"-18px",right:"-3px",position:"absolute"}}></p>):null}
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", top:"-18px",left:"-3px",position:"absolute"}}></p>):null}
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", bottom:"-18px",left:"-3px",position:"absolute"}}></p>):null}
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", bottom:"-18px",right:"-3px",position:"absolute"}}></p>):null}
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
                    color:item.textColor
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
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", top:"-18px",right:"-3px",position:"absolute"}}></p>):null}
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", top:"-18px",left:"-3px",position:"absolute"}}></p>):null}
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", bottom:"-18px",left:"-3px",position:"absolute"}}></p>):null}
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", bottom:"-18px",right:"-3px",position:"absolute"}}></p>):null}    
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
                color:item.textColor
            }
        }>{item.property}</button></div>)
        }
        else if(item.type==="Textfield"){
            return (<div onClick={this.props.displayProperty} 
                onMouseDown={this.dragItem}
                style={(item.showSelect)?show:noShow}
                >
                {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", top:"-18px",right:"-3px",position:"absolute"}}></p>):null}
                {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", top:"-18px",left:"-3px",position:"absolute"}}></p>):null}
                {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", bottom:"-18px",left:"-3px",position:"absolute"}}></p>):null}
                {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", bottom:"-18px",right:"-3px",position:"absolute"}}></p>):null}    
                <input style={
                {
                    borderStyle:'solid',
                    fontSize:item.fontSize, 
                    background:item.background,
                    borderWidth:item.borderT,
                    borderColor:item.borderColor,
                    borderRadius:item.borderR,
                    width:"200px",
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
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", top:"-18px",right:"-3px",position:"absolute"}}></p>):null}
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", top:"-18px",left:"-3px",position:"absolute"}}></p>):null}
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", bottom:"-18px",left:"-3px",position:"absolute"}}></p>):null}
            {(item.showSelect)?(<p style={{borderStyle:'solid', width:"1px", bottom:"-18px",right:"-3px",position:"absolute"}}></p>):null}    
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