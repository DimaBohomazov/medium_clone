import {useEffect, useState, useCallback} from 'react'
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api'
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})
  const [token] = useLocalStorage('token')

  const doFetch = useCallback((options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }, [])


  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ''
        }
      }
    }
    if (!isLoading) {
      return
    } else {
      axios(baseUrl + url, requestOptions)
        .then(res =>{
          setResponse(res.data)
          setIsLoading(false)
        })
        .catch(e =>{
          console.log('error', e)
          setError(e.response.data)
          setIsLoading(false)
        })
    }
  }, [isLoading, options, url, token])

  return [{isLoading, response, error}, doFetch]
}