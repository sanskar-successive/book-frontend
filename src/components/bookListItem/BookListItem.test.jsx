import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BookListItem from "./BookListItem";
import { describe, expect, test } from "vitest";
import { mockBook } from "../../mocks/mockBook";
import userEvent from "@testing-library/user-event";


describe("book list item component", () => {

  test("should render book list item", () => {

    render(
      <BrowserRouter>
        <BookListItem item={mockBook} />
      </BrowserRouter>
    );
  
    expect(screen.getByAltText(`${mockBook.title} cover`)).toBeInTheDocument();
    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(`Author: ${mockBook.author.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Price: $${mockBook.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${mockBook.rating}/5`)).toBeInTheDocument();
    expect(screen.getByRole('button', {name : "view"})).toBeInTheDocument();
    expect(screen.getByRole('button', {name : "edit"})).toBeInTheDocument();
    expect(screen.getByRole('button', {name : "delete"})).toBeInTheDocument();

  });

  test("navigates to view page when view button is clicked", async () => {

    render(
      <BrowserRouter>
        <BookListItem item={mockBook} />
      </BrowserRouter>
    );
  

    await userEvent.click(screen.getByRole("button", { name: "view" }));
    expect(window.location.pathname).toBe(`/book/${mockBook._id}`);
  });


  test("navigates to edit page when view button is clicked", async () => {

    render(
      <BrowserRouter>
        <BookListItem item={mockBook} />
      </BrowserRouter>
    );
  
    await userEvent.click(screen.getByRole("button", { name: "edit" }));
    expect(window.location.pathname).toBe(`/add-book/${mockBook._id}`);
  });

  test("displays deletion popup when delete button is clicked", async () => {

    render(
      <BrowserRouter>
        <BookListItem item={mockBook} />
      </BrowserRouter>
    );
  
    await userEvent.click(screen.getByRole("button", { name: 'delete' }));
    expect(screen.getByText("Are you sure to delete this item?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  test('cancels deletion when "Cancel" button is clicked on deletion popup', async () => {

    render(
      <BrowserRouter>
        <BookListItem item={mockBook} />
      </BrowserRouter>
    );
  
    await userEvent.click(screen.queryByRole("button", { name: "Cancel" }));

    expect(screen.queryByText("Are you sure to delete this item?")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Yes" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Cancel" })).not.toBeInTheDocument();
  });

});
