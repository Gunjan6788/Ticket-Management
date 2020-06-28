import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../Common/Navbar'
import { changeStatus, getComment, addComment } from '../../Redux/action'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'fecha'

class ChangeStat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            status: '',
            comment: "",
            comment_by: this.props.loginSuccess.role,
            id: this.props.loginSuccess.id,
            comment_time: format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
            ticket_id: this.props.match.params.id
        }
    }

    componentDidMount = () => {
        const { view_ticket, getComment, match } = this.props

        const data = view_ticket.data.find(item => item.id === Number(match.params.id))
        getComment(match.params.id)


        this.setState({
            status: data.status
        })
    }

    handleChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    handleClick = () => {
        const { changeStatus } = this.props
        changeStatus(this.state)
    }

    render() {
        const { view_ticket, match, getComments, loginSuccess, addComment } = this.props

        const data = view_ticket.data.find(item => item.id === Number(match.params.id))
        // console.log(data, view_ticket.data, getComments, loginSuccess)

        return (
            <>
                <Navbar />
                <div className="container" style={{ marginTop: "150px" }}>
                    <div className="row">
                        <div className="offset-2 col-8">
                            <div className="card border-info mb-3">
                                <div className="card-header">Ticket Information</div>

                                <div className="card-body lead">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text">User Name : {data.name} </p>
                                    <span>
                                        <h6 className="card-text pr-3">Status : {data.status}</h6>
                                        <h6 className="card-text pr-3">Category : {data.category}</h6>
                                    </span>
                                </div>

                                <div className="input-group mb-3 m-2">
                                    <select className="custom-select" id="inputGroupSelect02"
                                        name="status"
                                        value={this.state.status}
                                        onChange={(e) => this.setState({ status: e.target.value })}
                                    >
                                        <option>Change </option>
                                        <option value="assign">Assign</option>
                                        <option value="in_process">In Process</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                    <div className="input-group-append mr-4">
                                        <button className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={() => this.handleClick()}>
                                            Change Status</button>
                                    </div>
                                </div>

                                <div className="m-2 p-2 bg-dark">
                                    <div className="float-right ">
                                        {
                                            getComments && getComments.map(item => (
                                                <div key={uuidv4()} className="border rounded m-3" style={{ width: "300px" }}>
                                                    <div className="bg-light">
                                                        {
                                                            this.props.loginSuccess.role === "user" ?
                                                                <strong >{item.comment_by === "user" ? this.props.loginSuccess.name : "company"}</strong>
                                                                : ""
                                                        }
                                                        {
                                                            this.props.loginSuccess.role === "company" ?
                                                                <strong> {item.comment_by === "company" ? "you" : "user"}</strong>
                                                                : ""

                                                        }
                                                        <small className='float-right text-muted'>{item.comment_time}</small>
                                                    </div>
                                                    <div style={{ backgroundColor: "#ECEFF1" }}>{item.comment}</div>
                                                </div>
                                            ))}
                                    </div>

                                    <div className="input-group mb-3">
                                        <textarea className="form-control "
                                            placeholder="Type your message here..."
                                            rows="3"
                                            value={this.state.comment}
                                            onChange={(e) => this.handleChange(e)}>
                                        </textarea>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary"
                                                type="button"
                                                style={{ backgroundColor: "#ECEFF1" }}
                                                onClick={() => {
                                                    addComment([this.state, match.params.id])
                                                }}>
                                                Enter
                                            </button>
                                        </div>
                                    </div>
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
    view_ticket: state.view_ticket,
    loginSuccess: state.loginSuccess,
    getComments: state.getComments
});
const mapDispatchToProps = dispatch => ({
    changeStatus: payload => dispatch(changeStatus(payload)),
    getComment: payload => dispatch(getComment(payload)),
    addComment: payload => dispatch(addComment(payload))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeStat);