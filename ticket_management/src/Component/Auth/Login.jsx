import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { login } from '../../Redux/action'

class Login extends Component {
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
        const { login, loginSuccess } = this.props
        console.log(loginSuccess)
        return (
            <>
                {loginSuccess && loginSuccess.role==='company'? <Redirect to='/companyDashboard' /> : ''}
                {loginSuccess && loginSuccess.role==='user'? <Redirect to='/userDashboard' /> : ''}
                
                <div className="container">
                    <h3 className="text-center m-3">Login</h3>

                    <div className="border row offset-3 col-md-6 p-3 shadow-lg p-3 mb-5 bg-white rounded border border-info">
                        <div className='col-12'>
                            <div className="form-group col-12">
                                <label>Email</label>
                                <input className="form-control"
                                    name="email"
                                    type="text"
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
                                login(this.state)
                            }}
                        >
                            Login
                        </button>
                        <p className="m-3 ml-5 pl-5">Not have an account ?</p>
                        <Link to='/signUp'><button className="btn btn-info mt-3">SignUp</button></Link>
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
    login: payload => dispatch(login(payload))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);