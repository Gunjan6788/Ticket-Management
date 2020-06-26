import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { companyDetails, addTicket } from '../../Redux/action'
import uuidv4 from 'uuid'

class UserDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            category: "",
            priority: "",
            company: "",
            user_id: this.props.loginSuccess.id
        }
    }

    componentDidMount = () => {
        const { companyDetails } = this.props
        companyDetails()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { companyData, addTicket, ticketMsg } = this.props
        console.log(ticketMsg)
        return (
            <>
                <div className="container" style={{ marginTop: "150px" }}>
                    <div className="row">
                        <div className="col-6">

                            <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: "30rem" }}>
                                <div className="card-header bg-info">
                                    Add Ticket
                                </div>
                                <div className="card-body">
                                    <div className="form-group col-12">
                                        <label>Title</label>
                                        <input className="form-control"
                                            name="title"
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                            placeholder="title" />
                                    </div>
                                    <div className='row pl-3'>
                                        <div className="form-group col-md-5">
                                            <label >category</label>
                                            <select className="form-control"
                                                name="category"
                                                value={this.state.category}
                                                onChange={this.handleChange}
                                            >
                                                <option >Category</option>
                                                <option value="hardware">Hardware</option>
                                                <option value="software">Software</option>
                                                <option value="application">Application</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label >Priority</label>
                                            <select className="form-control"
                                                name="priority"
                                                value={this.state.priority}
                                                onChange={this.handleChange}
                                            >
                                                <option >Proiroty</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label >Company Name</label>
                                        <select className="form-control"
                                            name="company"
                                            value={this.state.company}
                                            onChange={this.handleChange}
                                        >
                                            <option >Company</option>
                                            {
                                                companyData && companyData.map(ele =>

                                                    <option key={uuidv4()} value={ele.id}>{ele.name}</option>

                                                )
                                            }
                                        </select>
                                    </div>
                                    <button className="btn btn-info ml-3"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addTicket(this.state)
                                        }}
                                    >Add Ticket</button>
                                </div>
                                <p>{ticketMsg && ticketMsg.message}</p>
                            </div>
                        </div>
                        <div className='col-6 '>
                            <div className='d-flex justify-content-center m-1'>
                                <Link to='/ticketReport'>
                                    <div className="card" style={{width: "22rem"}}>
                                        <img src="/ticket.jpeg" className="card-img-top" alt="..." />
                                        <div className="card-body d-flex justify-content-center">
                                            <button className="btn btn-info">View Ticket</button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    companyData: state.companyData,
    loginSuccess: state.loginSuccess,
    ticketMsg: state.ticketMsg
});
const mapDispatchToProps = dispatch => ({
    companyDetails: payload => dispatch(companyDetails(payload)),
    addTicket: payload => dispatch(addTicket(payload))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDashboard);