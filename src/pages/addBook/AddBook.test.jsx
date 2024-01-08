import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { mockBook } from "../../mocks/mockBook";
import AddBook from "./AddBook";
import userEvent from "@testing-library/user-event";

describe("Add Book component", () => {
  test("should renders Add Book Form", async () => {
    render(
      <BrowserRouter>
        <AddBook/>
      </BrowserRouter>
    );

    // expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // await screen.findByText("Add Book");


    userEvent.type(screen.findAllByLabelText("Title"));


    userEvent.type(screen.getByLabelText("Description"))
 

    userEvent.type(screen.getByLabelText("Category"))
   

    userEvent.type(screen.getByLabelText("Language"))

    userEvent.type(screen.getByLabelText("Price"))
  

    userEvent.type(screen.getByLabelText("Rating"))
   


    userEvent.type(screen.getByLabelText("File Size"))
  

    userEvent.type(screen.getByLabelText("Page Count"))
   

    userEvent.type(screen.getByLabelText("Author"))
  


    userEvent.type(screen.getByLabelText("About Author"))
 

    userEvent.type(screen.getByLabelText("Seller"))


    userEvent.type(screen.getByLabelText("Publisher"))

    userEvent.type(screen.getByLabelText("First Published"))


    userEvent.type(screen.getByLabelText("Verified"))


    userEvent.type(screen.getByLabelText("Edition"))
  

    userEvent.type(screen.getByLabelText("Cover Image"))


    userEvent.click(screen.getByRole('button'))

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  });
});
