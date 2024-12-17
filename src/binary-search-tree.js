const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null; // Initialize the root of the tree
  }

  root() {
    return this.rootNode; // Return the root node of the tree
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode; // If the tree is empty, set the new node as root
    } else {
      this._addNode(this.rootNode, newNode); // Otherwise, add it to the tree
    }
  }

  _addNode(node, newNode) {
    if (newNode.data < node.data) {
      // If the new node's data is less than the current node's data
      if (!node.left) {
        node.left = newNode; // Place the new node as the left child
      } else {
        this._addNode(node.left, newNode); // Recur on the left subtree
      }
    } else {
      // If the new node's data is greater than or equal to the current node's data
      if (!node.right) {
        node.right = newNode; // Place the new node as the right child
      } else {
        this._addNode(node.right, newNode); // Recur on the right subtree
      }
    }
  }

  has(data) {
    return this._hasNode(this.rootNode, data); // Check if the tree has the given data
  }

  _hasNode(node, data) {
    if (!node) {
      return false; // Base case: if the node is null, the data is not found
    }
    if (data === node.data) {
      return true; // Data found
    }
    return data < node.data
      ? this._hasNode(node.left, data) // Search in the left subtree
      : this._hasNode(node.right, data); // Search in the right subtree
  }

  find(data) {
    return this._findNode(this.rootNode, data); // Find and return the node with the given data
  }

  _findNode(node, data) {
    if (!node) {
      return null; // Base case: if the node is null, return null
    }
    if (data === node.data) {
      return node; // Data found
    }
    return data < node.data
      ? this._findNode(node.left, data) // Search in the left subtree
      : this._findNode(node.right, data); // Search in the right subtree
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data); // Remove the node with the given data
  }

  _removeNode(node, data) {
    if (!node) {
      return null; // Base case: if the node is null, return null
    }
    if (data < node.data) {
      node.left = this._removeNode(node.left, data); // Recur on the left subtree
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data); // Recur on the right subtree
      return node;
    } else {
      // Node with the data found
      if (!node.left && !node.right) {
        return null; // Case 1: No children
      }
      if (!node.left) {
        return node.right; // Case 2: One child (right)
      }
      if (!node.right) {
        return node.left; // Case 2: One child (left)
      }
      // Case 3: Two children
      const minRightNode = this._findMinNode(node.right); // Find the minimum node in the right subtree
      node.data = minRightNode.data; // Replace the current node's data with the minimum value
      node.right = this._removeNode(node.right, minRightNode.data); // Remove the minimum node
      return node;
    }
  }

  min() {
    if (!this.rootNode) {
      return null; // If the tree is empty, return null
    }
    return this._findMinNode(this.rootNode).data; // Return the minimum value
  }

  _findMinNode(node) {
    while (node.left) {
      node = node.left; // Traverse to the leftmost node
    }
    return node; // Return the minimum node
  }

  max() {
    if (!this.rootNode) {
      return null; // If the tree is empty, return null
    }
    return this._findMaxNode(this.rootNode).data; // Return the maximum value
  }

  _findMaxNode(node) {
    while (node.right) {
      node = node.right; // Traverse to the rightmost node
    }
    return node; // Return the maximum node
  }
}

module.exports = {
  BinarySearchTree
};