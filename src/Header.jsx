import SearchBox from './SearchBox';

function Header(props) {
  // use this to pass props to the parent component
  const handleSearch = (value) =>{
    props.searchText(value);
  }
  return (
    <header className="flex flex-col md:flex-row justify-between">
      <h1 className="text-8xl">
        Posh Properties
      </h1>

      <SearchBox handleSearch={handleSearch}/>
    </header>
  );
}

export default Header;
