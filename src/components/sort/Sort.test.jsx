import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Sort from "./Sort";
import userEvent from "@testing-library/user-event";

const sortOptions = [
  "newest",
  "title",
  "price low to high",
  "price high to low",
  "popularity",
];

describe("Sort component", () => {
  test("should render sort component", async () => {
    render(
      <BrowserRouter>
        <Sort />
      </BrowserRouter>
    );

    const sortbuttons = screen.getAllByRole("button");
    expect(sortbuttons).toHaveLength(sortOptions.length);

    for(let i=0;i<sortOptions.length;i++){
        await userEvent.click(sortbuttons[i])
        expect(window.location.hash.includes(sortbuttons[i]))
    }

  });
});
