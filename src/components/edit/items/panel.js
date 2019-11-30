import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import FrameItem from './frameItem'
import { getFirestore } from 'redux-firestore';

class panel extends Component{
    componentDidUpdate(prevProps, prevState){
        let newItems = this.props.wireFramesLists[this.props.id].panel.items;
        if(newItems!=this.state.items){
            this.setState({items:newItems})
        }
    }

    state={
        color:this.props.wireFramesLists[this.props.id].panel.bColor,
        size:this.props.wireFramesLists[this.props.id].panel.size,
        items:this.props.wireFramesLists[this.props.id].panel.items
    }

    additem=(e)=>{
        e.preventDefault();
        console.log(e.clientX)
        console.log(e.clientY)
        var data = e.dataTransfer.getData("text");
        console.log(data)
        if(data==="label"){
            console.log("add Label")
            console.log(this.props.wireFramesLists[this.props.id])
            let tempWire = this.props.wireFramesLists[this.props.id];
            let newLabel = {
                "type": "Label",
                "property":"label",
                "fontSize":25,
                "background":"rgba(0,0,0,0)",
                "borderColor":"black",
                "borderT":'0px',
                "borderR":'0px'
            }
            tempWire.panel.items.push(newLabel)
            var firestore = getFirestore();
            firestore.collection('wireFrames').doc(this.props.id).update({panel:tempWire.panel});
        }
        else if(data==="textfield"){
            console.log("add Textfield")
            console.log(this.props.wireFramesLists[this.props.id])
            let tempWire = this.props.wireFramesLists[this.props.id];
            let newLabel = {
                "type": "Textfield",
                "property":"Textfield",
                "fontSize":15,
                "background":"rgb(255,255,255)",
                "borderColor":"black",
                "borderT":'2px',
                "borderR":'5px'
            }
            tempWire.panel.items.push(newLabel)
            var firestore = getFirestore();
            firestore.collection('wireFrames').doc(this.props.id).update({panel:tempWire.panel});
        }
        else if(data==="button"){
            console.log("add button")
            console.log(this.props.wireFramesLists[this.props.id])
            let tempWire = this.props.wireFramesLists[this.props.id];
            let newButton = {
                "type": "Button",
                "property":"Button",
                "fontSize":15,
                "background":"rgb(255,255,255)",
                "borderColor":"black",
                "borderT":'2px',
                "borderR":'5px'
            }
            tempWire.panel.items.push(newButton)
            var firestore = getFirestore();
            firestore.collection('wireFrames').doc(this.props.id).update({panel:tempWire.panel});
        }
    }

    render(){
        return(
            <div class="card" style={{background:this.state.color, width:(this.state.size)+'px', height:(this.state.size)+'px'}}
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
                    /> 
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        wireFramesLists: state.firestore.data.wireFrames,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireFrames' },
    ]),
)(panel);