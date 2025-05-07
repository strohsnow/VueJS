interface Point {
    x: number;
    y: number;
}

function distance(x1: number, y1: number, x2: number, y2: number): number;
function distance(p1: Point, p2: Point): number;

function distance(a: number | Point, b: number | Point, c?: number, d?: number): number {
    if (typeof a === "number" && typeof b === "number" && typeof c === "number" && typeof d === "number") {
        const dx: number = c - a;
        const dy: number = d - b;
        return Math.sqrt(dx * dx + dy * dy);
    }

    if (typeof a === "object" && typeof b === "object" && "x" in a && "y" in a && "x" in b && "y" in b) {
        const p1: Point = a;
        const p2: Point = b;
        const dx: number = p2.x - p1.x;
        const dy: number = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    throw new Error("Invalid arguments");
}

const d1: number = distance(0, 0, 3, 4);
console.log(d1);

const pA: Point = { x: 1, y: 2 };
const pB: Point = { x: 4, y: 6 };
const d2: number = distance(pA, pB);
console.log(d2);
