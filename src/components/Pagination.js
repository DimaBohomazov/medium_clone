import React from 'react';
import classNames from 'classnames'
import {Link} from "react-router-dom";
import {range} from "../utils";

const PaginationItem = ({page, currentPage, url}) => {
  const liClasses = classNames({
    'page-item': true,
    active: currentPage === page
  })
  return (
    <li className={liClasses}>
      <Link
        className='page-link'
        to={`${url}?page=${page}`}
      >
        {page}
      </Link>
    </li>
  )
}

const Pagination = ({total, limit, url, currentPage}) => {
  const pagesCount = Math.ceil(total/limit)
  const pages = range(1, pagesCount)
  return (
    <ul className='pagination'>
      {pages.map(page => (
        <PaginationItem
          page={page}
          currentPage={currentPage}
          url={url}
          key={`page-${page}`}
        />
      ))}
    </ul>
  );
};

export default Pagination;