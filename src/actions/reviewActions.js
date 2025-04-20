//import runtimeEnv from '@mars/heroku-js-runtime-env'
const env = process.env;

export function submitReview(data) {
    console.log(data)
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            console.log('Review saved')
        }).catch((e) => console.log(e));
    }
}