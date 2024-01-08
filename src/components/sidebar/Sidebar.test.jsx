import { render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

describe("Sidebar Component", () => {
  test("renders Sidebar with navigation links", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const bookListLink = screen.getByRole("link", {
      name: "Book List",
    });
    expect(bookListLink).toBeInTheDocument();

    const addBookLink = screen.getByRole("link", {
      name: "Add Book",
    });
    expect(addBookLink).toBeInTheDocument();

    const uploadFileLink = screen.getByRole("link", {
      name: "Upload File",
    });
    expect(uploadFileLink).toBeInTheDocument();

    const bulkUploadsLink = screen.getByRole("link", { name: "Bulk Uploads" });
    expect(bulkUploadsLink).toBeInTheDocument();
  }),
    test("navigates to the correct route when a link is clicked", () => {
      render(
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      );

      act(() => {
        screen
          .getByRole("link", {
            name: "Book List",
          })
          .click();
      });
      expect(window.location.pathname).toBe("/");

      act(() => {
        screen
          .getByRole("link", {
            name: "Add Book",
          })
          .click();
      });
      expect(window.location.pathname).toBe("/add-book");

      act(() => {
        screen
          .getByRole("link", {
            name: "Upload File",
          })
          .click();
      });
      expect(window.location.pathname).toBe("/upload-file");

      act(() => {
        screen
          .getByRole("link", {
            name: "Bulk Uploads",
          })
          .click();
      });
      expect(window.location.pathname).toBe("/bulk-uploads");

    });
});
