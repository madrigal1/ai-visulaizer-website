export enum Position {
    LEFT = "left",
    RIGHT = "right"
}
export default class State {

    private cannibalLeft: number;
    private missionaryLeft: number;
    private cannibalRight: number;
    private missionaryRight: number;
    private boat: Position;
    private depth: number;
    private parentState: State | null;

    constructor(cannibalLeft: number, missionaryLeft: number, boat: Position,
        cannibalRight: number, missionaryRight: number) {
        this.cannibalLeft = cannibalLeft;
        this.missionaryLeft = missionaryLeft;
        this.boat = boat;
        this.cannibalRight = cannibalRight;
        this.missionaryRight = missionaryRight;
        this.parentState = null;
        this.depth = 0;
    }

    public isGoal(): boolean {
        return this.cannibalLeft == 0 && this.missionaryLeft == 0;
    }

    public getDepth(): number {
        return this.depth;
    }
    public setDepth(depth: number): void {
        this.depth = depth;
    }
    public numberOfPplOnLeft(): number {
        // let num = this.boat == Position.RIGHT?1:0;
        return this.missionaryLeft + this.cannibalLeft;
    }
    public isValid(): boolean {
        if (this.missionaryLeft >= 0 && this.missionaryRight >= 0 && this.cannibalLeft >= 0 && this.cannibalRight >= 0
            && (this.missionaryLeft == 0 || this.missionaryLeft >= this.cannibalLeft)
            && (this.missionaryRight == 0 || this.missionaryRight >= this.cannibalRight)) {
            return true;
        }
        return false;
    }

    public generateSuccessors(): Array<State> {
        let successors: Array<State> = [];
        if (this.boat == Position.LEFT) {
            this.testAndAdd(successors, new State(this.cannibalLeft, this.missionaryLeft - 2, Position.RIGHT,
                this.cannibalRight, this.missionaryRight + 2)); // Two missionaries cross left to right.
            this.testAndAdd(successors, new State(this.cannibalLeft - 2, this.missionaryLeft, Position.RIGHT,
                this.cannibalRight + 2, this.missionaryRight)); // Two cannibals cross left to right.
            this.testAndAdd(successors, new State(this.cannibalLeft - 1, this.missionaryLeft - 1, Position.RIGHT,
                this.cannibalRight + 1, this.missionaryRight + 1)); // One missionary and one cannibal cross left to right.
            this.testAndAdd(successors, new State(this.cannibalLeft, this.missionaryLeft - 1, Position.RIGHT,
                this.cannibalRight, this.missionaryRight + 1)); // One missionary crosses left to right.
            this.testAndAdd(successors, new State(this.cannibalLeft - 1, this.missionaryLeft, Position.RIGHT,
                this.cannibalRight + 1, this.missionaryRight)); // One cannibal crosses left to right.
        } else {
            this.testAndAdd(successors, new State(this.cannibalLeft, this.missionaryLeft + 2, Position.LEFT,
                this.cannibalRight, this.missionaryRight - 2)); // Two missionaries cross right to left.
            this.testAndAdd(successors, new State(this.cannibalLeft + 2, this.missionaryLeft, Position.LEFT,
                this.cannibalRight - 2, this.missionaryRight)); // Two cannibals cross right to left.
            this.testAndAdd(successors, new State(this.cannibalLeft + 1, this.missionaryLeft + 1, Position.LEFT,
                this.cannibalRight - 1, this.missionaryRight - 1)); // One missionary and one cannibal cross right to left.
            this.testAndAdd(successors, new State(this.cannibalLeft, this.missionaryLeft + 1, Position.LEFT,
                this.cannibalRight, this.missionaryRight - 1)); // One missionary crosses right to left.
            this.testAndAdd(successors, new State(this.cannibalLeft + 1, this.missionaryLeft, Position.LEFT,
                this.cannibalRight - 1, this.missionaryRight)); // One cannibal crosses right to left.
        }
        return successors;
    }

    private testAndAdd(successors: Array<State>, newState: State) {
        if (!newState.isValid())
            return;
        if (!newState.parentState || (newState.parentState && !newState.parentState.equals(newState))) {
            newState.setParentState(this);
            newState.setDepth(this.depth + 1);
            successors.push(newState);
        }
    }

    public getFx(): number {
        return this.numberOfPplOnLeft() + this.depth;
    }

    public getCannibalLeft(): number {
        return this.cannibalLeft;
    }

    public setCannibalLeft(cannibalLeft: number) {
        this.cannibalLeft = cannibalLeft;
    }

    public getMissionaryLeft(): number {
        return this.missionaryLeft;
    }

    public setMissionaryLeft(missionaryLeft: number) {
        this.missionaryLeft = missionaryLeft;
    }

    public getCannibalRight(): number {
        return this.cannibalRight;
    }

    public setCannibalRight(cannibalRight: number) {
        this.cannibalRight = cannibalRight;
    }

    public getMissionaryRight(): number {
        return this.missionaryRight;
    }

    public setMissionaryRight(missionaryRight: number) {
        this.missionaryRight = missionaryRight;
    }

    public goToLeft() {
        this.boat = Position.LEFT;
    }
    public goToRight() {
        this.boat = Position.RIGHT;
    }

    public isOnLeft(): boolean {
        return this.boat == Position.LEFT;
    }

    public isOnRigth(): boolean {
        return this.boat == Position.RIGHT;
    }

    public getParentState(): State | null {
        return this.parentState;
    }

    public setParentState(parentState: State | null) {
        this.parentState = parentState;
    }

    public toString(): string {
        if (this.boat == Position.LEFT) {
            return "(" + this.cannibalLeft + "," + this.missionaryLeft + ",L,"
                + this.cannibalRight + "," + this.missionaryRight + ")";
        } else {
            return "(" + this.cannibalLeft + "," + this.missionaryLeft + ",R,"
                + this.cannibalRight + "," + this.missionaryRight + ")";
        }
    }

    public equals(s: State) {

        return (s.cannibalLeft === this.cannibalLeft && s.missionaryLeft === this.missionaryLeft
            && s.boat === this.boat && s.cannibalRight === this.cannibalRight
            && s.missionaryRight === this.missionaryRight);
    }
}
