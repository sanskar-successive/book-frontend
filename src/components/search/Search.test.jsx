import { screen, render, act } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Search from "./Search";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
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


// describe("Search Component", () => {
//   test("should render search component", () => {
//     render(
//       <MemoryRouter>
//         <Search />
//       </MemoryRouter>
//     );
//     const searchInput = screen.getByRole("textbox");
//     expect(searchInput).toBeInTheDocument();

//     const searchButton = screen.getByRole("button");
//     expect(searchButton).toBeInTheDocument();

    
//   });

//   test("should change input value in search input", async () => {
//     render(
//       <MemoryRouter>
//         <Search />
//       </MemoryRouter>
//     );
//     const searchInput = screen.getByRole("textbox");
//     await userEvent.type(searchInput, "book");
//     expect(searchInput).toHaveValue("book");
    
//   });

//   test("should call a query change function onbutton click", async () => {
 
  
//     render(
//       <BrowserRouter>
//         <Search />
//       </BrowserRouter>
//     );
    
//     let searchQuery = window.location.search
//     const handleSearchMock = vi.fn(()=>{
//       return searchQuery += "?search=book"
//     })

//     const searchButton = screen.getByRole("button");
//     await userEvent.click(searchButton);
//     handleSearchMock();
//     expect(handleSearchMock).toHaveBeenCalledTimes(1);

//     expect(searchQuery).toBe("?search=book")

//   });

// });
