import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../Redux/action'
import { Link } from 'react-router-dom'

class UserDashboard extends Component {
    constructor(props){
        super(props)

        console.log(props)
    }

    render() {
        const { loginSuccess,logout } = this.props
        console.log(this.props)
        return (
            <>
                <div className="container-fluid text-light">
                    <div className='mb-5' >
                        <nav className="navbar fixed-top p-2 shadow rounded" style={{backgroundColor:"#00BCD4"}}>
                            <p className="font-weight-bold h3">Ticket Management System</p>

                            <div className='float-right'>
                                <span>
                                    <span className="font-weight-bold h3 mr-3">{loginSuccess && loginSuccess.name}</span>
                                    <Link to='/login'><button className="btn btn-danger" onClick={()=>logout()}>Logout</button></Link>
                                </span>
                            </div>
                        </nav>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = state => ({
    loginSuccess: state.loginSuccess
});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDashboard);