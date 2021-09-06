import State from '../models/state';
import Stack from './Stack'
const DepthFirstSearch = (initalState: State) => {

    //LIFO queue
    let fringe = new Stack<State>();


    fringe.push(initalState);
    while (!fringe.isEmpty()) {
        let nodeToExpand = fringe.pop() as State;
        if (fringe.has(nodeToExpand))
            continue;
        if (nodeToExpand.isGoal()) {
            return nodeToExpand;
        }
        let successors = nodeToExpand.generateSuccessors();
        for (let child of successors) {
            if (fringe.has(child))
                continue;
            fringe.push(child);
        }
    }
    return null;
}

export default DepthFirstSearch;