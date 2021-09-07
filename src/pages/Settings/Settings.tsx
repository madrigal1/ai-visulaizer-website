import React from 'react'
import { SearchType } from '../../searches/core';

import './Settings.css';


interface SettingsProps {
    setScreen: (value: string) => {};
    searchType: SearchType;
    setSearchType: (value: string) => {};
}


const Settings: React.FC<SettingsProps> = ({ setScreen, searchType, setSearchType }) => {

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        console.log(value);
        setSearchType(value);
    };
    return (
        <article className="settingsScreen">
            <section className="bannerImage"></section>
            <section className="controlPanel">
                <header>
                    <h1>AI Search Visualizer</h1>
                    <p>Choose your search strategy</p>
                </header>
                <main>
                    <ul>
                        <li>
                            <input type="radio" id="Breadth First Search" name="selector" checked={SearchType.BREADTH_FIRST_SEARCH === searchType} value={SearchType.BREADTH_FIRST_SEARCH} onChange={handleChange} />
                            <label htmlFor="Breadth First Search">Breadth First Search</label>

                            <div className="check"></div>
                        </li>
                        <li>
                            <input type="radio" id="k-option" name="selector" value={SearchType.ASTAR} onChange={handleChange} />
                            <label htmlFor="k-option">A* Search</label>

                            <div className="check"><div className="inside"></div></div>
                        </li>
                        <li>
                            <input type="radio" id="t-option" name="selector" value={SearchType.ITERATIVE_DEEPENING} onChange={handleChange} />
                            <label htmlFor="t-option">Iterative Deepening Search</label>

                            <div className="check"><div className="inside"></div></div>
                        </li>
                        <li>
                            <input type="radio" id="a-option" name="selector" value={SearchType.HILL_CLIMBING} onChange={handleChange} />
                            <label htmlFor="a-option">Hill Climbing</label>

                            <div className="check"><div className="inside"></div></div>
                        </li>
                    </ul>
                </main>
                <div className="graphBtn" onClick={() => setScreen("graph")}>Go to graph</div>
            </section>
        </article>
    )
}

export default Settings
