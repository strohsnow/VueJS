interface TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
}

export class BinarySearchTree<T> {
    private root: TreeNode<T> | null = null;

    constructor(private compare: (a: T, b: T) => number) {}

    public search(value: T): TreeNode<T> | null {
        let curr: TreeNode<T> | null = this.root;
        while (curr !== null) {
            const cmp = this.compare(value, curr.value);
            if (cmp === 0) {
                return curr;
            } else if (cmp < 0) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }
        return null;
    }

    public insert(value: T): void {
        const new_node: TreeNode<T> = { value, left: null, right: null };
        if (this.root === null) {
            this.root = new_node;
            return;
        }
        let curr: TreeNode<T> = this.root;
        while (true) {
            const cmp = this.compare(value, curr.value);
            if (cmp < 0) {
                if (curr.left === null) {
                    curr.left = new_node;
                    return;
                }
                curr = curr.left;
            } else {
                if (curr.right === null) {
                    curr.right = new_node;
                    return;
                }
                curr = curr.right;
            }
        }
    }

    public delete(value: T): boolean {
        let curr: TreeNode<T> | null = this.root;
        let par: TreeNode<T> | null = null;

        while (curr !== null) {
            par = curr;
            const cmp = this.compare(value, curr.value);
            if (cmp === 0) {
                break;
            } else if (cmp < 0) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }
        if (curr === null) {
            return false;
        }

        if (curr.left !== null && curr.right !== null) {
            let succ_par = curr;
            let succ = curr.right;
            while (succ.left !== null) {
                succ_par = succ;
                succ = succ.left;
            }
            curr.value = succ.value;
            par = succ_par;
            curr = succ;
        }

        const child = curr.left !== null ? curr.left : curr.right;
        if (par === null) {
            this.root = child;
        } else if (par.left === curr) {
            par.left = child;
        } else {
            par.right = child;
        }

        return true;
    }

    public update(old_value: T, new_value: T): boolean {
        if (this.delete(old_value)) {
            this.insert(new_value);
            return true;
        }
        return false;
    }

    public height(): number {
        const node_height = (n: TreeNode<T> | null): number => {
            if (n === null) {
                return 0;
            }
            const leftH = node_height(n.left);
            const rightH = node_height(n.right);
            return Math.max(leftH, rightH) + 1;
        };
        return node_height(this.root);
    }
}

const tree = new BinarySearchTree<number>((a, b) => a - b);
tree.insert(5);
tree.insert(2);
tree.insert(8);
console.log(tree.search(2));
console.log(tree.delete(5));
tree.update(2, 3);
console.log(tree.height());
