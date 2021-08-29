import { useEffect, useState } from 'react';
import './App.css';
import ForceGraph from './components/ForceGraph';
import Settings from './pages/Settings/Settings';
import { SearchType } from './searches/core';

function App() {
  const [screen, setScreen] = useState("settings");
  const [searchType, setSearchType] = useState(SearchType.BREADTH_FIRST_SEARCH)
  return (
    <div className="App">
      {screen === "graph" && <ForceGraph search_type={searchType} />}
      {screen === "settings" && <Settings searchType={searchType} setSearchType={setSearchType} setScreen={setScreen} />}
    </div>
  );
}

export default App;
