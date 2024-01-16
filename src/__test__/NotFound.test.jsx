import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../pages/notFound/NotFound";


describe("Not Found Component", () => {
  test("renders not found page", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('heading', {name : "404 - Not Found"})).toBeInTheDocument();

  }) 
});
