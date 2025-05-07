"use strict";
function distance(a, b, c, d) {
    if (typeof a === "number" && typeof b === "number" && typeof c === "number" && typeof d === "number") {
        const dx = c - a;
        const dy = d - b;
        return Math.sqrt(dx * dx + dy * dy);
    }
    if (typeof a === "object" && typeof b === "object" && "x" in a && "y" in a && "x" in b && "y" in b) {
        const p1 = a;
        const p2 = b;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    throw new Error("Invalid arguments");
}
const d1 = distance(0, 0, 3, 4);
console.log(d1);
const pA = { x: 1, y: 2 };
const pB = { x: 4, y: 6 };
const d2 = distance(pA, pB);
console.log(d2);
