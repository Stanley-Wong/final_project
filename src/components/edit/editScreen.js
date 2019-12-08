import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import Panel from './items/panel';
import { Link } from 'react-router-dom';
import frameItem from './items/frameItem';


class editScreen extends Component{

    constructor(props){
        super(props)
        this.displayProperty = this.displayProperty.bind(this)
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeyDown)
    }

    state={
        name: "",
        owner: "",
        itemProperty:"",
        fontSize:"",
        background:"",
        bordercolor:"",
        borderT:"",
        borderR:"",
        id:"",
        currentWireframe:"none",
    }

    handleChange=(e)=>{
        const { target } = e;
        this.setState({[target.id]: target.value});
        var firestore = getFirestore();
        firestore.collection('wireFrames').doc(this.props.id).update({[target.id]: target.value});
    }

    onDrag=(e)=>{
        e.dataTransfer.setData("text", e.target.id)
    }

    displayProperty(item,e){
        document.addEventListener("keydown", this.handleKeyDown)
        e.stopPropagation();
        this.setState({itemProperty:item.property})
        this.setState({fontSize:item.fontSize})
        this.setState({background:item.background})
        this.setState({bordercolor:item.borderColor})
        this.setState({borderT:item.borderT})
        this.setState({borderR:item.borderR})
        this.setState({id:item.id})
        for(let i=0; i<this.state.currentWireframe.panel.items.length; i++){
            if(this.state.currentWireframe.panel.items[i].id==item.id){
                this.state.currentWireframe.panel.items[i].showSelect=true;
                break;
            }
        }
    }

    removeDisplayProperty=()=>{
        document.removeEventListener("keydown", this.handleKeyDown)
        for(let i=0; i<this.state.currentWireframe.panel.items.length; i++){
            if(this.state.currentWireframe.panel.items[i].id==this.state.id){
                this.state.currentWireframe.panel.items[i].showSelect=false;
                break;
            }
        }
        this.setState({itemProperty:""})
        this.setState({fontSize:""})
        this.setState({background:""})
        this.setState({bordercolor:""})
        this.setState({borderT:""})
        this.setState({borderR:""})
        this.setState({id:""})
    }

    addContainer=()=>{
        console.log(this.state.currentWireframe)
        let newLabel = {
            "type": "Container",
            "property":"container",
            "fontSize":25,
            "background":"rgb(255,255,255)",
            "borderColor":"black",
            "borderT":'2px',
            "borderR":'2px',
            "id":this.state.currentWireframe.panel.itemCount+1,
            "xCoord":0,
            "yCoord":0,
            "height":300,
            "width":300,
            "showSelect":false
        }
        let tempFrame = this.state.currentWireframe;
        tempFrame.panel.items.push(newLabel);
        tempFrame.panel.itemCount=tempFrame.panel.itemCount+1;
        this.setState({currentWireframe:tempFrame});
    }

    addLabel=()=>{
        console.log(this.state.currentWireframe)
        let newLabel = {
            "type": "Label",
            "property":"label",
            "fontSize":25,
            "background":"rgba(0,0,0,0)",
            "borderColor":"black",
            "borderT":'0px',
            "borderR":'0px',
            "id":this.state.currentWireframe.panel.itemCount+1,
            "xCoord":0,
            "yCoord":0,
            "showSelect":false
        }
        let tempFrame = this.state.currentWireframe;
        tempFrame.panel.items.push(newLabel);
        tempFrame.panel.itemCount=tempFrame.panel.itemCount+1;
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
            "borderR":'5px',
            "id":this.state.currentWireframe.panel.itemCount+1,
            "xCoord":0,
            "yCoord":0,
            "showSelect":false
        }
        let tempFrame = this.state.currentWireframe;
        tempFrame.panel.items.push(newButton);
        tempFrame.panel.itemCount=tempFrame.panel.itemCount+1;
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
            "borderR":'5px',
            "id":this.state.currentWireframe.panel.itemCount+1,
            "xCoord":0,
            "yCoord":0,
            "showSelect":false
        }
        let tempFrame = this.state.currentWireframe;
        tempFrame.panel.items.push(newTextfield);
        tempFrame.panel.itemCount=tempFrame.panel.itemCount+1;
        this.setState({currentWireframe:tempFrame});
        this.setState({idCounter:this.state.idCounter+1})
    }

    //for testing purpose
    showStates=()=>{
        console.log(this.state.currentWireframe)
        console.log(this.state.currentWireframe.panel.itemCount)
        console.log(this.state.itemProperty)
    }

    //When click save
    updateFrame=()=>{
        console.log("this runs")
        var firestore = getFirestore();
        firestore.collection('wireFrames').doc(this.props.id).update({panel:this.state.currentWireframe.panel})
        document.getElementById("popUp").style.opacity=1;
        document.getElementById("popUp").style.zIndex=3;
        setTimeout((()=>{
            document.getElementById("popUp").style.opacity=0
            document.getElementById("popUp").style.zIndex=-1
        }),1000);
    }

    //when item is drag 
    dragItem=(x, y, id)=>{
        let itemDrag = null;
        for(let i=0; i<this.state.currentWireframe.panel.items.length; i++){
            if(this.state.currentWireframe.panel.items[i].id==id){
                itemDrag=this.state.currentWireframe.panel.items[i];
            }
        }
        itemDrag.xCoord=itemDrag.xCoord+x;
        itemDrag.yCoord=itemDrag.yCoord+y;
        this.forceUpdate();
    }

    //changing the item in edit screen. Five actions starts here
    changeItemProperty=(e)=>{
        e.stopPropagation();
        for(let i=0; i<this.state.currentWireframe.panel.items.length; i++){
            if(this.state.currentWireframe.panel.items[i].id===this.state.id){
                this.state.currentWireframe.panel.items[i].property=e.target.value;
            }
        }
        this.setState({itemProperty:e.target.value})
    }

    changeBackground=(e)=>{
        for(let i=0; i<this.state.currentWireframe.panel.items.length; i++){
            if(this.state.currentWireframe.panel.items[i].id===this.state.id){
                this.state.currentWireframe.panel.items[i].background=e.target.value;
            }
        }
        this.setState({background:e.target.value})
    }

    changeFontSize=(e)=>{
        for(let i=0; i<this.state.currentWireframe.panel.items.length; i++){
            if(this.state.currentWireframe.panel.items[i].id===this.state.id){
                if(e.target.value!=""){
                    this.state.currentWireframe.panel.items[i].fontSize=parseInt(e.target.value);
                    this.setState({fontSize:parseInt(e.target.value)})
                }
                else{
                    this.state.currentWireframe.panel.items[i].fontSize=0;
                    this.setState({fontSize:0});
                }
            }
        }
    }

    changeBorderColor=(e)=>{
        for(let i=0; i<this.state.currentWireframe.panel.items.length; i++){
            if(this.state.currentWireframe.panel.items[i].id===this.state.id){
                this.state.currentWireframe.panel.items[i].borderColor=e.target.value;
            }
        }
        this.setState({bordercolor:e.target.value})
    }

    changeBorderT=(e)=>{
        for(let i=0; i<this.state.currentWireframe.panel.items.length; i++){
            if(this.state.currentWireframe.panel.items[i].id===this.state.id){
                if(e.target.value!=""){
                    this.state.currentWireframe.panel.items[i].borderT=e.target.value+'px';
                    this.setState({borderT:(e.target.value+'px')})
                }
                else{
                    this.state.currentWireframe.panel.items[i].borderT='0px';
                    this.setState({borderT:'0px'});
                }
            }
        }
    }

    changeBorderR=(e)=>{
        for(let i=0; i<this.state.currentWireframe.panel.items.length; i++){
            if(this.state.currentWireframe.panel.items[i].id===this.state.id){
                if(e.target.value!=""){
                    this.state.currentWireframe.panel.items[i].borderR=e.target.value+'px';
                    this.setState({borderR:(e.target.value+'px')})
                }
                else{
                    this.state.currentWireframe.panel.items[i].borderR='0px';
                    this.setState({borderR:'0px'});
                }
            }
        }
    }
    //end of changing items

    //this is for popup window for closing
    warnUnsave=()=>{
        document.getElementById("warning").style.opacity=1;
        document.getElementById("warning").style.zIndex=3;
    }

    closeWarning=()=>{
        document.getElementById("warning").style.opacity=0;
        document.getElementById("warning").style.zIndex=-1;
    }

    deleteItem(){
        for(let i=0; i<this.state.currentWireframe.panel.items.length; i++){
            if(this.state.currentWireframe.panel.items[i].id===this.state.id){
                this.state.currentWireframe.panel.items.splice(i,1);
            }
        }
        this.removeDisplayProperty();
    }

    copyItem(){
        let tempList = this.state.currentWireframe;
        let temp = null;
        for(let i=0; i<this.state.currentWireframe.panel.items.length; i++){
            if(this.state.currentWireframe.panel.items[i].id===this.state.id){
                temp = JSON.parse(JSON.stringify(this.state.currentWireframe.panel.items[i]));
                temp.id=parseInt(tempList.panel.itemCount)+1;
                temp.xCoord=temp.xCoord+100;
                temp.yCoord=temp.yCoord+100;
                break;
            }
        }
        tempList.panel.items.push(temp);
        tempList.panel.itemCount=tempList.panel.itemCount+1;
        this.setState({currentWireframe:tempList})
    }

    handleKeyDown = (e) =>{
        if(e.keyCode===8){
            e.preventDefault();
            console.log("backspace clicked")
            this.deleteItem();
        }
        if(e.keyCode===68 && e.ctrlKey){
            e.preventDefault();
            console.log("Copy")
            this.copyItem();
        }
        console.log(e.ctrlKey)
    }

    //for overriding delete key when typing
    removeDelete=()=>{
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    addRemove=()=>{
        document.addEventListener("keydown", this.handleKeyDown);
    }
    //for overriding delete key when typing

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
                        <div onClick={this.warnUnsave} class="col s3">Close</div>
                    </div>
                    <div style={{padding:"5px", height:"118px"}}>
                        <div class="card z-depth-0" onClick={this.addContainer}>
                            <div class="card" style={{borderStyle:"solid", borderWidth:"2px", height:"70px"}}
                            id="container"></div>
                            <div style={{textAlign:"center"}}>Container</div>
                        </div>
                    </div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div style={{padding:"5px", height:"118px"}}>
                        <div class="card z-depth-0" onClick={this.addLabel}>
                            <div class="card z-depth-0" style={{textAlign:"center"}} id="label">Prompt for Input:</div>
                            <div style={{textAlign:"center"}}>Label</div>
                        </div>
                    </div>
                    <div style={{padding:"5px", height:"118px", display:"inline-block"}}>
                        <div class="card z-depth-0" onClick={this.addButton}>
                            <div class="card z-depth-0"
                            id="button">
                                <div style={{borderStyle:"solid", borderWidth:"2px", textAlign:"center", borderRadius:"5px", color:"grey"}}>Submit</div>
                            </div>
                            <div style={{textAlign:"center"}}>Button</div>
                        </div>
                    </div>
                    <div style={{padding:"5px", height:"118px", display:"inline"}}>
                        <div class="card z-depth-0" onClick={this.addTextfield}>
                            <div class="card z-depth-0" id="textfield">
                                <div style={{border: "solid",borderRadius: "5px",borderWidth: "2px",paddingLeft: "10px", color:"grey", textAlign:"left"}}>Input</div>
                            </div>
                            <div style={{textAlign:"center"}}>Textfield</div>
                        </div>
                    </div>
                </div>
                <div class="col s7 card grey" style={{height:"550px",borderStyle:"solid", borderWidth:"2px", background:""}}>
                    {(this.state.currentWireframe)?
                    <Panel frame={this.state.currentWireframe} 
                    displayProperty={this.displayProperty} 
                    drag={this.dragItem}
                    removeDisplayProperty={this.removeDisplayProperty}/>
                    :null}
                </div>
                <div class="col s3 card" style={{height:"550px",borderStyle:"solid", borderWidth:"2px", position:"relative"}}>
                    <div>Properties</div>
                    <input value={this.state.itemProperty} 
                    onChange={this.changeItemProperty}
                    onFocus={this.removeDelete}
                    onBlur={this.addRemove.bind(this)}/>
                    <div class="card" style={{height:"60px"}}>
                        <span>FontSize:</span>
                        <input style={{display:"inline-block", width:"40%", position:"absolute", right:"10px"}} 
                        value={this.state.fontSize}
                        onChange={this.changeFontSize}
                        onFocus={this.removeDelete}
                        onBlur={this.addRemove.bind(this)}
                        ></input>
                    </div>
                    <div class="card" style={{height:"60px"}}>
                        <span>Background:</span>
                        <input style={{display:"inline-block", width:"40%" , position:"absolute", right:"10px"}} 
                        value={this.state.background}
                        onChange={this.changeBackground}
                        type="color"></input>
                    </div>
                    <div class="card" style={{height:"60px"}}>
                        <span>Border Color:</span>
                        <input style={{display:"inline-block", width:"40%" , position:"absolute", right:"10px"}} 
                        value={this.state.bordercolor}
                        onChange={this.changeBorderColor}
                        type="color"></input>
                    </div>
                    <div class="card" style={{height:"60px"}}>
                        <span>Border Thickness:</span>
                        <input style={{display:"inline-block", width:"40%", position:"absolute", right:"10px"}} 
                        value={this.state.borderT.slice(0,this.state.borderT.length-2)}
                        onChange={this.changeBorderT}
                        onFocus={this.removeDelete}
                        onBlur={this.addRemove.bind(this)}></input>
                    </div>
                    <div class="card" style={{height:"60px"}}>
                        <span>Border Radius:</span>
                        <input style={{display:"inline-block", width:"40%", position:"absolute", right:"10px"}} 
                        value={this.state.borderR.slice(0,this.state.borderR.length-2)}
                        onChange={this.changeBorderR}
                        onFocus={this.removeDelete}
                        onBlur={this.addRemove.bind(this)}></input>
                    </div>
                </div>
            </div>):null}
            <div id="popUp" class="card blue">Your wireframer has been saved!</div>
            <div id="warning" class="card blue">
                <div>Are you sure you want to close the window?</div>
                <div>&nbsp;</div>
                <div>Any unsave work will be lost</div>
                <div>&nbsp;</div>
                <Link to="/">
                    <button>Yes</button>
                </Link>
                <button onClick={this.closeWarning}>No</button>
            </div>
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