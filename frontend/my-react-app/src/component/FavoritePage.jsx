import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../App';
import axios from 'axios';

export const FavoritePage = () => {
    const [favorites, setFavorites] = useState([]);
    const { auth } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/favorites', {
            headers: { Authorization: `Bearer ${auth.token}` }
          });
          setFavorites(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      if (auth) {
        fetchFavorites();
      }
    }, [auth]);
  
    return (
      <div>
        <h2>Favorites</h2>
        <div>
          {favorites.map(favorite => (
            <div key={favorite.country}>
              <h3>{favorite.country}</h3>
            </div>
          ))}
        </div>
      </div>
    );
}
