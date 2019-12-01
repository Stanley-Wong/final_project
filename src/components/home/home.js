import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Links from './links'
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class home extends Component {
    
    addNewWireFrame=()=>{
        var firestore = getFirestore();
        firestore.collection('wireFrames').add(
            {
                name:"UNKNOWN",
                owner:"UNKNOWN",
                panel:{
                    bColor:"rgb(255,255,255)",
                    height:530,
                    width:"none",
                    items:[]
                }
            }
        )
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
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