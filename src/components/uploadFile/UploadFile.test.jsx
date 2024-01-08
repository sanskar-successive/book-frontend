import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import UploadFile from "./UploadFile";
import userEvent from "@testing-library/user-event";

const mockFile = new File(["file content"], "test.csv", { type: "text/csv" });

describe("upload file component", () => {
  test("should render upload file component", async () => {
    render(
        <BrowserRouter>
          <UploadFile />
        </BrowserRouter>
      );
    const headingText = screen.getByRole('heading');
    expect(headingText).toBeInTheDocument();

    const fileInput = screen.queryByLabelText("Select")

    await userEvent.upload(fileInput, mockFile);
    expect(fileInput.files.length).toBe(1);

    const uploadButton = screen.getByRole("button", {name : "Upload"});
    expect(uploadButton).toBeInTheDocument();
  });
});