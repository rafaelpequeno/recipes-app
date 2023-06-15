import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('user')) || {});
  }, []);

  const history = useHistory();

  const goToDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const goToFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />

      <p data-testid="profile-email">{email.email}</p>
      <button
        data-testid="profile-done-btn"
        onClick={ goToDoneRecipes }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ goToFavoriteRecipes }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}

export default Profile;
