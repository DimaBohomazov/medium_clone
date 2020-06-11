import React, {useEffect} from 'react';
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import {Link} from "react-router-dom";

const PopularTags = () => {
  const [{response, isLoading, error}, doFetch] = useFetch('/tags')
  useEffect(() => {
    doFetch()
  }, [doFetch])
  if (isLoading || !response) {
    return <Loading />

  } else if(error) {
    return <ErrorMessage />

  } else {
    return (
      <div className='sidebar'>
        <p>Popular Tags</p>
        <div className="tag-list">
          {response.tags.map(tag => (
            <Link
              className='tag-default tag-pill'
              to={`/tags/${tag}`}
              key={tag}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    );
  }

};

export default PopularTags;