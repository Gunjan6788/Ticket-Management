import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editTicket } from '../../Redux/action'
import uuidv4 from 'uuid'
import Navbar from '../Common/Navbar'
import {Redirect} from 'react-router-dom'

class EditTicket extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            category: "",
            priority: "",
            company: "",
            ticket_id:""
        }
    }

    componentDidMount = () => {
        const { allUserTicket,match } = this.props
        // console.log(allUserTicket,match)
        const data = allUserTicket.find(item => item.id === Number(match.params.id))

        this.setState({
            title:data.title,
            category:data.category,
            priority:data.priority,
            company:data.company_id,
            ticket_id:data.id
        })
    
        console.log(this.state)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render() {
        const { companyData, editTicket ,editSuccess} = this.props
        
        return (
            <>
                {editSuccess && editSuccess!==""?<Redirect to="/ticketReport"/>: ""}
                <Navbar/>
                <div className="container" style={{ marginTop: "150px" }}>
                    <div className="row">
                        <div className="offset-3 col-6">

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
                                            editTicket(this.state)
 
                                        }}
                                    >Edit Ticket</button>
                                </div>
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
    allUserTicket: state.allUserTicket,
    editSuccess:state.editSuccess
});
const mapDispatchToProps = dispatch => ({
    editTicket: payload => dispatch(editTicket(payload))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTicket);