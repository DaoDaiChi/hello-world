import './App.css';
import React, { useState } from 'react';
import RuleFormat from './Components/RuleFormat';
import ClubAdd from './Components/ClubAdd';
import PlayerAdd from './Components/PlayerAdd';

const App = () => {
  const [ageLimit, setAgeLimit] = useState(20); // Giá trị mặc định của giới hạn tuổi là 20

  const handleAgeLimitChange = (newAgeLimit) => {
    setAgeLimit(newAgeLimit);
  };

  return (
    <div className="App">
      <RuleFormat onAgeLimitChange={handleAgeLimitChange} />
      <ClubAdd />
      <PlayerAdd ageLimit={ageLimit} />
    </div>
  );
}

export default App;
