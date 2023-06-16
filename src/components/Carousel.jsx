import React, { useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import myContext from '../context/myContext';

function Carousel() {
  const { carouselData } = useContext(myContext);

  const carouselLength = 6;

  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <span className="meals-details-carousel">
      <h2 className="meals-details-h2-title">Recommended</h2>
      <Slider { ...settings }>
        {carouselData
          .slice(0, carouselLength)
          .map((recipe, index) => (
            <div
              key={ recipe.idMeal || recipe.idDrink }
              data-testid={ `${index}-recommendation-card` }
            >
              <span>
                <img
                  className="d-block w-100 meals-details-picture-carousel"
                  src={ recipe.strMealThumb || recipe.strDrinkThumb }
                  alt="Recipe thumb"
                  width="140"
                />
                <h3
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recipe.strMeal || recipe.strDrink }
                </h3>
              </span>
            </div>
          ))}
      </Slider>
    </span>
  );
}

export default Carousel;
