import { Comparator } from "ts-priority-queue/src/PriorityQueue";
import State from "../models/state";
import PriorityQueue from 'ts-priority-queue'
const maxNode: Comparator<State> = (a: State, b: State) => {
    return (b.getFx() - a.getFx());
}
export const HillClimbing = (intialState: State) => {
    let current = intialState;
    console.log("hil climbing used");
    let limit = 1000;
    while (true) {
        let neighbors = new PriorityQueue({ comparator: maxNode, initialValues: current.generateSuccessors() })
        let maxNeigh = neighbors.dequeue();
        console.log(maxNeigh);
        if (maxNeigh.getFx() <= current.getFx())
            return current;
        current = maxNeigh;
        if (limit-- < 0) return;
    }
}