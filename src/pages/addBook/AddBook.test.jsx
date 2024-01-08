import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AddBook from "./AddBook";
import userEvent from "@testing-library/user-event";
import { mockBook } from "../../mocks/mockBook";

describe("Add Book component", () => {
  test("should renders Add Book Form", async () => {
    render(
      <BrowserRouter>
        <AddBook/>
      </BrowserRouter>
    );

    expect(screen.queryByText(/loading/i))

    // const mainHeading = screen.queryByText("Add Book");
    // expect(mainHeading).toBeInTheDocument();
   

    const form  = await screen.findByRole('form');

    expect(form).toHaveFormValues({
      
    })

    // await userEvent.type(screen.findByLabelText("Description"))
 

    // await userEvent.type(screen.findByLabelText("Category"))
   

    // await userEvent.type(screen.findByLabelText("Language"))

    // await userEvent.type(screen.findByLabelText("Price"))
  

    // await userEvent.type(screen.findByLabelText("Rating"))
   


    // await userEvent.type(screen.findByLabelText("File Size"))
  

    // await userEvent.type(screen.findByLabelText("Page Count"))
   

    // await userEvent.type(screen.findByLabelText("Author"))
  


    // await userEvent.type(screen.findByLabelText("About Author"))
 

    // await userEvent.type(screen.findByLabelText("Seller"))


    // await userEvent.type(screen.findByLabelText("Publisher"))

    // await userEvent.type(screen.findByLabelText("First Published"))


    // await userEvent.type(screen.findByLabelText("Verified"))


    // await userEvent.type(screen.findByLabelText("Edition"))
  

    // await userEvent.type(screen.findByLabelText("Cover Image"))


    // await userEvent.click(screen.findByRole('button'))

    // expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  });
});
