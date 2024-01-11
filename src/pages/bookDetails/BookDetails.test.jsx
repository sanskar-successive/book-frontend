import { render, screen } from "@testing-library/react";
import BookDetails from "./BookDetails";
import { describe, test, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { mockBook } from "../../mocks/mockBook";

describe("Book Details component", () => {
  test("should render error", async () => {
    render(
      <MemoryRouter initialEntries={['/book/invalidBookId']}>
        <Routes>
          <Route path="book/:bookId" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const loadingText = screen.getByRole('heading', {name: /loading/i});
    expect(loadingText).toBeInTheDocument();

    const errorText = await screen.findByRole('heading', {name : "not found"});
    expect(errorText).toBeInTheDocument();
  });

  test("should renders book details", async () => {
    render(
      <MemoryRouter initialEntries={['/book/validBookId']}>
        <Routes>
          <Route path="book/:bookId" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const loadingText = screen.getByRole('heading', {name: /loading/i});
    expect(loadingText).toBeInTheDocument();


    const bookCoverImage = await screen.findByAltText(/cover/i);
    expect(bookCoverImage).toBeInTheDocument()
    const bookDetailsTable = await screen.findByRole('table');
    expect(bookDetailsTable).toBeInTheDocument();
  });
});
