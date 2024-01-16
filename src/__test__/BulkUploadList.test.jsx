import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BulkUploadList from "../pages/bulkUpload/BulkUploadList";
import { mockBulkUploadList } from "../mocks/mockBulkUploadList";

describe("Bulk Upload List Page", () => {
  test("should renders bulk upload list", async () => {
    render(
      <MemoryRouter initialEntries={['/bulk-uploads']}>
        <Routes>
          <Route path="/bulk-uploads" element={<BulkUploadList />} />
        </Routes>
      </MemoryRouter>
    );
    const loadingText = screen.getByRole('heading', {name: /loading/i});
    expect(loadingText).toBeInTheDocument();

    const totalData = await screen.findAllByRole('button');
    expect(totalData).toHaveLength(mockBulkUploadList.length)

  });

  test("should renders error", async () => {
    render(
      <MemoryRouter initialEntries={['/bulk-uploads']}>
        <Routes>
          <Route path="/bulk-uploads" element={<BulkUploadList />} />
        </Routes>
      </MemoryRouter>
    );

    const loadingText = screen.getByRole('heading', {name: /loading/i});
    expect(loadingText).toBeInTheDocument();

  });
});
