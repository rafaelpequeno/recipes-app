import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function Recipes() {
  return (
    <>
      <SearchBar renderSearchComponent={ true } title="Meals" />
      <Footer />
    </>
  );
}

export default Recipes;
