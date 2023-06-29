import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import doneLogo from '../images/Group 10.svg';
import favLogo from '../images/Group 9.svg';
import logoutLogo from '../images/Group 10.svg';
import '../styles/Profile.css';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('user')) || {});
  }, []);

  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">{email.email}</p>
      <div className="profile-buttons">
        <label htmlFor="done">Done Recipes</label>
        <img
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          src={ doneLogo }
          alt="Done Logo"
          aria-hidden="true"
          id="done"
        />
        <label htmlFor="fav-recipes">Favorite Recipes</label>
        <img
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
          src={ favLogo }
          alt="Favorite Recipes Logo"
          aria-hidden="true"
          id="fav-recipes"
        />
        <label htmlFor="logOut">Logout</label>
        <img
          data-testid="profile-logout-btn"
          onClick={ logout }
          src={ logoutLogo }
          alt="logout Logo"
          aria-hidden="true"
          id="logOut"
        />
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
