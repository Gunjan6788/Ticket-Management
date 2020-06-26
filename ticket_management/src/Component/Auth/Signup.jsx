import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../Redux/action'
import { Redirect } from 'react-router-dom'

class SignupUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
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
        const { signup, signupSuccess } = this.props
        return (
            <>
                {signupSuccess !== "" ? <Redirect to='/login' /> : ""}
                <div className="container">
                    <h3 className="text-center m-3">Signup </h3>

                    <div className="border row offset-3 col-md-6 p-3 shadow-lg p-3 mb-5 bg-white rounded border border-info">
                        <div className='col-12'>
                            <div className="form-group col-12">
                                <label>Name</label>
                                <input className="form-control"
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    placeholder="name" />
                            </div>
                            <div className="form-group col-12">
                                <label>Email</label>
                                <input className="form-control"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="email" />
                            </div>
                            <div className="form-group col-12">
                                <label>Password</label>
                                <input className="form-control"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    placeholder="password" />
                            </div>
                            <div className="form-group col-md-4">
                                <label >Role</label>
                                <select className="form-control"
                                    name="role"
                                    value={this.state.role}
                                    onChange={this.handleChange}
                                >
                                    <option >Role</option>
                                    <option value="company">Company</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                        </div>
                        <button className="btn btn-info ml-5 mt-3"
                            onClick={(e) => {
                                e.preventDefault()
                                signup(this.state)
                            }}
                        >
                            Signup
                        </button>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = state => ({
    signupSuccess: state.signupSuccess
})

const mapDispatchToProps = dispatch => ({
    signup: payload => dispatch(signup(payload))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupUser)