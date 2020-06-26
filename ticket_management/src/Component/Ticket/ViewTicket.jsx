import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComment, addComment } from '../../Redux/action'
import uuidv4 from 'uuid'
import Navbar from '../Common/Navbar'
import { format } from 'fecha'

class ViewTicket extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comment: "",
            comment_by: this.props.loginSuccess.role,
            comment_time: format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
            ticket_id: this.props.match.params.id
        }
    }

    componentDidMount = () => {
        const { getComment, match } = this.props
        getComment(match.params.id)
    }

    handleChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    render() {
        const { allUserTicket, getComments, match, addComment } = this.props
        const data = allUserTicket.find(item => item.id === Number(match.params.id))

        console.log(data, getComments)

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
                                    <p className="card-text">Company Name : {data.company} </p>
                                    <span>
                                        <h6 className="card-text pr-3">Status : {data.status}</h6>
                                        <h6 className="card-text pr-3">Category : {data.category}</h6>
                                    </span>
                                </div>
                                <div className="m-2 p-2 bg-dark">
                                    <div className="float-right ">
                                        {
                                            getComments && getComments.map(item => (
                                                <div className="border rounded m-3" style={{ width: "300px" }} key={uuidv4()}>
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
                                                    // getComment(match.params.id)
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
    allUserTicket: state.allUserTicket,
    getComments: state.getComments,
    loginSuccess: state.loginSuccess
});
const mapDispatchToProps = dispatch => ({
    getComment: payload => dispatch(getComment(payload)),
    addComment: payload => dispatch(addComment(payload))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewTicket);