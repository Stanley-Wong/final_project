import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import Panel from './items/panel';
import frameItem from './items/frameItem';
import labelImg from './label.png';


class editScreen extends Component{
    state={
        name: "",
        owner: ""
    }

    handleChange=(e)=>{
        const { target } = e;
        this.setState({[target.id]: target.value});
        var firestore = getFirestore();
        firestore.collection('wireFrames').doc(this.props.id).update({[target.id]: target.value});
    }

    addButton=()=>{
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

    addContainer=()=>{
        console.log("add Panel")
        var firestore = getFirestore();
        firestore.collection('wireFrames').doc(this.props.id).update(
            {
                "panel":{
                    bColor: "rgb(255,255,255)",
                    size:300,
                    items:[]
                }
            }
        );
    }

    addLabel=()=>{
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

    addTextfield=()=>{
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

    onDrag=(e)=>{
        e.dataTransfer.setData("text", e.target.id)
    }

    render(){
        const frames = this.props.wireFramesLists
        const id = this.props.id
        return(
            <div>
            {(this.props.wireFramesLists)?(
            <div class="row">
                <div class="card col s6" style={{height:"50px"}}>
                    <span style={{display:"inline-block"}}>Name:&nbsp;</span>
                    <input id="name" style={{display:"inline-block", width:"350px"}} type='text' defaultValue={frames[id].name}
                    onChange={this.handleChange}/>
                </div>
                <div class="card col s6" style={{height:"50px"}}>
                    <span style={{display:"inline-block"}}>Owner:&nbsp;</span>
                    <input id="owner" style={{display:"inline-block" , width:"350px"}} type='text' defaultValue={frames[id].owner}
                    onChange={this.handleChange}/>
                </div>
                <div class="col s2 card" style={{height:"550px",borderStyle:"solid", borderWidth:"2px", textAlign:"center"}}>
                    <div class="row" style={{borderStyle:"solid", borderWidth:"2px"}}>
                        <i class="material-icons col s2">zoom_in</i>
                        <i class="material-icons col s2">zoom_out</i>
                        <div class="col s3">Save</div>
                        <div class="col s3">Close</div>
                    </div>
                    <div style={{padding:"5px", height:"118px"}}>
                        <div class="card z-depth-0" onClick={this.addContainer}>
                            <div class="card" style={{borderStyle:"solid", borderWidth:"2px", height:"70px"}}></div>
                            <div style={{textAlign:"center"}}>Container</div>
                        </div>
                    </div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div style={{padding:"5px", height:"118px"}}>
                        <div class="card z-depth-0">
                            <div class="card z-depth-0" style={{textAlign:"center"}}
                            id="label" draggable onDragStart={(e) => this.onDrag(e)}>Prompt for Input:</div>
                            <div style={{textAlign:"center"}}>Label</div>
                        </div>
                    </div>
                    <div style={{padding:"5px", height:"118px", display:"inline-block"}}>
                        <div class="card z-depth-0">
                            <div class="card z-depth-0"
                            id="button" draggable onDragStart={(e) => this.onDrag(e)}>
                                <div style={{borderStyle:"solid", borderWidth:"2px", textAlign:"center", borderRadius:"5px", color:"grey"}}>Submit</div>
                            </div>
                            <div style={{textAlign:"center"}}>Button</div>
                        </div>
                    </div>
                    <div style={{padding:"5px", height:"118px", display:"inline"}}>
                        <div class="card z-depth-0">
                            <div class="card z-depth-0"
                            draggable onDragStart={(e) => this.onDrag(e)} id="textfield">
                                <div style={{border: "solid",borderRadius: "5px",borderWidth: "2px",paddingLeft: "10px", color:"grey", textAlign:"left"}}>Input</div>
                            </div>
                            <div style={{textAlign:"center"}}>Textfield</div>
                        </div>
                    </div>
                </div>
                <div class="col s7 card grey" style={{height:"550px",borderStyle:"solid", borderWidth:"2px", background:""}}>
                    {(frames[id].panel)?<Panel id={this.props.id}/>:null}
                </div>
                <div class="col s3 card" style={{height:"550px",borderStyle:"solid", borderWidth:"2px"}}>

                </div>
            </div>):null}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let wireFrameId = ownProps.match.params.id;
    return {
        wireFramesLists: state.firestore.data.wireFrames,
        id: wireFrameId,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireFrames' },
    ]),
)(editScreen);