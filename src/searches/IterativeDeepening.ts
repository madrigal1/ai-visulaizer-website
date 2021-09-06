import State from "../models/state";


const IterativeDeepening = (initialState: State): State | null => {
    let limit = 40;
    return recursiveID(initialState, limit);
}

const recursiveID = (state: State, limit: number): State | null => {
    if (state.isGoal()) {
        return state;
    } else if (limit === 0) {
        return null;
    } else {
        let successors = state.generateSuccessors();
        for (let child of successors) {
            let result = recursiveID(child, limit - 1);
            if (null !== result) {
                return result;
            }
        }
        return null;
    }
}

export default IterativeDeepening;