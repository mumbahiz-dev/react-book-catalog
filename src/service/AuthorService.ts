import axios from "axios";

export const AuthorService = {
  async getAuthor(): Promise<Response> {
    const response = await axios.get("/api/author", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
    });
    return response.data;
  },
};
