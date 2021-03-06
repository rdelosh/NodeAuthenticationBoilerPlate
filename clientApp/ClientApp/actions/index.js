
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom'
import {AUTH_USER} from './types'
import {AUTH_ERROR} from './types'
import {UNAUTH_USER} from './types'
import {UPDATE_POLLS} from './types'
import {POLL_UPDATE_ERROR} from './types'

export function signinUser({email,password,history}){
	return function(dispatch){
		axios.post('/signin',{email,password})
		.then(response=>{
			console.log(AUTH_USER)
			dispatch({type:AUTH_USER})
			localStorage.setItem('token',response.data.token)
			history.push('/welcome')
		})
		.catch(()=>{
			
			dispatch(authError('bad login info'))
			
		})
	}
}
export function signupUser({email,password,history}){
	return function(dispatch){
		axios.post('/signup',{email,password})
		.then(response=>{
			dispatch({type:AUTH_USER})
			localStorage.setItem('token',response.data.token)
			history.push('/')
		}).catch((response)=>{
			//console.log(response)
			dispatch(authError('Could not sign up, email might be in use'))
			
		})

		
	}
}
export function signinGoogle(token){
	return function(dispatch){
		
		dispatch({type:AUTH_USER})
		localStorage.setItem("token",token)
	}
}
export function authError(error){
	return{
		type:AUTH_ERROR,
		payload:error
	}
}
export function signoutUser(){
	console.log("try to remove token from local storage")
	localStorage.removeItem('token');

	return {type:UNAUTH_USER}
}
export function updatePolls(){
	return function(dispatch){
		axios.get('/api/GetPolls')
		.then(response=>{
			dispatch({type:UPDATE_POLLS,payload:response})
		})
		.catch(error=>{
			dispatch({type:POLL_UPDATE_ERROR})
		})
	}
}
