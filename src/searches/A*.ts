import State from "../models/state";
import PriorityQueue from 'ts-priority-queue'
import { Comparator } from "ts-priority-queue/src/PriorityQueue";

const heuresticFunction: Comparator<State> = (a: State, b: State) => {
    return (a.getFx() - b.getFx());
}
const aStar = async (initialState: State) => {
    if (!initialState) return null;
    var searchNodes = new PriorityQueue<State>({ comparator: heuresticFunction });
    searchNodes.queue(initialState);
    while (!searchNodes.peek().isGoal()) {
        let searchNode = searchNodes.dequeue();
        for (let neigh of searchNode.generateSuccessors()) {
            searchNodes.queue(neigh);
        }
    }
    return searchNodes.peek();
}

export default aStar;