import "@testing-library/jest-dom";

import { describe, expect, it } from "vitest";

import HomeEditorial from "./HomeEditorial.svelte";
import { render } from "@testing-library/svelte";

describe("HomeEditorial", () => {
  it("have Jérémy inside", () => {
    render(HomeEditorial);

    expect(document.body).toHaveTextContent("Jérémy");
  });
});
