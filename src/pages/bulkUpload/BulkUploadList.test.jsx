import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import BulkUploadList from "./BulkUploadList";
import { mockBulkUploadList } from "../../mocks/mockBulkUploadList";

describe("Bulk Upload List Page", () => {
  test("should renders bulk upload list", async () => {
    render(
      <BrowserRouter>
        <BulkUploadList />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await screen.findByText("Bulk Uploads List");

    expect(screen.getByText("Bulk Uploads List")).toBeInTheDocument();

    expect(screen.queryAllByRole("record-details")).toHaveLength(
      mockBulkUploadList.length
    );

    expect(screen.queryByText(/loading/i)).toBeNull();
  });
});
