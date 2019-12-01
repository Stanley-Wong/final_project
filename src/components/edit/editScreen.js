import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import Panel from './items/panel';
import { Link } from 'react-router-dom';
import frameItem from './items/frameItem';
import labelImg from './label.png';


class editScreen extends Component{

    state={
        name: "",
        owner: "",
        itemProperty:"",
        fontSize:"",
        background:"",
        bordercolor:"",
        borderT:"",
        borderR:"",
        currentWireframe:"none"
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

    onDrag=(e)=>{
        e.dataTransfer.setData("text", e.target.id)
    }

    displayProperty(item){
        console.log("successfully passed")
        console.log(item)
        this.setState({itemProperty:item.property})
        this.setState({fontSize:item.fontSize})
        this.setState({background:item.background})
        this.setState({bordercolor:item.borderColor})
        this.setState({borderT:item.borderT})
        this.setState({borderR:item.borderR})
    }

    addLabel=()=>{
        let newLabel = {
            "type": "Label",
            "property":"label",
            "fontSize":25,
            "background":"rgba(0,0,0,0)",
            "borderColor":"black",
            "borderT":'0px',
            "borderR":'0px'
        }
        let tempFrame = this.state.currentWireframe;
        tempFrame.panel.items.push(newLabel);
        this.setState({currentWireframe:tempFrame});
    }

    addButton=()=>{
        let newButton = {
            "type": "Button",
            "property":"Button",
            "fontSize":15,
            "background":"rgb(255,255,255)",
            "borderColor":"black",
            "borderT":'2px',
            "borderR":'5px'
        }
        let tempFrame = this.state.currentWireframe;
        tempFrame.panel.items.push(newButton);
        this.setState({currentWireframe:tempFrame});
    }

    addTextfield=()=>{
        let newTextfield = {
            "type": "Textfield",
            "property":"Textfield",
            "fontSize":15,
            "background":"rgb(255,255,255)",
            "borderColor":"black",
            "borderT":'2px',
            "borderR":'5px'
        }
        let tempFrame = this.state.currentWireframe;
        tempFrame.panel.items.push(newTextfield);
        this.setState({currentWireframe:tempFrame});
    }

    showStates=()=>{
        console.log(this.state.currentWireframe)
    }

    updateFrame=()=>{
        console.log("this runs")
        var firestore = getFirestore();
        firestore.collection('wireFrames').doc(this.props.id).update({panel:this.state.currentWireframe.panel})
    }

    render(){
        const frames = this.props.wireFramesLists
        const id = this.props.id
        if(this.props.wireFramesLists){
            if(this.state.currentWireframe==="none"){
                this.setState({currentWireframe:this.props.wireFramesLists[this.props.id]})
            }
        }
        return(
            <div>
            {((this.state.currentWireframe!=="none") && (frames))?(
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
                        <div onClick={this.updateFrame} class="col s3">Save</div>
                        <div class="col s3">Close</div>
                    </div>
                    <div style={{padding:"5px", height:"118px"}}>
                        <div class="card z-depth-0">
                            <div class="card" style={{borderStyle:"solid", borderWidth:"2px", height:"70px"}}
                            id="container" draggable onDragStart={(e) => this.onDrag(e)}></div>
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
                    {(this.state.currentWireframe)?
                    <Panel frame={this.state.currentWireframe} displayProperty={this.displayProperty}
                    addLabel={this.addLabel} addButton={this.addButton} addTextfield={this.addTextfield}/>
                    :null}
                </div>
                <div class="col s3 card" style={{height:"550px",borderStyle:"solid", borderWidth:"2px", position:"relative"}}>
                    <div>Properties</div>
                    <input value={this.state.itemProperty}></input>
                    <div class="card" style={{height:"60px"}}>
                        <span>FontSize:</span>
                        <input style={{display:"inline-block", width:"40%", position:"absolute", right:"30px"}} value={this.state.fontSize}></input>
                    </div>
                    <div class="card" style={{height:"60px"}}>
                        <span>Background:</span>
                        <input style={{display:"inline-block", width:"40%" , position:"absolute", right:"30px"}} value={this.state.background}></input>
                    </div>
                    <div class="card" style={{height:"60px"}}>
                        <span>Border Color:</span>
                        <input style={{display:"inline-block", width:"40%" , position:"absolute", right:"30px"}} value={this.state.bordercolor}></input>
                    </div>
                    <div class="card" style={{height:"60px"}}>
                        <span>Border Thickness:</span>
                        <input style={{display:"inline-block", width:"40%", position:"absolute", right:"30px"}} value={this.state.borderT}></input>
                    </div>
                    <div class="card" style={{height:"60px"}}>
                        <span>Border Radius:</span>
                        <input style={{display:"inline-block", width:"40%", position:"absolute", right:"30px"}} value={this.state.borderR}></input>
                    </div>
                </div>
            </div>):null}
            <button onClick={this.showStates}>click to show state</button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("editScreen ran")
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