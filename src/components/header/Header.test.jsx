import { screen, render } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

describe("Header", () => {
  test("render header", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const headerElement = screen.getByRole("header");
    expect(headerElement).toBeInTheDocument();

    // const searchElement = screen.getByTestId("search-component");
    // expect(searchElement).toBeInTheDocument();

  });

});
