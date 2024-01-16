import { screen, render } from "@testing-library/react";
import { describe, expect, test} from "vitest";
import Search from "../components/search/Search";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Search Component", () => {
  test("should render search component", async () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
    const searchButton = screen.getByRole("button");
    expect(searchButton).toBeInTheDocument();

    await userEvent.type(searchInput, "searchQuery");
    expect(searchInput).toHaveValue("searchQuery");

    await userEvent.click(searchButton);
    expect(window.location.search).toBe("?search=searchQuery")
    
  });
});
