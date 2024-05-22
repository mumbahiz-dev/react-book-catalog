import React, { useEffect, useState } from "react";
import { BookResDto } from "../dtos/BookResDto";
import { BookService } from "../service/BookService";
import { PageMetaDto } from "../dtos/PageMetaDto";
import { Modal, NotificationArgsProps, notification } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type NotificationPlacement = NotificationArgsProps["placement"];

export default function Book() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookResDto[]>();
  const [page, setPage] = useState<PageMetaDto>();
  const [offset, setOffset] = useState(0);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    findBooks(1);
  }, []);

  async function findBooks(page: number) {
    const resService = await BookService.getBooks(page);
    const data: BookResDto[] = resService.data;
    const pageMeta: PageMetaDto = resService.meta;
    setBooks(data);
    setPage(pageMeta);

    const start = page - 1;
    const number = start * pageMeta.take + 1;
    setOffset(number);
  }

  async function deleteBook(id: string) {
    BookService.delete(id);
    openNotification("topRight");
    findBooks(1);
  }

  const warning = (id: string) => {
    Modal.confirm({
      title: "Apakah anda yakin ingin menghapus data ?",
      okText: "Ya",
      cancelText: "Tidak",
      onOk() {
        deleteBook(id);
      },
    });
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.success({
      duration: 2,
      message: "Berhasil menghapus data",
      placement,
    });
  };

  return (
    <>
      {contextHolder}
      <main className="container h-100">
        <div>
          <h1>Daftar Buku</h1>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/book/create")}
          >
            Tambah Data
          </button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Judul</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Kategori</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {books?.map((book, index) => (
                <tr key={book.id}>
                  <th scope="row">{index + offset}</th>
                  <td>{book.title}</td>
                  <td>{book.description}</td>
                  <td>{book.category}</td>
                  <td>
                    <div className="">
                      <EditTwoTone
                        onClick={() => openNotification("topRight")}
                      />
                      <DeleteTwoTone onClick={() => warning(book.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination align-items-center justify-content-center">
            <li className="page-item">
              <a
                className={
                  page?.hasPreviousPage ? "page-link" : "page-link disabled"
                }
                onClick={() => findBooks(page ? page.page - 1 : 0)}
              >
                Previous
              </a>
            </li>
            {Array.from(Array(page?.pageCount), (e, i) => {
              return (
                <li
                  key={i + 1}
                  className={
                    page?.page === i + 1 ? "page-item disabled" : "page-item"
                  }
                >
                  <a className="page-link" onClick={() => findBooks(i + 1)}>
                    {i + 1}
                  </a>
                </li>
              );
            })}
            <li className="page-item">
              <a
                className={
                  page?.hasNextPage ? "page-link" : "page-link disabled"
                }
                onClick={() => findBooks(page ? page.page + 1 : 0)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}
