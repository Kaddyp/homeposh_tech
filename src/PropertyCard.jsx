import { useState } from 'react';
import { FaBookmark } from 'react-icons/fa';
import Placeholder from './house-placeholder.png';

function PropertyCard({ property, onAddToBookmark, onRemoveFromBookmark }) {
  const [activeClass, setActiveClass] = useState('text-yellow-400');

  const bookMarkHandler = (event, property) =>{
    if(activeClass === 'text-yellow-400'){
      setActiveClass('text-red-400');
      onAddToBookmark(property);
    }
    else{
      setActiveClass('text-yellow-400');
      onRemoveFromBookmark(property);
    }
  }

  return (
    <div className="border-2 bg-gray-50">
      <div className="relative">
        <img src={ property.photos[0] !== undefined ? `https://mr0.homeflow.co.uk/${property.photos[0]}` : Placeholder } alt={property.display_address} />

        <button className="absolute top-0 right-2" title="Click to bookmark this property" onClick={(event) => {bookMarkHandler(event, property)}}>
          <FaBookmark className={activeClass} size="40" />
        </button>

        <p className="absolute bottom-0 right-0 px-2 py-1 border-t border-l bg-gray-50">{property.price}</p>
      </div>

      <div className="px-3 py-2">
        <p>{property.display_address}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
