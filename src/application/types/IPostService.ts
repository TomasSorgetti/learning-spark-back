export interface IPost {
  title: string;
  content: string;
  author: string;
  tags: string[];
  url: string;
  image: string;
  subjectId: string;
}
export interface IGetPostParams {
  page: number;
  limit: number;
  sort: "desc" | "asc";
  search?: string;
  subject?: string;
}

export interface IGetPostResponse {
  posts: IPost[];
  total: number;
  page: number;
  limit: number;
}
