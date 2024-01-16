import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../pages/login/Login";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("renders login page", () => {
    test("should display login form content", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        const emailInput = screen.getByRole('textbox', { name: /enter email/i });
        const passwordInput = screen.getByLabelText(/enter password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    })

    test("should display typed values in login form", async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        const emailInput = screen.getByRole('textbox', { name: /enter email/i });
        const passwordInput = screen.getByLabelText(/enter password/i);

        await userEvent.click(emailInput);
        await userEvent.keyboard("email");
        expect(emailInput).toHaveValue("email");

        await userEvent.click(passwordInput);
        await userEvent.keyboard("password");
        expect(passwordInput).toHaveValue("password");

        const loginButton = screen.getByRole('button', { name: /login/i });

        const handleLoginMock = vi.fn();
        await userEvent.click(loginButton);
        handleLoginMock();
        expect(handleLoginMock).toHaveBeenCalledTimes(1);
    })

    test("should display typed values in login form", async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        const registerUserButton = screen.getByRole('button', { name: /register user/i });
        expect(registerUserButton).toBeInTheDocument();

        await userEvent.click(registerUserButton);
        const registerPageHeading = screen.getByRole('heading', { name: /user register/i });
        expect(registerPageHeading).toBeInTheDocument();
    })
})