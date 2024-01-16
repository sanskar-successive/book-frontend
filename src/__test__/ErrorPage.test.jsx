import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/errorPage/ErrorPage";


describe("Error page", () => {
  test("renders error page", () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('heading', {name : "Oops! Something went wrong"})).toBeInTheDocument();

  }) 
});
