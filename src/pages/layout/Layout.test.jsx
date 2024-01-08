import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout Page", () => {
  test("should renders Layout page", async () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(screen.queryByTestId("top-header"))
    expect(screen.queryByTestId("left-sidebar"))
  });
});
