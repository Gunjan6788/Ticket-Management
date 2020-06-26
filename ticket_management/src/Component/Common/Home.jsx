import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Home extends Component {

    render() {
        return (
            <>
                <div className="container">
                    <p className="font-italic font-weight-bolder h1 text-center mt-5 pt-5">Ticket management</p>
                    <div className='d-flex justify-content-center pt-5'>
                        <Link to='/login'><button type="button" className="btn btn-lg btn-info m-4" >Login</button></Link>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);