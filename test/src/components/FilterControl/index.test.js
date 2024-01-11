import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterControl } from "./index";

describe("FilterControl", () => {
  it("deve renderizar o componente corretamente", async () => {
    render(
      <FilterControl
        filterOption="mostRecent"
        handleFilterChange={() => {}}
        handleCustomValueChange={() => {}}
        customValue="10"
        campaignName="Test Campaign"
      />
    );

    expect(screen.getByLabelText("Most Recent")).toBeInTheDocument();

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Custom"));
  });
});
