import React, { useState } from 'react';
import CitySelector from './components/citySelector/CitySelector';
import Weather from './components/weather/Weather';
import { IconSettings } from '@salesforce/design-system-react';

const RetrieveCities = () => {
  return [{name: 'Chicago', stateAbbreviation: 'Il', zipCode: '60605'},
          {name: 'Dallas', stateAbbreviation: 'Tx',  zipCode: '75219'},
          {name: 'Milwaukee', stateAbbreviation: 'Wi',  zipCode: '53202'},
          {name: 'Minneapolis', stateAbbreviation: 'Mn',  zipCode: '55402'}]
}


const App = () => {
  const availableCities = RetrieveCities()
  const [selectedCity, setSelectedCity] = useState()

  return (

    <header class="slds-global-header_container">
      <div class="slds-global-header slds-text-heading_large">Penrod's Weather Dashboard</div>
      <IconSettings iconPath="/icons">
        <div className="slds-m-around_large">
          <CitySelector citySelected={setSelectedCity} cities={availableCities} />
          <Weather city={selectedCity} />
        </div>
        </IconSettings>
    </header>

  );
}

export default App;
