export const optimalHMimplementation = [
  `If we have a big enough bucket we won’t have collisions thus the search time would be O(1). However, how do we know how big a hash map capacity should big? 100? 1,000? A million?`,
  `Having allocated massive amounts of memory is impractical. So, what we can do is to have the hash map automatically resize itself based on a load factor. This operation is called Rehash.`,
  `The load factor is the measurement of how full is a hash map. We can get the load factor by dividing the number of items by the bucket size.`,
  `This will be our latest and greatest hash map implementation:`,
  `Show optimal Hash Map implementation:`,
];
