import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";

describe("Layout Page", () => {
  test("should renders Layout page", async () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  
    expect(screen.queryByTestId("top-header")).toBeDefined();
    expect(screen.queryByTestId("left-sidebar")).toBeDefined();
  });
});
