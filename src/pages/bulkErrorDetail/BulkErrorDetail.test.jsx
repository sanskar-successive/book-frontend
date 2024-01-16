import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import BulkErrorDetail from "./BulkErrorDetail";
import { mockBulkError } from "../../mocks/mockBulkError";

describe("Bulk Error Detail Page", () => {
  test("should renders bulk error details", async () => {
    render(
      <BrowserRouter>
        <BulkErrorDetail />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await screen.findByText("Row Number");

    expect(screen.getByText("Row Number")).toBeInTheDocument();
    expect(screen.getByText("Error Details")).toBeInTheDocument();


    const errorRow = screen.queryAllByRole("error-row")

    console.log("errorRow", errorRow);

    expect(errorRow).toHaveLength(0);

    const errorMessage = screen.queryAllByRole("error-message");
    expect(errorMessage).toHaveLength(0);

    expect(screen.queryByText(/loading/i)).toBeNull();
  });
});
