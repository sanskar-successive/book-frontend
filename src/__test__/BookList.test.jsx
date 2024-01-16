import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test} from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BookList from "../pages/bookList/BookList";
import { mockBookList } from "../mocks/mockBookList";
import userEvent from "@testing-library/user-event";

describe("Book List Page", () => {
  
  test("should renders book list", async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<BookList />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', {name: /loading/i})).toBeInTheDocument();
    const bookListItem = await screen.findAllByRole("book-list-item");
    expect(bookListItem).toHaveLength(mockBookList.length)

    const filterButton = screen.getByRole('button', {name : "Filters"});
    await userEvent.click(filterButton);
  });

  test("should renders error", async () => {
    render(
      <MemoryRouter initialEntries={["/?invalidQuery=invalid"]}>
        <Routes>
          <Route path="/" element={<BookList />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', {name: /loading/i})).toBeInTheDocument();
    const errorText = await screen.findByRole('heading', {name : "Oops! Something went wrong"});
    expect(errorText).toBeInTheDocument();
  });
});
