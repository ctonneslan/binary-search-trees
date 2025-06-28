// Balanced Binary Search Tree with prettyPrint CLI output only

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (!array.length) return null;
    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));
    return root;
  }

  insert(value, root = this.root) {
    if (!root) return new Node(value);
    if (value < root.data) root.left = this.insert(value, root.left);
    else if (value > root.data) root.right = this.insert(value, root.right);
    return root;
  }

  deleteItem(value, root = this.root) {
    if (!root) return null;
    if (value < root.data) root.left = this.deleteItem(value, root.left);
    else if (value > root.data) root.right = this.deleteItem(value, root.right);
    else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      let successor = root.right;
      while (successor.left) successor = successor.left;
      root.data = successor.data;
      root.right = this.deleteItem(successor.data, root.right);
    }
    return root;
  }

  find(value, root = this.root) {
    if (!root) return null;
    if (value === root.data) return root;
    return value < root.data
      ? this.find(value, root.left)
      : this.find(value, root.right);
  }

  levelOrder(callback) {
    if (!callback) throw new Error("Callback required");
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!root) return;
    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  preOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!root) return;
    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!root) return;
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  height(node) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(value, node = this.root, depth = 0) {
    if (!node) return null;
    if (value === node.data) return depth;
    return value < node.data
      ? this.depth(value, node.left, depth + 1)
      : this.depth(value, node.right, depth + 1);
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    const balanced = Math.abs(leftHeight - rightHeight) <= 1;
    return (
      balanced && this.isBalanced(node.left) && this.isBalanced(node.right)
    );
  }

  rebalance() {
    const nodes = [];
    this.inOrder((node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Driver script
const runDriverScript = () => {
  const randomArray = Array.from({ length: 15 }, () =>
    Math.floor(Math.random() * 100)
  );
  let tree = new Tree(randomArray);

  console.log("Initial Tree:");
  prettyPrint(tree.root);
  console.log("\nBalanced:", tree.isBalanced());

  console.log("\nTraversals:");
  console.log("Level Order:");
  tree.levelOrder((n) => process.stdout.write(n.data + " "));
  console.log("\nIn Order:");
  tree.inOrder((n) => process.stdout.write(n.data + " "));
  console.log("\nPre Order:");
  tree.preOrder((n) => process.stdout.write(n.data + " "));
  console.log("\nPost Order:");
  tree.postOrder((n) => process.stdout.write(n.data + " "));

  // Unbalance the tree
  [101, 150, 120, 170, 200].forEach((val) => tree.insert(val));
  console.log("\n\nAfter Unbalancing:");
  prettyPrint(tree.root);
  console.log("\nBalanced:", tree.isBalanced());

  // Rebalance
  tree.rebalance();
  console.log("\nAfter Rebalancing:");
  prettyPrint(tree.root);
  console.log("\nBalanced:", tree.isBalanced());

  console.log("\nTraversals After Rebalance:");
  console.log("Level Order:");
  tree.levelOrder((n) => process.stdout.write(n.data + " "));
  console.log("\nIn Order:");
  tree.inOrder((n) => process.stdout.write(n.data + " "));
  console.log("\nPre Order:");
  tree.preOrder((n) => process.stdout.write(n.data + " "));
  console.log("\nPost Order:");
  tree.postOrder((n) => process.stdout.write(n.data + " "));
};

runDriverScript();
