import State from '../models/state';
import Stack from './Stack'
const DepthFirstSearch = (initalState: State) => {

    //LIFO queue
    const fringe = new Stack<State>();


    fringe.push(initalState);

    while (!fringe.isEmpty()) {
        let nodeToExpand = fringe.pop() as State;

        if (nodeToExpand.isGoal()) {
            return nodeToExpand;
        }

        let successors = nodeToExpand.generateSuccessors();
        for (let child of successors) {
            fringe.push(child);
        }
    }
    return null;
}

export default DepthFirstSearch;