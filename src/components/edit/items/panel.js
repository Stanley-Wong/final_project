import React, { Component } from 'react';
import FrameItem from './frameItem'

class panel extends Component{
    
    
    state={
        color:this.props.frame.panel.bColor,
        height:this.props.frame.panel.height,
        width:this.props.frame.panel.width,
        items:this.props.frame.panel.items
    }

    additem=(e)=>{
        e.preventDefault();
        console.log(e.clientX)
        console.log(e.clientY)
        var data = e.dataTransfer.getData("text");
        console.log(data==="label")
        if(data==="label")
            this.props.addLabel.call(this,e.clientX,e.clientY);
        else if(data==="button")
            this.props.addButton.call(this,e.clientX,e.clientY);
        else if(data==="textfield")
            this.props.addTextfield.call(this,e.clientX,e.clientY);
    }

    render(){
        const backgroundStyle={background:this.state.color, height:(this.state.height)+'px', borderStyle:"solid", borderWidth:"1px"};
        const container={background:this.state.color, width:(this.state.width)+'px', height:(this.state.height)+'px', borderStyle:"solid", borderWidth:"1px"};
        return(
            (this.state.width!=="none")?(
            <div class="card" style={container}
                onDrop={this.additem}
                onDragOver={(e)=>{e.preventDefault()}}
            >
                {this.state.items.map(item=>(
                        <FrameItem 
                        type={item.type}
                        property={item.property}
                        fontSize={item.fontSize}
                        background={item.background}
                        borderColor={item.borderColor}
                        borderT={item.borderT}
                        borderR={item.borderR}
                        displayProperty={this.props.displayProperty.bind(this,item)}
                        x={item.xCoord}
                        y={item.yCoord}
                        dragging={this.props.drag}
                        id={item.id}
                    /> 
                ))}
            </div>
            ):
            (
                <div class="card" style={backgroundStyle}
                    onDrop={this.additem}
                    onDragOver={(e)=>{e.preventDefault()}}
                    id="corner"
                >
                    {this.state.items.map(item=>(
                            <FrameItem 
                            type={item.type}
                            property={item.property}
                            fontSize={item.fontSize}
                            background={item.background}
                            borderColor={item.borderColor}
                            borderT={item.borderT}
                            borderR={item.borderR}
                            displayProperty={this.props.displayProperty.bind(this,item)}
                            x={item.xCoord}
                            y={item.yCoord}
                            dragging={this.props.drag}
                            id={item.id}
                        /> 
                    ))}
                </div>
            )
        )
    }
}

export default panel