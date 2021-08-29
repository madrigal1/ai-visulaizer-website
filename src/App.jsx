import { useEffect } from 'react';
import './App.css';
import ForceGraph from './components/ForceGraph';
import getGraphData from './main';

function App() {
  useEffect(() => {
    getGraphData();
  });
  return (
    <div className="App">
      <div className="graph">
        {/* <ForceGraph /> */}
      </div>
      <div className="settings">

      </div>
    </div>
  );
}

export default App;
