import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BookListItem from "./BookListItem";
import user from "@testing-library/user-event";
const axios = require('axios')


const book = {
    _id: '123',
    title: 'Sample Book',
    author: { name: 'John Doe' },
    price: 200,
    rating: 4,
    coverImage: 'sample-cover.jpg',
  };
  

// jest.mock(axios)

describe("book list item", () => {

  test("render book list item ui", () => {
    render(
      <BrowserRouter>
        <BookListItem item={book} />
      </BrowserRouter>
    );

    expect(screen.getByAltText(`${book.title} cover`)).toBeInTheDocument();
    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText(`Author: ${book.author.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Price: $${book.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${book.rating}/5`)).toBeInTheDocument();
    expect(screen.getByRole('button', {name : "view"})).toBeInTheDocument();
    expect(screen.getByRole('button', {name : "edit"})).toBeInTheDocument();
    expect(screen.getByRole('button', {name : "delete"})).toBeInTheDocument();

  });

  test("navigates to view page when view button is clicked", async () => {
    user.setup();
    render(
      <BrowserRouter>
        <BookListItem item={book} />
      </BrowserRouter>
    );

    await user.click(screen.getByRole("button", { name: "view" }));
    expect(window.location.pathname).toBe(`/${book._id}`);
  });


  test("navigates to edit page when view button is clicked", async () => {
    user.setup();
    render(
      <BrowserRouter>
        <BookListItem item={book} />
      </BrowserRouter>
    );

    await user.click(screen.getByRole("button", { name: "edit" }));
    expect(window.location.pathname).toBe(`/add-book/${item._id}`);
  });

  test("displays deletion popup when delete button is clicked", async () => {
    user.setup();
    render(
      <BrowserRouter>
        <BookListItem item={book} />
      </BrowserRouter>
    );

    await user.click(screen.getByRole("button", { name: 'delete' }));
    expect(
      screen.getByText("Are you sure to delete this item?")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  test('cancels deletion when "Cancel" is clicked on deletion popup', async () => {
    user.setup();
    render(
      <BrowserRouter>
        <BookListItem item={book} />
      </BrowserRouter>
    );

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(
      screen.queryByText("Are you sure to delete this item?")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Yes" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Cancel" })
    ).not.toBeInTheDocument();
  });



});
