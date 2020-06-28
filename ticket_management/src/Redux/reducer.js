import {
    LOGIN,
    SIGNUP,
    COMPANY_DETAILS,
    ADD_TICKET,
    TICKET_REPORT,
    LOGOUT,
    VIEW_TICKET,
    EDIT_TICKET,
    GET_COMMENTS
} from './actionTypes'


export const initState = {
    loginSuccess: [],
    signupSuccess:"",
    companyData: [],
    ticketMsg:[],
    allUserTicket:[],
    view_ticket:[],
    editSuccess:"",
    getComments:[]
}

export default (state = initState, { type, payload }) => {
    console.log(payload)

    switch (type) {
        case LOGIN:
            if (payload.message === 'logged_in')
                return {
                    ...state,
                    loginSuccess: payload
                }
            else
                alert(payload.message)
                break
        case SIGNUP:
            alert(payload.message)
            return {
                ...state,
                signupSuccess:payload.message
            }
        case COMPANY_DETAILS:
            return {
                ...state,
                companyData: payload.data
            }
        case ADD_TICKET:
            return {
                ...state,
                ticketMsg:payload
            }
        case TICKET_REPORT:
            return {
                ...state,
                allUserTicket:payload.data,
                editSuccess:""
            }
        case LOGOUT:
            return {
                ...state,
                loginSuccess:[]
            }
        case VIEW_TICKET:
            return {
                ...state,
                view_ticket:payload
            }
        case EDIT_TICKET:
            alert(payload)
            return {
                ...state,
                editSuccess:payload
            }
        case GET_COMMENTS:
            return {
                ...state,
                getComments:payload.data
            }
        default:
            return state
    }
}