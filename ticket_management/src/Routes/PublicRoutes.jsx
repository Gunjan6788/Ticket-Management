import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Component/Common/Home'
import Login from '../Component/Auth/Login'
import SignUp from '../Component/Auth/Signup'
import CompanyDashboard from '../Component/Dashboard/CompanyDashboard'
import UserDashboard from '../Component/Dashboard/UserDashboard'
import TicketReport from '../Component/Ticket/TicketReport'
import ChangeStatus from '../Component/Ticket/ChangeStatus'
import EditTicket from '../Component/Ticket/EditTicket'
import ViewTicket from '../Component/Ticket/ViewTicket'

export default function () {
    return (
        <>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login'  component={Login} />
                <Route path='/signUp'  component={SignUp} />
                <Route path='/companyDashboard'  component={CompanyDashboard} />
                <Route path='/userDashboard'  component={UserDashboard} /> 
                <Route path='/ticketReport/view/:id'  component={ViewTicket} />
                <Route path='/ticketReport/edit/:id'  component={EditTicket} />
                <Route path='/ticketReport'  component={TicketReport} /> 
                <Route path='/change_status/:id'  component={ChangeStatus} />  
            </Switch>
        </>
    )
}