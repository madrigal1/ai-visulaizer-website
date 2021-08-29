import State from "../models/state";

const DepthLimitedSearch = async (initialState: State): Promise<State | null> => {
    let limit = 20;
    return recursiveDLS(initialState, limit);
}

let recursiveDLS = (state: State, limit: number): State | null => {
    if (state.isGoal()) {
        return state;
    } else if (limit <= 0) {
        return null;
    } else {
        let successors: Array<State> = state.generateSuccessors();
        for (let child of successors) {
            let result: State = recursiveDLS(child, limit - 1) as State;
            if (null != result) {
                return result;
            }
        }
        return null;
    }
}

export default DepthLimitedSearch;