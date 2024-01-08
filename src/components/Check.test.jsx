import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Check from "./Check";

describe("Renders check component", async () => {
  it("Should render check page content", () => {
    render(<Check />);
    expect(screen.getByText("Checking")).toBeInTheDocument();
  });
});
