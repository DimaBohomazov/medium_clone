import React, {useEffect, useContext, useState} from 'react';
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import TagList from "../../components/TagList";
import {Link, Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUser";

const Article = (props) => {
  const slug = props.match.params.slug
  const apiUrl = `/articles/${slug}`
  const [{response: fetchArticleResponse, isLoading: fetchIsloading, error: fetchError}, doFetch] = useFetch(apiUrl)
  const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl)
  const [currentUserState] = useContext(CurrentUserContext)
  const [isSuccessfullDelete,setIsSuccessfullDelete] = useState(false)

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
      return false
    }
    return fetchArticleResponse.article.author.username === currentUserState.currentUser.username
  }

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete'
    })
  }

  useEffect(() => {
    doFetch()
  },[doFetch])

  useEffect(() => {
    if (!deleteArticleResponse) {
      return
    }
    setIsSuccessfullDelete(true)
  }, [deleteArticleResponse])

  if (isSuccessfullDelete) {
    return <Redirect to='/' />
  }

  return (
    <div className='article-page'>
      <div className="banner">
        {!fetchIsloading && fetchArticleResponse && (
          <div className='container'>
            <h1>
              {fetchArticleResponse.article.title}
            </h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img
                  src={fetchArticleResponse.article.author.image ? fetchArticleResponse.article.author.image : 'https://images-na.ssl-images-amazon.com/images/I/41jrhrQiEHL._SX331_BO1,204,203,200_.jpg' }
                  alt="author"
                />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className='date'>
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              <span>
                <Link
                  className='btn btn-outline-secondary btn-sm'
                  to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                >
                  <i className='ion-edit' />
                  Edit Article
                </Link>
                <button
                  className='btn btn-outline-danger btn-sm'
                  onClick={deleteArticle}
                >
                  <i className="ion-trash-a" />
                  Delete Article
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchIsloading && <Loading />}
        {fetchError && <ErrorMessage />}
        {!fetchIsloading && fetchArticleResponse && (
          <div className='row article-content'>
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList
                tags={fetchArticleResponse.article.tagList}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;