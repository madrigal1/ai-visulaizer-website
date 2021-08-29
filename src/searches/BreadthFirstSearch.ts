import State from "../models/state";
import Queue from "./Queue";

const BreadthFirstSearch = async (initialState: State): Promise<State | null> => {
    if (initialState.isGoal()) {
        return initialState;
    }

    const frontier = new Queue<State>();	// FIFO queue
    let explored = new Set<State>();
    frontier.enqueue(initialState);
    while (true) {
        if (frontier.isEmpty()) {
            return null;	// failure
        }
        let state = frontier.front() as State;
        frontier.dequeue();
        explored.add(state as State);
        let successors = state.generateSuccessors();
        for (let child of successors) {
            if (!explored.has(child) || !frontier.has(child)) {
                if (child.isGoal()) {
                    console.log(child.toString());
                    console.log("generated", frontier);
                    console.log("explored", explored);
                    return child;
                }
                frontier.enqueue(child);
            }
        }
    }
}
export default BreadthFirstSearch;
