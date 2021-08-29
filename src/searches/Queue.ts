interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
    isEmpty(): boolean;
    front(): string | T;
}


export default class Queue<T> implements IQueue<T> {
    private storage: T[] = [];

    constructor(private max_capacity: number = Infinity) { }

    enqueue(item: T): void {
        if (this.size() === this.max_capacity) {
            throw Error("Queue has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }
    dequeue(): T | undefined {
        if (this.size() === 0) {
            throw Error("Queue has no elements, cannot remove");
        }
        return this.storage.shift();
    }
    front() {
        if (this.isEmpty())
            return "No elements in Queue";
        return this.storage[0];
    }
    size(): number {
        return this.storage.length;
    }
    isEmpty(): boolean {
        return this.storage.length === 0;
    }
    has(item: T): boolean {
        for (let ele of this.storage) {
            if (ele === item) {
                return true;
            }
        }
        return false;
    }
}