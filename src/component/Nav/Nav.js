import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export function Nav(props) {
    if (props.location.pathname === '/') {
        return <div></div>
    } else {
        return (
            <div>
                <img src={ props.pic } />
                <div>{props.username}</div>
                <Link to='/dashboard'>Home</Link>
                <Link to='/new'>New Post</Link>
                <Link to='/'>Logout</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        pic: state.pic
    }
}

// withRouter is needed to make props available to the Nav function
export default withRouter(connect( mapStateToProps )( Nav ));