import { useState, useEffect } from 'react';
import Header from './Header';
import PropertyCard from './PropertyCard';

function App() {
  const [properties, setProperties] = useState();
  const [filteredData,setFilteredData] = useState(properties);
  // use this state to keep track of the user's saved/bookmarked properties
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const fetchPropertyData = async () => {
      const response = await fetch('/property-data.json');
      const json = await response.json();

      setProperties(json.result.properties.elements);
      setFilteredData(json.result.properties.elements);
    };

    fetchPropertyData();
  }, []);

  // use this filter properties
  const filterPropertyData = (keyword) => {
      var output = (keyword === '') ? properties : filteredData.filter((item)=>{          
          return item.short_description.toLowerCase().indexOf(keyword.toLowerCase()) > -1;                    
      });
      setProperties(output);
  }
  // use this to keep track of the user's saved/bookmarked properties
  const onAddToBookmark = (property) =>{
    const exist = properties.find((x) => x.property_id === property.property_id);
    if (exist) {
      setSavedProperties([...savedProperties, {...property}]);      
    }
  }
  // use this to keep track of the user's removed/bookmarked properties
  const onRemoveFromBookmark = (property) => {
    const exist = properties.find((x) => x.property_id === property.property_id);
    if(exist){
      setSavedProperties(savedProperties.filter((x) => x.property_id !== property.property_id));
    }
  }

  
  //console.log(savedProperties);
  return (
    <div className="container mx-auto my-5">
      <Header searchText={filterPropertyData}/>

      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!!properties && properties.map((property) => <PropertyCard key={property.property_id} property={property} onAddToBookmark={onAddToBookmark} onRemoveFromBookmark={onRemoveFromBookmark}/>)}
      </div>
    </div>
  );
}

export default App;
