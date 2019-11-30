import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';

class links extends React.Component {

    delete = (e) => {
        e.preventDefault();
        const { target } = e;
        console.log(target.id)
        var firestore = getFirestore();
        firestore.collection('wireFrames').doc(target.id).delete();
    }

    render() {
        return (
            <div>
                {
                (this.props.wireFrames)?
                this.props.wireFrames.map(wireframe=>{
                    return (
                    <div>
                        <Link to={"/editscreen/"+wireframe.id}>
                            <div class="row card" style={{paddingTop:"30px", paddingBottom:"30px", paddingLeft:"10px"}}>
                                <h4 class="col s10"> {wireframe.name}</h4>
                                <div class="material-icons col s2" style={{fontSize:"35px", color:"black"}} id={wireframe.id} onClick={this.delete}>close</div>
                            </div>
                        </Link>
                    </div>
                    )
                }):null
                }
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