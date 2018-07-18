export const GET_AUTHED_USER = 'GET_AUTHED_USER'

export const fetchAuthedUserAction = () => {
    return {
        type: GET_AUTHED_USER
    }
}

export const handleFetchAuthedUser = () => {
    return (dispatch) => {
        dispatch(fetchAuthedUserAction());
    }
}