import axios from "./index";

async function getAllData(): Promise<Data[]> {
  const response = await axios.get(`/data/all`);
  const responseDataList: Data[] = response.data.data;

  return responseDataList;
}

async function searchData(options: {
  name: string;
  time: string;
  tagKeys: string[];
}): Promise<Data[]> {
  const { name, time, tagKeys } = options;
  const response = await axios.get(
    `/data/search?name=${name}&time=${time}&tagKeys=${JSON.stringify(tagKeys)}`
  );
  const responseDataList: Data[] = response.data.data;

  return responseDataList;
}

async function addData(
  name: string,
  description: string,
  tagKeys: string[]
): Promise<string> {
  const response = await axios.post(`/data/add`, {
    name,
    description,
    tagKeys,
  });
  return response.data.data;
}

async function deleteData(key: string): Promise<string> {
  const response = await axios.get(`/data/delete?key=${key}`);
  return response.data.data;
}

async function modifyData(data: Data, tagKeys: string[]): Promise<string> {
  const response = await axios.post(`/data/modify`, {
    data,
    tagKeys,
  });
  return response.data.data;
}

export { getAllData, searchData, addData, deleteData, modifyData };
