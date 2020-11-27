import React from 'react';
import { useState } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { useFlexSearch } from 'react-use-flexsearch';
import Moment from 'react-moment';

const Component = ({ data }) => {
  const { index, store } = data.localSearchArticles;
  const [query, setQuery] = useState('');

  const searchArticles = useFlexSearch(query, index, store);
  const onChange = event => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <div>
        <nav className="uk-navbar-container" data-uk-navbar>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li>
                <Link to="/">{data.strapiGlobal.siteName}</Link>
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <div>
              <a
                className="uk-navbar-toggle"
                data-uk-search-icon
                href=""
                aria-label="Show Search"
              ></a>
              <div
                className="uk-drop"
                data-uk-drop="mode: click; pos: left-center; offset: 0"
              >
                <form className="uk-search uk-search-navbar uk-width-1-1 navbar-search">
                  <input
                    className="uk-search-input"
                    type="search"
                    placeholder="Search..."
                    autoFocus={true}
                    aria-label="Search"
                    value={query}
                    onChange={onChange}
                  />
                </form>
                <ul className="uk-nav uk-dropdown-nav uk-nav-default searchbar-results">
                  {searchArticles.map(article => (
                    <li key={`article_${article.slug}`}>
                      <Link to={`/article/${article.slug}`}>
                        {`${article.title} - `}
                        <span className="uk-text-meta">
                          <Moment format="MMM Do YYYY">
                            {article.published_at}
                          </Moment>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="uk-button uk-button-default uk-margin-right"
              type="button"
            >
              Categories
            </button>
            <div uk-dropdown="animation: uk-animation-slide-top-small; duration: 1000">
              <ul className="uk-nav uk-dropdown-nav">
                {data.allStrapiCategory.edges.map((category, i) => (
                  <li key={`category__${category.node.slug}`}>
                    <Link to={`/category/${category.node.slug}`}>
                      {category.node.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

const Nav = () => (
  <StaticQuery
    query={graphql`
      query {
        localSearchArticles {
          index
          store
        }
        strapiGlobal {
          siteName
        }
        allStrapiCategory {
          edges {
            node {
              slug
              name
            }
          }
        }
      }
    `}
    render={data => <Component data={data} />}
  />
);

export default Nav;
