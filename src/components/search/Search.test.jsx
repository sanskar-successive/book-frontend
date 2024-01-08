import { screen, render, act } from "@testing-library/react";
import Search from "./Search";
import { BrowserRouter } from "react-router-dom";

describe("Search", () => {
  test("finding search input and search button", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole("button");
    expect(searchButton).toBeInTheDocument();
  });

  test("testing search input change and button click effect on url search query", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    act(() => {
      screen.getByRole("textbox");
    });

    const searchButtonClick = screen.getByRole("button");
  });
});
