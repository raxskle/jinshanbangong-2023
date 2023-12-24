interface Data {
  id?: number;
  time: string;
  description: string;
  key: string;
  name: string;
  tags: {
    id?: number;
    key: string;
    name: string;
  }[];
}

interface ToAddData {
  name: string;
  description: string;
  tagKeys: string[];
}

interface Tag {
  id?: number;
  key: string;
  name: string;
}

interface ToAddTag {
  name: string;
}
