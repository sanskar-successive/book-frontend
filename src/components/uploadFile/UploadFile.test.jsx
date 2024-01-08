import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import UploadFile from "./UploadFile";
import userEvent from "@testing-library/user-event";
import { server } from "../../mocks/node";

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

    const fileInput = await screen.findByPlaceholderText("select file")

    await userEvent.upload(fileInput, mockFile);

    const uploadButton = screen.getByRole("button", {name : "Upload"});
    
    await userEvent.click(uploadButton);
  
  });
});