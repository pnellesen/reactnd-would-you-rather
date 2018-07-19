export const GET_AUTHED_USER = 'GET_AUTHED_USER'
export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const DO_LOGOUT = 'DO_LOGOUT'
/* This not really needed - we can get the current authedUser out of the store. Leave for now
export const fetchAuthedUserAction = (authedUser) => {
    return {
        type: GET_AUTHED_USER,
        authedUser
    }
}
*/
export const setAuthedUserAction = (userInfo) => {
    return {
        type: SET_AUTHED_USER,
        userInfo
    }
}

export const doLogoutAction = () => {
        return {
            type: DO_LOGOUT
        }
}
/* This not really needed - we can get the current authedUser out of the store.  Leave for now
export const handleFetchAuthedUser = (authedUser) => {
    return (dispatch) => {
        dispatch(fetchAuthedUserAction(authedUser));
    }
}
*/
export const handleSetAuthedUser = (userInfo) => {
    return (dispatch) => {
        dispatch(setAuthedUserAction(userInfo));
    }
}

export const handleDoLogout = () => {
    return (dispatch) => {
        dispatch(doLogoutAction());
    }
}