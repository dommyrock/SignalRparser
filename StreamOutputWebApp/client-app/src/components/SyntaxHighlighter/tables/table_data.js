export const algorithmHeaders = [
  "Algorithm",
  "Data structure",
  "Time complexity:Best",
  "Time complexity:Average",
  "Time complexity:Worst",
  "Space complexity:Worst",
];
//Sorting algorithms TC
export const algorithmRows = [
  ["Quick sort", "Array", "O(n log(n))", "O(n log(n))", "O(n2)", "O(n)"],
  ["Merge sort", "Array", "O(n log(n))", "O(n log(n))", "O(n log(n))", "O(n)"],
  ["Heap sort", "Array", "O(n log(n))", "O(n log(n))", "O(n log(n))", "O(1)"],
  ["Smooth sort", "Array", "O(n)", "O(n log(n))", "O(n log(n))", "O(1)"],
  ["Buble sort", "Array", "O(n)", "O(n2)", "O(n2)", "O(1)"],
  ["Insertion sort", "Array", "O(n)", "O(n2)", "O(n2)", "O(1)"],
  ["Selection sort", "Array", "O(n2)", "O(n2)", "O(n2)", "O(1)"],
  ["Bogo sort", "Array", "O(n)", "O(n n!)", "O(∞)", "O(1)"],
];

//Data structures TC
export const dataStructureHeaders = [
  "Data structure",
  "Avg: Indexing",
  "Avg: Search",
  "Avg: Insertion",
  "Avg: Deletion",
  "Worst: Indexing",
  "Worst: Search",
  "Worst: Insertion",
  "Worst: Deletion",
  "Space complexity:worst",
];
export const dataStructureRows = [
  ["Basic array", "O(1)", "O(n)", "—", "—", "O(1)", "O(n)", "—", "—", "O(n)"],
  ["Dynamic array", "O(1)", "O(n)", "O(n)", "—", "O(1)", "O(n)", "O(n)", "—", "O(n)"],
  ["Singly linked", "list	O(n)", "O(n)", "O(1)", "O(1)", "O(n)", "O(n)", "O(1)", "O(1)", "O(n)"],
  ["Doubly linked", "list	O(n)", "O(n)", "O(1)", "O(1)", "O(n)", "O(n)", "O(1)", "O(1)", "O(n)"],
  ["Hash table", "—", "O(1)", "O(1)", "O(1)", "—", "O(n)", "O(n)", "O(n)", "O(n)"],
  ["Binary search tree", "—", "O(log (n))", "O(log (n))", "O(log (n))", "—", "O(n)", "O(n)", "O(n)", "O(n)"],
  ,
  ["B-tree", "—", "O(log (n))", "O(log (n))", "O(log (n))", "—", "O(log (n))", "O(log (n))", "O(log (n))", "O(n)"],
  ,
  [
    "Red-black tree",
    "—",
    "O(log (n))",
    "O(log (n))",
    "O(log (n))",
    "—",
    "O(log (n))",
    "O(log (n))",
    "O(log (n))",
    "O(n)",
  ],
  ,
  ["AVL tree", "—", "O(log (n))", "O(log (n))", "O(log (n))", "—", "O(log (n))", "O(log (n))", "O(log (n))", "O(n)"],
  ,
];
/**function description example
 * @param commonJSfunc
 * param description example
 */
export const commonJSfunc = [
  ["array.push", "O(1)", "Insert element to the end of the array"],
  ["array.pop", "O(1)", "Remove element to the end of the array"],
  ["array.shift", "O(n)", "Remove element to the beginning of the"],
  ["array.unshift", "O(n)", "Insert element(s) to the beginning of the"],
  ["array.slice", "O(n)", "Returns a copy of the array from beginning"],
  ["array.splice", "O(n)", "Changes (add/remove) the array"],
];
export const commonJSfuncHeaders = ["Function", "Runtime", "Description"];

//Array operations time complexity
export const arrayOTCHeaders = ["Operation", "Worst"];
export const arrayOTC = [
  ["Access (Array.[])", "O(1)"],
  ["Insert head (Array.unshift)", "O(n)"],
  ["Insert tail (Array.push)", "O(1)"],
  ["Search (for value)", "O(n)"],
  ["Delete (Array.splice)", "O(n)"],
];
