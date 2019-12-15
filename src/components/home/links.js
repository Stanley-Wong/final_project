import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';

class links extends React.Component {

    state={
        deleteid:""
    }

    delete = (e) => {
        e.preventDefault();
        var firestore = getFirestore();
        firestore.collection('wireFrames').doc(this.state.deleteid).delete();
        this.closeWarning();
    }

    warnDelete=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const { target } = e;
        console.log(target.id)
        this.setState({deleteid:target.id})
        document.getElementById("deleteFrame").style.opacity=1;
        document.getElementById("deleteFrame").style.zIndex=3;
    }

    closeWarning=()=>{
        document.getElementById("deleteFrame").style.opacity=0;
        document.getElementById("deleteFrame").style.zIndex=-1;
    }

    render() {
        return (
            <div>
                {
                (this.props.wireFrames)?
                this.props.wireFrames.sort(function(a,b){return a.timeStamp<b.timeStamp}).map(wireframe=>{
                    return (wireframe.userId==this.props.loginId)?(
                    <div>
                        <Link to={"/editscreen/"+wireframe.id} onClick={()=>{
                            var firestore=getFirestore();
                            firestore.collection('wireFrames').doc(wireframe.id).update({"timeStamp": new Date()});
                        }}>
                            <div class="row card" style={{paddingTop:"30px", paddingBottom:"30px", paddingLeft:"10px"}}>
                                <h4 class="col s10"> {wireframe.name}</h4>
                                <div class="material-icons col s2" style={{fontSize:"35px", color:"black"}} id={wireframe.id} onClick={this.warnDelete}>close</div>
                            </div>
                        </Link>
                    </div>
                    ):null
                }):null
                }
                <div class="card green" id="deleteFrame">
                    Are you sure you want to delete the wireframe?
                    <button onClick={this.delete}>Yes</button>
                    <button onClick={this.closeWarning}>No</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        wireFrames: state.firestore.ordered.wireFrames,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(links);