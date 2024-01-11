import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navbar } from "./index";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/dashboard/test",
    state: { campaignName: "blue" },
  }),
}));

describe("Navbar", () => {
  it("should render back button when on dashboard route", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByLabelText("menu")).toBeInTheDocument();
  });

  it("should render logo when not on dashboard route", async () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useLocation: () => ({
        pathname: "/",
        state: {},
      }),
    }));

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });
});
