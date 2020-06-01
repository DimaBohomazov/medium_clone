import React, {useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";

const Authentication = props => {
  const isLogin = props.match.path === '/login'
  const pageTitle = isLogin ? 'Sing In' : 'Sing Up'
  const descriptionLink = isLogin ? '/register' : '/login'
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
  const apiUrl = isLogin ? '/users/login' : '/users'

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
  const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)
  const [token, setToken] = useLocalStorage('token')

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = isLogin ? {email, password} : {email, password, username}
    doFetch({
      method: 'post',
      data: {
        user
      }
    })
  }

  useEffect(() => {
    if(!response){
      return
    }
    setToken(response.user.token)
    setIsSuccessSubmit(true)
  }, [response])

  if (isSuccessSubmit){
    return <Redirect to='/' />
  }
  console.log('token', token)
  return (
    <div className='auth-page'>
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className='text-xs-center'>{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>
                {descriptionText}
              </Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      className='form-control form-control-lg'
                      type="text"
                      placeholder='Username'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    className='form-control form-control-lg'
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className='form-control form-control-lg'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type='submit'
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;