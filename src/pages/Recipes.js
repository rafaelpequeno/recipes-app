import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes() {
  return (
    <>
      <Header renderSearchComponent={ true } title="Meals" />
      <Footer />
    </>
  );
}

export default Recipes;
