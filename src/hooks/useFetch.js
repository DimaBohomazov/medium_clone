import {useEffect, useState} from 'react'
import axios from "axios";

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api'
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})

  const doFetch = (options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }


  useEffect(() => {
    if (!isLoading) {
      return
    } else {
      console.log('effect was triggered')
      axios(baseUrl + url, options)
        .then(res =>{
          console.log('success', res)
          setResponse(res.data)
          setIsLoading(false)
        })
        .catch(e =>{
          console.log('error', e)
          setError(e.response.data)
          setIsLoading(false)
        })
    }
  }, [isLoading])

  return [{isLoading, response, error}, doFetch]
}