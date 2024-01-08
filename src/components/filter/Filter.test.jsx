import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import Filter from "./Filter";
import userEvent from "@testing-library/user-event";

const categories = [
  "fiction",
  "mystery",
  "arts",
  "science",
  "romance",
  "horror",
  "religion",
  "philosophy",
  "history",
  "poetry",
  "biography",
  "technology",
];

const languages = ["english", "hindi", "sanskrit", "telugu", "bengali"];

describe("Filter component", () => {
  test("should render filter component", async () => {
    render(
      <BrowserRouter>
        <Filter />
      </BrowserRouter>
    );

    const minPriceInput = screen.getByPlaceholderText("Min");
    const maxPriceInput = screen.getByPlaceholderText("Max");

    await userEvent.type(minPriceInput, "1");
    expect(minPriceInput).toHaveValue(501);

    await userEvent.type(maxPriceInput, "1");
    expect(maxPriceInput).toHaveValue(20001);


    const rating3 = screen.getByLabelText("3 and above");
    const rating4 = screen.getByLabelText("4 and above");

    await userEvent.click(rating3)
    expect(rating3).toBeChecked();

    await userEvent.click(rating4)
    expect(rating4).toBeChecked();

    const categoryCheckboxes = screen.getAllByRole("category-checkbox");
    expect(categoryCheckboxes.length) === categories.length;

    for(let i=0;i<categories.length;i++){
        await userEvent.click(categoryCheckboxes[i]);
        expect(categoryCheckboxes[i]).toBeChecked();
    }

    const languageCheckboxes = screen.getAllByRole("language-checkbox");
    expect(languageCheckboxes.length) === languages.length;

    for(let i=0;i<languages.length;i++){
        await userEvent.click(languageCheckboxes[i]);
        expect(languageCheckboxes[i]).toBeChecked();
    }

    const applyFilterButton = screen.getByRole('button');
    expect(applyFilterButton).toBeInTheDocument();

    await userEvent.click(applyFilterButton);
    
    expect(window.location.search.includes("price.from"))
    expect(window.location.search.includes("price.to"))
    expect(window.location.search.includes("rating"))
    expect(window.location.search.includes("category"))
    expect(window.location.search.includes("langauage"))

  });
});
