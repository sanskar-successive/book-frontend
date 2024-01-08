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

    expect(screen.queryAllByRole("error-row")).toHaveLength(
      mockBulkError.length
    );
    expect(screen.queryAllByRole("error-message")).toHaveLength(
      mockBulkError.length
    );

    expect(screen.queryByText(/loading/i)).toBeNull();
  });
});
