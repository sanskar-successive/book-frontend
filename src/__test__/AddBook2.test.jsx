import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { mockBook } from "../mocks/mockBook";
import AddBook2 from "../pages/addBook/AddBook2";

describe("Add Book component", () => {
  test("should renders Add Book Form", async () => {
    render(
      <MemoryRouter initialEntries={['/add-book']}>
        <Routes>
          <Route exact path="/add-book" element={<AddBook2 />} />
        </Routes>
      </MemoryRouter>
    );
    const mainHeading = await screen.findByRole('heading', { name: "Add Book" });
    expect(mainHeading).toBeInTheDocument();

    const titleInput = await screen.findByLabelText(/title/i)
    expect(titleInput).toBeInTheDocument()

    const descriptionInput = await screen.findByLabelText(/description/i)
    expect(descriptionInput).toBeInTheDocument();

    const categoryInput = await screen.findByLabelText(/category/i)
    expect(categoryInput).toBeInTheDocument();

    const langauageInput = await screen.findByLabelText(/language/i)
    expect(langauageInput).toBeInTheDocument();

    const priceInput = await screen.findByLabelText(/price/i)
    expect(priceInput).toBeInTheDocument();

    const ratingInput = await screen.findByLabelText(/rating/i)
    expect(ratingInput).toBeInTheDocument();

    const fileSizeInput = await screen.findByLabelText(/file/i)
    expect(fileSizeInput).toBeInTheDocument();

    const pageCountInput = await screen.findByLabelText(/page/i)
    expect(pageCountInput).toBeInTheDocument();

    const authorNameInput = await screen.findByLabelText(/author name/i)
    expect(authorNameInput).toBeInTheDocument();

    const aboutAuthorInput = await screen.findByLabelText(/about/i)
    expect(aboutAuthorInput).toBeInTheDocument();

    const sellerInput = await screen.findByLabelText(/seller/i)
    expect(sellerInput).toBeInTheDocument();

    const publisherInput = await screen.findByLabelText(/publisher/i)
    expect(publisherInput).toBeInTheDocument();

    const firstPublishedInput = await screen.findByLabelText(/published/i)
    expect(firstPublishedInput).toBeInTheDocument();

    const verifiedInput = await screen.findByLabelText(/verified/i)
    expect(verifiedInput).toBeInTheDocument();

    const editionInput = await screen.findByLabelText(/edition/i)
    expect(editionInput).toBeInTheDocument();

    const addBookButton = await screen.findByRole('button', { name: "Add Book" });
    expect(addBookButton).toBeInTheDocument();

    await userEvent.type(titleInput, mockBook.title);
    expect(titleInput).toHaveValue(mockBook.title);

    await userEvent.type(descriptionInput, mockBook.moreDetails.description);
    expect(descriptionInput).toHaveValue(mockBook.moreDetails.description);

    await userEvent.selectOptions(categoryInput, mockBook.category);
    expect(categoryInput).toHaveValue(mockBook.category);

    await userEvent.selectOptions(langauageInput, mockBook.moreDetails.text_language);
    expect(langauageInput).toHaveValue(mockBook.moreDetails.text_language);

    await userEvent.pointer(priceInput);
    expect(priceInput)

    await userEvent.type(authorNameInput, mockBook.author.name);
    expect(authorNameInput).toHaveValue(mockBook.author.name);

    await userEvent.click(addBookButton);
  });


  test("should renders Add Book Form", async () => {
    render(
      <MemoryRouter initialEntries={['/add-book']}>
        <Routes>
          <Route exact path="/add-book" element={<AddBook2 />} />
        </Routes>
      </MemoryRouter>
    );

    const mainHeading = await screen.findByRole('heading', { name: "Add Book" });
    expect(mainHeading).toBeInTheDocument();

    const titleInput = await screen.findByLabelText(/title/i)
    expect(titleInput).toBeInTheDocument()

    const addBookButton = await screen.findByRole('button', { name: "Add Book" });
    expect(addBookButton).toBeInTheDocument();


    await userEvent.type(titleInput, "title");
    expect(titleInput).toHaveValue("title");

    await userEvent.click(addBookButton);

  });

  test("should renders Add Book Form with prefilled values", async () => {
    render(
      <MemoryRouter initialEntries={['/add-book/validBookId']}>
        <Routes>
          <Route exact path="/add-book/:bookId" element={<AddBook2 />} />
        </Routes>
      </MemoryRouter>
    );
    const mainHeading = await screen.findByRole('heading', { name: "Add Book" });
    expect(mainHeading).toBeInTheDocument();

    const titleInput = await screen.findByLabelText(/title/i)
    expect(titleInput).toBeInTheDocument()


    const addBookButton = await screen.findByRole('button', { name: "Add Book" });
    expect(addBookButton).toBeInTheDocument();


    await userEvent.type(titleInput, "title");
    expect(titleInput).toHaveValue(`${mockBook.title}title`);

    await userEvent.click(addBookButton);
  });

  test("should renders error scenario", async () => {
    render(
      <MemoryRouter initialEntries={['/add-book/invalidBookId']}>
        <Routes>
          <Route exact path="/add-book/:bookId" element={<AddBook2 />} />
        </Routes>
      </MemoryRouter>
    );
    const errorText = await screen.findByRole('heading', {name : "Oops! Something went wrong"});
    expect(errorText).toBeInTheDocument();
  });
});
