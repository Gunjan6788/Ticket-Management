import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { uuidv4 } from 'uuid'
import { viewTicket } from '../../Redux/action'
import Navbar from '../Common/Navbar'
import Pagination from './Pagination'

class CompanyDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            priority: '',
            status: ''
        }
    }

    render() {
        const { view_ticket } = this.props
        // console.log(view_ticket)

        return (
            <>
                <Navbar />
            
                <div className="container-fluid" style={{ marginTop: "150px" }}>
                    <div className='row'>
                        
                        <div className="offset-1 col-10">

                            <div className="table-responsive-sm">
                                <table className="table">
                                    <thead>
                                        <tr className="table-info">
                                            <th scope="col">Id</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Category</th>
                                            <th scope='col'>Priority</th>
                                            <th scope="col">Status</th>
                                            <th>Resolve</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {view_ticket.data && view_ticket.data.map(ele =>

                                            <tr className='table-success' key={ele.id}>
                                                <th scope="row">{ele.id}</th>
                                                <td className='text-danger'>{ele.title}</td>
                                                <td>{ele.category}</td>
                                                <td>{ele.priority}</td>
                                                <td>{ele.status}</td>
                                                <td><Link to={`/change_status/${ele.id}`}>change status</Link></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    view_ticket: state.view_ticket,
    loginSuccess: state.loginSuccess
});
const mapDispatchToProps = dispatch => ({
    viewTicket: payload => dispatch(viewTicket(payload))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyDashboard);