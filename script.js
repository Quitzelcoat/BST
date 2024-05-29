class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    // Sort the array and remove duplicates
    array = [...new Set(array)].sort((a, b) => a - b);

    const buildSubTree = (arr) => {
      if (arr.length === 0) {
        return null;
      }

      const mid = Math.floor(arr.length / 2);
      const node = new Node(arr[mid]);

      node.left = buildSubTree(arr.slice(0, mid));
      node.right = buildSubTree(arr.slice(mid + 1));

      return node;
    };

    return buildSubTree(array);
  }

  insert(value) {
    const insertRecusively = (node, value) => {
      if (node === null) {
        return new Node(value);
      }
      if (value < node.data) {
        node.left = insertRecusively(node.left, value);
      } else if (value > node.data) {
        node.right = insertRecusively(node.right, value);
      }
      return node;
    };

    this.root = insertRecusively(this.root, value);
  }

  deleteItem(value) {
    const deleteRecursively = (node, value) => {
      if (node === null) {
        return null;
      }
      if (value < node.data) {
        node.left = deleteRecursively(node.left, value);
      } else if (value > node.data) {
        node.right = deleteRecursively(node.right, value);
      } else {
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }

        // Node with two children
        node.data = this.findMin(node.right).data;
        node.right = deleteRecursively(node.right, node.data);
      }
      return node;
    };

    this.root = deleteRecursively(this.root, value);
  }

  findMin(node) {
    while (node.left !== null) node = node.left;
    return node;
  }

  find(value) {
    const findRecursively = (node, value) => {
      if (node === null || node.data === value) {
        return node;
      }
      if (value < node.data) {
        return findRecursively(node.left, value);
      }
      if (value > node.data) {
        return findRecursively(node.right, value);
      }
    };

    return findRecursively(this.root, value);
  }

  levelOrder(callback) {
    if (this.root === null) {
      return [];
    }
    const queue = [this.root];
    const result = [];

    while (queue.length > 0) {
      const node = queue.shift();

      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
    if (!callback) {
      return result;
    }
  }

  inOrder(callback) {
    const result = [];

    const inOrderRecursively = (node) => {
      if (node === null) {
        return;
      }

      inOrderRecursively(node.left);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }

      inOrderRecursively(node.right);
    };

    inOrderRecursively(this.root);
    if (!callback) {
      return result;
    }
  }

  preOrder(callback) {
    const result = [];

    const preOrderRecursively = (node) => {
      if (node === null) {
        return;
      }

      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }

      preOrderRecursively(node.left);
      preOrderRecursively(node.right);
    };

    preOrderRecursively(this.root);
    if (!callback) {
      return result;
    }
  }

  postOrder(callback) {
    const result = [];

    const postOrderRecursively = (node) => {
      if (node === null) {
        return;
      }

      postOrderRecursively(node.left);
      postOrderRecursively(node.right);

      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
    };

    postOrderRecursively(this.root);
    if (!callback) {
      return result;
    }
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    const depthRecursively = (currentNode, currentDepth) => {
      if (currentNode === null) {
        return -1;
      }

      if (currentNode === this.root) {
        return currentDepth;
      }

      return depthRecursively(currentNode.parent, currentDepth + 1);
    };

    return depthRecursively(node, 0);
  }

  isBalanced() {
    const checkBalanced = (node) => {
      if (node === null) {
        return true;
      }

      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);

      // check if the difference in height is no more than 1
      if (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        checkBalanced(node.left) &&
        checkBalanced(node.right)
      ) {
        return true;
      }

      return false;
    };

    return checkBalanced(this.root);
  }

  rebalanced() {
    const nodesArray = this.inOrder();
    this.root = this.buildTree(nodesArray);
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

// Helper function to generate an array of random numbers < 100
function generateRandomNumbersArray(length) {
  const randomNumbersArray = [];
  for (let i = 0; i < length; i++) {
    randomNumbersArray.push(Math.floor(Math.random() * 100));
  }
  return randomNumbersArray;
}

// Driver script
const arrayLength = 15; // Length of the random numbers array
const randomNumbers = generateRandomNumbersArray(arrayLength);

// Create a binary search tree from the array of random numbers
const tree = new Tree(randomNumbers);

// Confirm that the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log("--- Tree Traversal Before Unbalancing ---");
console.log("Level Order:");
tree.levelOrder(console.log);
console.log("Pre Order:");
tree.preOrder(console.log);
console.log("Post Order:");
tree.postOrder(console.log);
console.log("In Order:");
tree.inOrder(console.log);

// Unbalance the tree by adding several numbers > 100
const unbalancedNumbers = [101, 102, 103];
unbalancedNumbers.forEach((num) => tree.insert(num));

// Confirm that the tree is unbalanced
console.log("Is the tree unbalanced?", !tree.isBalanced());

// Balance the tree by calling rebalance
tree.rebalanced();

// Confirm that the tree is balanced after rebalancing
console.log("Is the tree balanced after rebalancing?", tree.isBalanced());

// Print out all elements in level, pre, post, and in order after rebalancing
console.log("--- Tree Traversal After Rebalancing ---");
console.log("Level Order:");
tree.levelOrder(console.log);
console.log("Pre Order:");
tree.preOrder(console.log);
console.log("Post Order:");
tree.postOrder(console.log);
console.log("In Order:");
tree.inOrder(console.log);

/*
// Test the Tree class with buildTree method and visualize it
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
prettyPrint(tree.root);

// Insert method
console.log("--- Insert 10 ---");
tree.insert(10);
prettyPrint(tree.root);
// Delete method
console.log("--- Delete 23 ---");
tree.deleteItem(23);
prettyPrint(tree.root);

// find method
console.log("--- Find 10 ---");
const foundNode = tree.find(10);
console.log(foundNode ? foundNode.data : "Node not found");

// Should print array of node values in level order
console.log("--- Level Order Traversal ---");
console.log(tree.levelOrder());
// Should print node values in level order using callback
console.log("--- Level Order Traversal with Callback ---");
tree.levelOrder((node) => console.log(node.data));

// Should print array of node values in in-order
console.log("--- In-order Traversal ---");
console.log(tree.inOrder());
// Should print array of node values in pre-order
console.log("--- Pre-order Traversal ---");
console.log(tree.preOrder());
// Should print array of node values in post-order
console.log("--- Post-order Traversal ---");
console.log(tree.postOrder());
// Should print node values in in-order using callback
console.log("--- In-order Traversal with Callback ---");
tree.inOrder((node) => console.log(node.data));
// Should print node values in pre-order using callback
console.log("--- Pre-order Traversal with Callback ---");
tree.preOrder((node) => console.log(node.data));
// Should print node values in post-order using callback
console.log("--- Post-order Traversal with Callback ---");
tree.postOrder((node) => console.log(node.data));

// Should print the height of the root node
console.log("Height of the root node:", tree.height(tree.root));

// Should print the depth of the root node
console.log("Depth of the root node:", tree.depth(tree.root));

// Should print whether the tree is balanced or not
console.log("Is the tree balanced?", tree.isBalanced());

// Should print whether the tree is balanced or not
console.log("--- Before Rebalancing ---");
console.log("Is the tree balanced?", tree.isBalanced());
tree.rebalanced();
// Should print whether the tree is balanced or not
console.log("--- After Rebalancing ---");
console.log("Is the tree balanced?", tree.isBalanced());
*/
