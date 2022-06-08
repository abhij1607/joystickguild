export const sortOldestFirst = (arr) => {
  arr.sort((a, b) => {
    return a.data.dateCreated - b.data.dateCreated;
  });
  return arr;
};

export const sortLatestFirst = (arr) => {
  arr.sort((a, b) => {
    return b.data.dateCreated - a.data.dateCreated;
  });
  return arr;
};

export const sortByTrending = (arr) => {
  arr.sort((a, b) => {
    return b.data.likes - a.data.likes;
  });
  return arr;
};

export const sortPosts = (arr, sortOrder) => {
  switch (sortOrder) {
    case "OLDEST":
      return sortOldestFirst(arr);

    case "LATEST":
      return sortLatestFirst(arr);

    case "TRENDING":
      return sortByTrending(arr);

    default:
      return arr;
  }
};
