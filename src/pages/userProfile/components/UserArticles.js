import React, {Fragment, useEffect} from 'react';
import {stringify} from "query-string";
import {getPaginator, limit} from "../../../utils";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import Feed from "../../../components/Feed";
import Pagination from "../../../components/Pagination";

const getApiUrl = ({username, offset, isFavorites}) => {
  const params = isFavorites
    ? {limit, offset, favorited: username}
    : {limit, offset, author: username}
  return `/articles?${stringify(params)}`
}

const UserArticles = ({username, location, isFavorites, url}) => {
  const {offset, currentPage} = getPaginator(location.search)
  const apiUrl = getApiUrl({username, offset, isFavorites})
  const[{response, isLoading, error}, doFetch] = useFetch(apiUrl)
  console.log(username)

  useEffect(() => {
    doFetch()
  }, [doFetch, isFavorites, username])

  return (
    <div>
      {isLoading && <Loading/>}
      {error && <ErrorMessage/>}
      {!isLoading && response && (
        <Fragment>
          <Feed
            articles={response.articles}
          />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </Fragment>
      )}
    </div>
  );
};

export default UserArticles;