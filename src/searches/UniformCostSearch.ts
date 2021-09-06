import { initial } from "lodash";
import PriorityQueue from "ts-priority-queue";
import { Comparator } from "ts-priority-queue/src/PriorityQueue";
import State from "../models/state";

const pathCostFunc: Comparator<State> = (a: State, b: State) => {
    return (a.getDepth() - b.getDepth());
}
const UniformCostSearch = (initialState: State) => {
    let frontier = new PriorityQueue({ comparator: pathCostFunc });
    frontier.queue(initialState);
    let reached: Record<string, number> = {};
    let solution: State | null = null;
    while (frontier.length > 0) {
        if (solution) {
            if (frontier.peek().getDepth() >= solution.getDepth()) {
                return;
            }
        }
        let parent = frontier.dequeue();
        for (let child of parent.generateSuccessors()) {
            if (!reached[child.toString()] || child.getDepth() < reached[child.toString()]) {
                reached[child.toString()] = child.getDepth();
                frontier.queue(child);
                if (!solution || (child.isGoal() && child.getDepth() < solution.getDepth()))
                    solution = child;
            }
        }
    }
    return solution;
}

export default UniformCostSearch;