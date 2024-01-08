import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
  test("should render header", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const headerElement = screen.getByRole("header");
    expect(headerElement).toBeInTheDocument();

    const searchElement = screen.queryByTestId("search-component");
    expect(searchElement)

  });

});
