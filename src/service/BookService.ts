import axios from "axios";
import { BookResDto } from "../dtos/BookResDto";

// const api = axios.create({
//   baseURL: "http://localhost:3000/",
// });

export const BookService = {
  async getBooks(page?: number): Promise<Response> {
    const response = await fetch("/api/book?page=" + page, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bWJhaGl6Iiwicm9sZXMiOlsiQWRtaW4iLCJTYWxlcyJdLCJpYXQiOjE3MDYxNDYyODMsImV4cCI6MTcwNjE0OTg4M30.QUFpFfKd85JR7VT_9deu73tD3aesJNzYuhmtAZQG3ic",
      },
    });
    // const resJson = await response.json();
    // const dtos: BookResDto[] = resJson.data;
    return response.json();
  },

  async delete(id: string): Promise<void> {
    axios.delete(`/api/book/${id}`, {
      method: "DELETE",
      headers: { "content-type": "applicaiton/json" },
    });
  },
};
