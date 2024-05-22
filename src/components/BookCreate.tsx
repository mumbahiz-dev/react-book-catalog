import { useEffect, useState } from "react";
import { AuthorService } from "../service/AuthorService";
import { AuthorDto } from "../dtos/AuthorDto";
import { Select, Space } from "antd";
import { CategoryService } from "../service/CategoryService";
import { CategoryDto } from "../dtos/CategoryDto.1";
import { PublisherService } from "../service/PublisherService";
import { PublihserDto } from "../dtos/PublisherDtos";

export default function BookCreate() {
  const [authors, setAuthor] = useState<AuthorDto[]>();
  const [categories, setCategory] = useState<CategoryDto[]>();
  const [publishers, setPublisher] = useState<PublihserDto[]>();

  useEffect(() => {
    findAuthor();
    findCategories();
    findPubishers();
  }, []);

  async function findAuthor() {
    const response: AuthorDto[] = await AuthorService.getAuthor();
    setAuthor(response);
  }

  async function findCategories() {
    const categories = await CategoryService.getCategories();
    console.log(categories);
    setCategory(categories);
  }

  async function findPubishers() {
    const publihsers = await PublisherService.findBuplishers();
    setPublisher(publihsers);
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <main className="container h-100">
      <h1>Tambah Data Buku</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Judul
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
          ></input>
          <label htmlFor="description" className="form-label">
            Deskripsi
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
          ></input>
          <label htmlFor="release_date" className="form-label">
            Tanggal Terbit
          </label>
          <input
            type="date"
            className="form-control"
            id="release_date"
            name="release_date"
          ></input>
          <label htmlFor="author" className="form-label">
            Penulis
          </label>
          <select id="disabledSelect" className="form-select">
            {authors?.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Kategori
          </label>
          <select id="disabledSelect" className="form-select">
            {categories?.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Penerbit
          </label>
          <select id="disabledSelect" className="form-select">
            {publishers?.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          ></input>
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </main>
  );
}
