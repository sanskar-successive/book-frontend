import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import Pagination from "../components/pagination/Pagination";
import userEvent from "@testing-library/user-event";

const limitOptions = [10, 20, 50];
const total = 100;

describe("Pagination component", () => {
  test("should render pagination component", async () => {
    render(
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>
    );
    
    expect(screen.getAllByRole('option')).toHaveLength(limitOptions.length);
    const pageChangeButtons = screen.getAllByRole("page-change-button");
    expect(pageChangeButtons.length).toBe(10);

    for(let i=0;i<10;i++){
        if(i==0){
            await userEvent.click(pageChangeButtons[i])
        }
        else{
            await userEvent.click(pageChangeButtons[i])
            expect(window.location.hash.includes("skip"))
            expect(window.location.hash.includes("limit"))
        }
    }
  });
});
