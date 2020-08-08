import {
  LOGIN,
  SIGNUP,
  COMPANY_DETAILS,
  ADD_TICKET,
  TICKET_REPORT,
  LOGOUT,
  VIEW_TICKET,
  CHANGE_STATUS,
  EDIT_TICKET,
  GET_COMMENTS,
  ADD_COMMENT
} from './actionTypes'

import axios from 'axios'

// login user or company 
export const loginSuccess = payload => ({
  type: LOGIN,
  payload
})

export const login = payload => dispatch => {
  console.log(payload)

  axios.post('http://127.0.0.1:5000/login', payload)
    .then(res => res.data)
    .then(res => dispatch(loginSuccess(res)))
    .catch(err => console.log(err))
}

// signup of new user
export const signupSuccess = payload => ({
  type: SIGNUP,
  payload
})

export const signup = payload => dispatch => {
  console.log(payload)

  axios.post('http://127.0.0.1:5000/signup', payload)
    .then(res => res.data)
    .then(res => dispatch(signupSuccess(res)))
    .catch(err => console.log(err))
}


// get company names
export const companyDetailsSuccess = payload => ({
  type: COMPANY_DETAILS,
  payload
})

export const companyDetails = payload => dispatch => {
  axios.get('http://127.0.0.1:5000/company_details')
    .then(res => res.data)
    .then(res => dispatch(companyDetailsSuccess(res)))
    .catch(err => console.log(err))
}

// add ticket
export const addTicketSuccess = payload => ({
  type: ADD_TICKET,
  payload
})

export const addTicket = payload => dispatch => {
  console.log(payload)
  axios.post('http://127.0.0.1:5000/add_ticket',payload)
    .then(res => res.data)
    .then(res => dispatch(addTicketSuccess(res)))
    .catch(err => console.log(err))
}

// user ticket Report
export const ticketReportSuccess = payload => ({
  type: TICKET_REPORT,
  payload
})

export const ticketReport = payload => dispatch => {
  console.log(payload)
  axios.get(`http://127.0.0.1:5000/ticket_report/${payload}`)
    .then(res => res.data)
    .then(res => dispatch(ticketReportSuccess(res)))
    .catch(err => console.log(err))
}

// logout
export const logout = () =>({
  type:LOGOUT
})

// company ticket report
export const viewTicketSuccess = payload => ({
  type: VIEW_TICKET,
  payload
})

export const viewTicket = (company_id,page,per_page) => dispatch => {
  console.log(company_id,page,per_page)
  axios.get("http://127.0.0.1:5000/view_tickets",{
    params:{
      company_id:company_id,
      page:page,
      per_page:per_page
    }
  })
    .then(res => res.data)
    .then(res => dispatch(viewTicketSuccess(res)))
    .catch(err => console.log(err))
}

// update ticket status
export const changeStatusSuccess = payload => ({
  type: CHANGE_STATUS,
  payload
})

export const changeStatus = payload => dispatch => {
  console.log(payload)
  let ticket_id = payload.ticket_id,
    status = payload.status,
    id = payload.id
    console.log(ticket_id,status)
  axios.get(`http://127.0.0.1:5000/change_status/${ticket_id}/${status}`)
    .then(res => res.data)
    .then(res=>dispatch(viewTicket(id)))
    .then(res => dispatch(getComment(ticket_id)))
    .catch(err => console.log(err))
}

//edit ticket status
export const editTicketSuccess = payload => ({
  type: EDIT_TICKET,
  payload
})

export const editTicket = payload => dispatch => {
  console.log(payload)

  axios.post('http://127.0.0.1:5000/ticket_update',payload)
    .then(res => res.data)
    .then(res => dispatch(editTicketSuccess(res)))
    .catch(err => console.log(err))
}

// get all comments of perticular ticket id
export const getCommentSuccess = payload => ({
  type: GET_COMMENTS,
  payload
})

export const getComment = payload => dispatch => {
  console.log(payload)

  axios.get(`http://127.0.0.1:5000/get_comments/${payload}`)
    .then(res => res.data)
    .then(res => dispatch(getCommentSuccess(res)))
    .catch(err => console.log(err))
}

// add comment
export const addCommentSuccess = payload => ({
  type: ADD_COMMENT,
  payload
})

export const addComment = payload => dispatch => {
  let data = payload[0],
    id = payload[1]
  console.log(data,payload[1])
  axios.post('http://127.0.0.1:5000/add_comment',data)
    .then(res => res.data)
    .then(res => dispatch(getComment(id)))
    .catch(err => console.log(err))
}