import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { viewTicket } from '../../Redux/action'
import Navbar from '../Common/Navbar'

class Pagination extends Component {
    constructor(props) {
        super(props)

        this.state = {
            priority: '',
            status: '',
            curr_page: 1,
            flag: false
        }
    }

    componentDidMount = () => {
        const { loginSuccess, viewTicket } = this.props
        viewTicket(loginSuccess.id, 1, 5)
    }

    handlePagination = (id) => {
        const { viewTicket, view_ticket, loginSuccess } = this.props
        id = Number(id)

        if (id <= view_ticket.total_pages && id > 0)
            viewTicket(loginSuccess.id, id, 5)

        this.setState({
            curr_page: id
        })
    }

    render() {
        const { view_ticket, viewTicket, loginSuccess } = this.props
        let { curr_page, flag } = this.state
        // console.log(view_ticket)
        let arr = []

        for (let i = 1; i <= view_ticket.total_pages; i++)
            arr.push(i)

        return (
            <>
                <nav className="d-flex justify-content-center mt-5">
                    <ul className="pagination">
                        <li className="page-item disabled">

                            <button className="page-link" onClick={() => this.handlePagination(curr_page > 1 ? curr_page - 1 : 1)}>
                                <Link to={`/companyDashboard/page/${curr_page > 1 ? curr_page - 1 : 1}`}>Prev</Link>
                            </button>
                        </li>
                        {
                            arr.map(item => <li className="page-item">
                                <button className="page-link" onClick={() => this.handlePagination(item)}>
                                    <Link to={`/companyDashboard/page/${item}`}>
                                        {item}
                                    </Link>
                                </button>
                            </li>)
                        }
                        <li className="page-item">
                            <button className="page-link" onClick={() => this.handlePagination(curr_page < view_ticket.total_pages ? curr_page + 1 : arr[arr.length - 1])}>
                                <Link to={`/companyDashboard/page/${curr_page < view_ticket.total_pages ? curr_page + 1 : arr[arr.length - 1]}`}>
                                    Next
                                </Link>
                            </button>
                        </li>
                    </ul>
                </nav>
            </>
        )
    }
}

const mapStateToProps = state => ({
    view_ticket: state.view_ticket,
    loginSuccess: state.loginSuccess
});
const mapDispatchToProps = dispatch => ({
    viewTicket: (payload, page, per_page) => dispatch(viewTicket(payload, page, per_page))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination);