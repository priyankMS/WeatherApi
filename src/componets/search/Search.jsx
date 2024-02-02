import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import {GEO_API_URL,geoApiOptions} from ".//../Api"
console.log(GEO_API_URL);

function Search({onSearchChange}) {

  const [seach,setSearch] = useState(null)

  const loadOptions = (inputValue) =>{
     return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
      )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city)=>{
            return {
              value:`${city.latitude} ${city.longitude}`,
              label:`${city.name} ,${city.countryCode}`,
            };
          }),
        };
      })
      .catch(err => console.error(err) )
        
  }


  

  const handleOnChange = (searchData) =>{
    setSearch(searchData);
    onSearchChange(searchData)
  }
  return (
    <AsyncPaginate 
       placeholder="search for the city"
       value={seach}
       debounceTimeout={600}
       onChange={handleOnChange}
       loadOptions={loadOptions}
    />
  )
}

export default Search