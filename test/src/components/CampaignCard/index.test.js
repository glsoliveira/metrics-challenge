import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CampaignCard } from "./index";

describe("CampaignCard", () => {
  it("exibe o nome e ID da campanha", () => {
    const mockCampaign = {
      name: "Campanha Teste",
      id: "123",
    };
    const mockOnClick = jest.fn();

    render(<CampaignCard campaign={mockCampaign} onClick={mockOnClick} />);

    expect(screen.getByText("Campanha Teste")).toBeInTheDocument();
    expect(screen.getByText("ID: 123")).toBeInTheDocument();
  });
});
