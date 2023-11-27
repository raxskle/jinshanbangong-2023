/**
 * 请求hot或new的json
 *
 * @param {string} source - "hot"|"new"
 * @returns {object} JSON
 */
export const getData = async (source) => {
  const res = await fetch(`/dengzhifeng/week03/homework/data/${source}.json`)
    .then((res) => {
      console.log("请求成功");
      return res.json();
    })
    .catch((err) => {
      console.log("请求错误", err);
    });

  return res;
};
