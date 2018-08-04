export const GET_AUTHED_USER = 'GET_AUTHED_USER'
export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const DO_LOGOUT = 'DO_LOGOUT'

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