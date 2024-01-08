import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import BookList from "./BookList";
import { mockBookList } from "../../mocks/mockBookList";

describe("Bulk Upload List Page", () => {
  test("should renders bulk upload list", async () => {
    render(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const table = await screen.findByRole('table')
    expect(table).toBeInTheDocument()

    const bookListItem = screen.queryAllByRole("book-list-item");
    console.log(bookListItem);
    expect(bookListItem)

    expect(screen.queryByText(/loading/i)).toBeNull();
  });
});
