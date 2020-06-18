import React from "react";
import {Switch, Route} from 'react-router-dom'
import GlobalFeed from './pages/globalFeed'
import TagFeed from './pages/tagFeed'
import YourFeed from './pages/yourFeed'
import Article from './pages/article'
import Authentication from './pages/authentication'
import CreateArticle from './pages/createArticle'
import EditArticle from './pages/editArticle'

export default () => {
  return (
    <Switch>
      <Route path='/articles/new' component={CreateArticle} />
      <Route path='/articles/:slug/edit' component={EditArticle} />
      <Route path='/articles/:slug' component={Article} />
      <Route path='/login' component={Authentication} />
      <Route path='/register' component={Authentication} />
      <Route path='/tags/:slug' component={TagFeed} />
      <Route path='/feed' component={YourFeed} />
      <Route path='/' component={GlobalFeed} exact/>
    </Switch>
  )
}