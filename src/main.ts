import nodeCluster from "node:cluster";
import State, { Position } from "./models/state";
import BreadthFirstSearch from "./searches/BreadthFirstSearch";
import { IData, SearchType } from "./searches/core";
import DepthFirstSearch from "./searches/DepthFirstSearch";
import DepthLimitedSearch from "./searches/DepthLimitedSearch";
// let data: IData = {
//     nodes: [],
//     links: [],
// };
const printSolution = (solution: State) => {
    if (null == solution) {
        console.log("\nNo solution found.");
    } else {
        console.log("\nSolution (cannibalLeft,missionaryLeft,boat,cannibalRight,missionaryRight): ");
        let path: Array<State> = [];
        let state = solution;
        while (null != state) {
            path.push(state);
            state = state.getParentState() as State;
        }

        let depth = path.length - 1;
        for (let i = depth; i >= 0; i--) {
            state = path[i];
            if (state.isGoal()) {
                console.log(state.toString());
            } else {
                console.log(state.toString() + " -> ");
            }
        }
        console.log("\nDepth: " + depth);
    }
}
const getSolution = (solution: State): IData => {
    let res: IData = {
        nodes: [],
        links: []
    }
    if (null == solution) {
        console.log("\nNo solution found.");
        return res;
    } else {
        console.log("\nSolution (cannibalLeft,missionaryLeft,boat,cannibalRight,missionaryRight): ");
        let path: Array<State> = [];
        let state: State = solution;
        while (null != state) {
            path.push(state);
            state = state.getParentState() as State;
        }

        let depth: number = path.length - 1;
        res.nodes.push({ id: path[depth].toString() });
        for (let i = depth - 1; i >= 0; i--) {
            let curr = path[i];
            let parent = path[i + 1];
            res.nodes.push({ id: curr.toString() });
            res.links.push({
                source: parent.toString(),
                target: curr.toString(),
            })
        }
        console.log("\nDepth: " + depth);
        console.log("graph_data", res);
        return res;
    }
}
const getGraphData = async (search_type: SearchType): Promise<IData> => {
    let initialState = new State(3, 3, Position.LEFT, 0, 0);
    let goalState;
    switch (search_type) {
        case SearchType.BREADTH_FIRST_SEARCH:
            goalState = await BreadthFirstSearch(initialState);
            break;
        case SearchType.DEPTH_LIMITED_SEARCH:
            goalState = await DepthLimitedSearch(initialState);
            break;
        case SearchType.DEPTH_FIRST_SEARCH:
            goalState = await DepthFirstSearch(initialState);
            break;
        default:
            goalState = await BreadthFirstSearch(initialState);
    }
    printSolution(goalState as State);
    // return res;
    return getSolution(goalState as State);
}
export default getGraphData