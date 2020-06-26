import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ticketReport } from '../../Redux/action'
import uuidv4 from 'uuid'
import Navbar from '../Common/Navbar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons'

class UserDashboard extends Component {

    componentDidMount = () => {
        const { loginSuccess, ticketReport } = this.props
        ticketReport(loginSuccess.id)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { allUserTicket, match } = this.props
        console.log(allUserTicket)
        return (
            <>
                <Navbar />
                <div className="container-fluid pl-5 pr-5" style={{ marginTop: "150px" }}>
                    <div className="table-responsive-lg">
                        <table className="table">
                            <thead>
                                <tr className="table-info">
                                    <th scope="col">Id</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Status</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allUserTicket && allUserTicket.map(ele => (
                                        <>
                                            <tr key={uuidv4()} className="table-success">
                                                <td>{ele.id}</td>
                                                <td className='text-danger'>{ele.title}</td>
                                                <td>{ele.category}</td>
                                                <td>{ele.company}</td>
                                                <td>{ele.status}</td>
                                                <td>
                                                    <Link to={`${match.url}/edit/${ele.id}`}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={`${match.url}/view/${ele.id}`}>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    loginSuccess: state.loginSuccess,
    allUserTicket: state.allUserTicket,
});
const mapDispatchToProps = dispatch => ({
    ticketReport: payload => dispatch(ticketReport(payload))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDashboard);