import { render, screen } from "@testing-library/react";
import BookDetails from "./BookDetails";
import { describe, test, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { mockBook } from "../../mocks/mockBook";

describe("Book Details component", () => {
  test("should renders book details", async () => {
    render(
      <BrowserRouter>
        <BookDetails />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await screen.findByText(mockBook.title);

    expect(screen.getByAltText(`${mockBook.title} cover`)).toBeInTheDocument();

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText(mockBook.title)).toBeInTheDocument();

    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText(mockBook.category)).toBeInTheDocument();

    expect(screen.getByText("Author")).toBeInTheDocument();
    expect(screen.getByText(mockBook.author.name)).toBeInTheDocument();

    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByText(mockBook.rating)).toBeInTheDocument();

    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText(`$${mockBook.price}`)).toBeInTheDocument();

    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(
      screen.getByText(mockBook.moreDetails.text_language)
    ).toBeInTheDocument();

    expect(screen.getByText("Publisher")).toBeInTheDocument();
    expect(
      screen.getByText(mockBook.moreDetails.publisher)
    ).toBeInTheDocument();

    expect(screen.getByText("First Published")).toBeInTheDocument();
    expect(
      screen.getByText(mockBook.moreDetails.firstPublished.toLocaleDateString())
    ).toBeInTheDocument();

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(
      screen.getByText(mockBook.moreDetails.description)
    ).toBeInTheDocument();

    expect(screen.getByText("Pages")).toBeInTheDocument();
    expect(screen.getByText(mockBook.moreDetails.pages)).toBeInTheDocument();

    expect(screen.getByText("File Size")).toBeInTheDocument();
    expect(screen.getByText(mockBook.moreDetails.fileSize)).toBeInTheDocument();

    expect(screen.getByText("Edition")).toBeInTheDocument();
    expect(screen.getByText(mockBook.moreDetails.edition)).toBeInTheDocument();

    expect(screen.getByText("Verified")).toBeInTheDocument();
    expect(
      screen.getByText(mockBook.moreDetails.verified.toString())
    ).toBeInTheDocument();

    expect(screen.getByText("Cover Image URL")).toBeInTheDocument();
    expect(screen.getByText(mockBook.coverImage)).toBeInTheDocument();

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
