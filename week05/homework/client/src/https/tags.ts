import axios from "./index";

async function getAllTags(): Promise<Tag[]> {
  const response = await axios.get(`/tags/all`);
  const responseTagList: Tag[] = response.data.data;

  return responseTagList;
}

async function addTags(name: string): Promise<string> {
  const response = await axios.post(`/tags/add`, {
    name: name,
  });
  return response.data.data;
}

async function deleteTags(key: string): Promise<string> {
  const response = await axios.get(`/tags/delete?key=${key}`);
  return response.data.ok;
}

async function modifyTags(tag: Tag): Promise<string> {
  const response = await axios.post(`/tags/modify`, {
    tag,
  });
  return response.data.msg;
}

export { getAllTags, addTags, deleteTags, modifyTags };
