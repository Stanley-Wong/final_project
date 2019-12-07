import React, { Component } from 'react';
import FrameItem from './frameItem'

class panel extends Component{
    
    
    state={
        color:this.props.frame.panel.bColor,
        height:this.props.frame.panel.height,
        width:this.props.frame.panel.width,
        items:this.props.frame.panel.items
    }

    render(){
        const backgroundStyle={background:this.state.color, height:(this.state.height)+'px', borderStyle:"solid", borderWidth:"1px"};
        return(
            <div class="card" style={backgroundStyle}
            onClick={this.props.removeDisplayProperty}
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
    }
}

export default panel