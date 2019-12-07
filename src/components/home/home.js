import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Links from './links'
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class home extends Component {
    state={
        newLink:"",
    }

    addNewWireFrame=()=>{
        var firestore = getFirestore();
        var newFrame = {
            name:"UNKNOWN",
            owner:"UNKNOWN",
            timeStamp:new Date(),
            panel:{
                bColor:"rgb(255,255,255)",
                height:530,
                items:[],
                itemCount:0
            }
        }
        firestore.collection('wireFrames').add(newFrame).then(promise =>{
            newFrame.id = promise.id;
            this.setState({newLink:newFrame.id});
        })
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        if(this.state.newLink!=""){
            return <Redirect to={"editscreen/"+this.state.newLink}/>
        }
        return (
            <div class="row">
                <div class="col s4">
                    <h3>Recent Work</h3>
                    <Links/>
                </div>
                <div class="col s2">&nbsp;</div>
                <div class="col s6" style={{textAlign:"center"}}>
                    <div class="card medium" style={{padding:"25px", borderRadius:"3px", borderStyle:"solid"}}>
                        <h2>Wireframer™</h2>
                    </div>
                    <button onClick={this.addNewWireFrame}>New Wireframer</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireFrameLists: state.firebase.data.wireFrames,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireFrames' },
    ]),
)(home);