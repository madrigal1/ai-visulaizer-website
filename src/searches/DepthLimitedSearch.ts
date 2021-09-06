import State from "../models/state";
import Stack from "./Stack";


const DepthLimitedSearch = async (initialState: State): Promise<State | null> => {
    const limit = 100;
    let frontier = new Stack<State>();
    frontier.push(initialState);
    while (!frontier.isEmpty()) {
        let parent = frontier.pop() as State;
        if (parent.getDepth() > limit) {
            return null;
        } else {
            for (let child of parent.generateSuccessors()) {
                if (child.isGoal())
                    return child;
                if (!frontier.has(child))
                    frontier.push(child);
            }
        }
    }
    return null;
}

export default DepthLimitedSearch;