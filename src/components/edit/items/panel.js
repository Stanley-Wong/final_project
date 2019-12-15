import React, { Component } from 'react';
import FrameItem from './frameItem'

class panel extends Component{
    

    render(){
        const backgroundStyle={background:this.props.frame.panel.bColor, height:(this.props.frame.panel.height)+'px', width:(this.props.frame.panel.width) ,borderStyle:"solid", borderWidth:"1px", transform:"scale("+this.props.scale+")"};
        return(
            <div class="card" style={backgroundStyle}
            onMouseDown={this.props.removeDisplayProperty}
            id="corner"
            >
                {this.props.frame.panel.items.map(item=>(
                        <FrameItem 
                        item={item}
                        displayProperty={this.props.displayProperty.bind(this,item)}
                        dragging={this.props.drag}
                        draggingBR={this.props.dragBR}
                        draggingTR={this.props.dragTR}
                        draggingBL={this.props.dragBL}
                        draggingTL={this.props.dragTL}
                    /> 
                ))}
            </div>
        )
    }
}

export default panel