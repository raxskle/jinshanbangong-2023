export const formatDate = (timestamp) => {
  // 传进来的时间戳应该是以秒为单位的
  timestamp = timestamp * 1000;
  const D = new Date(timestamp);
  const year = D.getFullYear();
  const month = D.getMonth() + 1;
  const date = D.getDate();
  return `${year}-${month}-${date}`;
};
