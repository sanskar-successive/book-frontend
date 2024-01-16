import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Sidebar from "../components/sidebar/Sidebar";

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
    test("navigates to the correct route when a link is clicked", async () => {
      render(
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      );
      await userEvent.click(screen.getByRole("link", { name: "Book List" }));
      expect(window.location.pathname).toBe("/");

      await userEvent.click(screen.getByRole("link", {name: "Add Book"}));
      expect(window.location.pathname).toBe("/add-book");

      await userEvent.click(screen.getByRole('link', {name : "Upload File"}))
      expect(window.location.pathname).toBe("/upload-file")

      await userEvent.click(screen.getByRole('link', {name : "Bulk Uploads"}))
      expect(window.location.pathname).toBe("/bulk-uploads");
    });
});
