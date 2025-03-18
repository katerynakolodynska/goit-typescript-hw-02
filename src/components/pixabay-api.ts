import axios from "axios";

const KEY = "_rKyQLUGDzl7tzcQK7WcJDurkMLwQ4PnrwJDlA65Dqk";
const BASE_URL = "https://api.unsplash.com/search/photos/";

export interface Image {
  urls: {
    regular: string;
    small: string;
  };
  id: string;
  alt_description: string;
}

export interface Response {
  total: number;
  total_pages: number;
  results: Image[];
}

export async function search(element = "cat", page = 1): Promise<Response> {
  const url = `${BASE_URL}?client_id=${KEY}&orientation=landscape&query=${element}&page=${page}&per_page=12`;
  const response = await axios.get<Response>(url);
  return response.data;
}
