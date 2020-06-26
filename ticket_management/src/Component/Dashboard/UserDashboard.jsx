import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../Common/Navbar'
import CreateTicket from '../Ticket/CreateTicket'

class UserDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            role: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <>
                <div className="container">
                    <Navbar/>
                    <CreateTicket/>
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
)(UserDashboard);