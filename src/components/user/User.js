import React, { useContext, Fragment, useEffect } from 'react';
import Spinnner from '../layout/Spinner';

import { Link } from 'react-router-dom';
import Repos from '../repos/Repos.js';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { getUser, user, loading, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    login,
    html_url,
    followers,
    following,
    public_gists,
    public_repos,
    hireable,
    blog,
    company,
  } = user;

  if (loading) return <Spinnner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable:
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            alt=''
            className='round-img'
            style={{ width: '150px' }}
          />
          <h1> {name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              {' '}
              <h3>Bio</h3> <p>{bio}</p>{' '}
            </Fragment>
          )}
          <a href={html_url} className='btn btn-primary my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: {company}</strong>
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>
                    Website: <a href={`https://${blog}`}>{blog}</a>{' '}
                  </strong>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
        <div className='car text-centre'>
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-success'>Following: {following}</div>
          <div className='badge badge-light'>Public repos: {public_repos}</div>
          <div className='badge badge-dark'>Public gists: {public_gists}</div>
        </div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
