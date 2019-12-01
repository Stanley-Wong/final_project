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
        console.log(data)
    }

    render(){
        console.log(this.props.frame)
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
                    /> 
                ))}
            </div>
            ):
            (
                <div class="card" style={backgroundStyle}
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
                        /> 
                    ))}
                </div>
            )
        )
    }
}

export default panel;