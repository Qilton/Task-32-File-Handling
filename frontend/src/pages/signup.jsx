import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../../util'
const signup = () => {
const [SignUpInfo, setSignUpInfo] = useState({name:"",email:"",password:""})

const navigate= useNavigate()
const HandleSignup=async(e) => {
  e.preventDefault()
  const {name,email,password}=SignUpInfo
  if(!name || !email || !password){
    return handleError('name,email and pass are required')
  }
  try {
    const url="http://localhost:8080/auth/save"
    const response= await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(SignUpInfo)
    })
    const result=await response.json()
    const {success,message,error}=result;
    if (success){
      handleSuccess(message)
      setTimeout(() => {
        navigate("/login")
      }, 1000);
    } else if(error){
      const details=error?.details[0].message
      handleError(details)
    }else if(!success){
      handleError(message)
    }
    console.log(result)
  } catch (err) {
    handleError(err)
  }

}



    const HandleChange=(e) => {
      const {name,value}=e.target
      console.log(name,value)
      const copySignUpInfo={...SignUpInfo}
      copySignUpInfo[name]=value;
      setSignUpInfo(copySignUpInfo)
    }
    
  return (
    <div className='container'>
      <h1>Signup</h1>
      <form action="" onSubmit={HandleSignup}>
        <div>
            <label htmlFor="name">Name</label>
            <input onChange={HandleChange} type="text" name='name' autoFocus placeholder='Enter Your Name...' />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input onChange={HandleChange} type="text" name='email' autoFocus placeholder='Enter Your Email...' />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input onChange={HandleChange} type="text" name='password' autoFocus placeholder='Enter Your Password...' />
        </div>
        <button>Signup</button>
        <span>Already have a account ?
            <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default signup
