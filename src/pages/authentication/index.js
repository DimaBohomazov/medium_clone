import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import useFetch from "../../hooks/useFetch";

const Authentication = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [isSubmitting, setIsSubmitting] = useState(false)
  const [{isLoading, response, error}, doFetch] = useFetch('/users/login')

  console.log(response, isLoading, error)

  const handleSubmit = (event) => {
    event.preventDefault()
    doFetch({
      method: 'post',
      data: {
        user: {
          email: 'qq@gmail.com',
          password: '123'
        }
      }
    })
  }
  return (
    <div className='auth-page'>
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className='text-xs-center'>Login</h1>
            <p className="text-xs-center">
              <Link to='/register'>
                Need an account?
              </Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
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
                  Sing In
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