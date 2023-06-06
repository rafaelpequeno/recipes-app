import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const emailLocal = localStorage.getItem('user');
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

      <span data-testid="profile-email">{emailLocal}</span>
      <button
        data-testid="profile-done-btn"
        onClick={ goToDoneRecipes }
      >
        Done recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ goToFavoriteRecipes }
      >
        Favorite recipes
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
