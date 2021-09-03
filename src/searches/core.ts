import State from "../models/state";

export interface IData {
    nodes: Array<{ id: string }>;
    links: Array<{ source: string, target: string }>;
}

export enum SearchType {
    BREADTH_FIRST_SEARCH = "breadth_first_search",
    DEPTH_FIRST_SEARCH = "depth_first_search",
    DEPTH_LIMITED_SEARCH = "depth_limited_search",
    ITERATIVE_DEEPENING = "iterative_deepening",
    UNIFORM_COST = "uniform_cost",
    BIDIRECTIONAL = "bidirectional",
    ASTAR = "astar"
}

export const checkCycle = (state: State): boolean => {
    let parent = state.getParentState();
    if (!parent)
        return true;
    if (parent != null && !parent.equals(state))
        return true;
    return false;
}
