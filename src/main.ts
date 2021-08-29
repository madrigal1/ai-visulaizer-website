import State, { Position } from "./models/state";
import BreadthFirstSearch from "./searches/BreadthFirstSearch";
// let data: IData = {
//     nodes: [],
//     links: [],
// };

const getSolution = (solution: State): Array<State> | null => {
    if (null == solution) {
        console.log("\nNo solution found.");
        return null;
    } else {
        console.log("\nSolution (cannibalLeft,missionaryLeft,boat,cannibalRight,missionaryRight): ");
        let path: Array<State> = [];
        let state: State = solution;
        while (null != state) {
            path.push(state);
            state = state.getParentState() as State;
        }

        let depth: number = path.length - 1;
        for (let i = depth; i >= 0; i--) {
            state = path[i];
            if (state.isGoal()) {
                console.log(state.toString());
            } else {
                console.log(state.toString() + " -> ");
            }
        }
        console.log("\nDepth: " + depth);
        return path;
    }
}
const getGraphData = async () => {
    let initialState = new State(3, 3, Position.LEFT, 0, 0);
    let goalState = await BreadthFirstSearch(initialState);
    // return res;
    return;
}
export default getGraphData