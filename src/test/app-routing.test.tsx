import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AppRoutes } from "@/App";
import * as bridalChime from "@/lib/bridal-chime";

describe("App routing", () => {
  it("offers the three booking types and chimes before opening the chosen form", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const chime = vi.spyOn(bridalChime, "playBridalChime").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/booking-options"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Choose your beauty service" })).toBeInTheDocument();
    expect(
      within(screen.getByRole("banner")).getByRole("link", { name: /Book Now/ }),
    ).toHaveAttribute("href", "/booking-options");
    const makeupLink = screen.getByRole("link", { name: /Book Makeup & Hair/ });
    expect(makeupLink).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: /Henna Service/ })).toHaveAttribute("href", "/henna");
    expect(screen.getByRole("link", { name: /Self-Makeup Class/ })).toHaveAttribute(
      "href",
      "/self-makeup-class",
    );

    fireEvent.click(makeupLink);
    expect(chime).toHaveBeenCalledOnce();
    expect(screen.getByRole("heading", { name: /Book Your Bridal Glam/ })).toBeInTheDocument();

    chime.mockRestore();
    scrollTo.mockRestore();
  });

  it("renders the contact page from a direct route entry", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Glam by Dia Studio" })).toBeInTheDocument();
    scrollTo.mockRestore();
  });

  it("selects a pricing service and smoothly brings the booking form into view", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const scrollIntoView = vi.fn();
    const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });

    render(
      <MemoryRouter initialEntries={["/book"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Choose Makeup with hair down ($170)" }));

    expect(screen.getByRole("combobox", { name: "Which service would you like?" })).toHaveValue(
      "Makeup with hair down ($170)",
    );
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });

    scrollTo.mockRestore();
    if (originalScrollIntoView) {
      Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
        configurable: true,
        value: originalScrollIntoView,
      });
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
    }
  });

  it("preselects and scrolls to a service from a booking link", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const scrollIntoView = vi.fn();
    const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    const requestAnimationFrame = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((callback) => {
        callback(0);
        return 1;
      });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });

    render(
      <MemoryRouter
        initialEntries={[`/book?service=${encodeURIComponent("Makeup with hair up ($210)")}`]}
      >
        <AppRoutes />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.getByRole("combobox", { name: "Which service would you like?" })).toHaveValue(
        "Makeup with hair up ($210)",
      ),
    );
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });

    requestAnimationFrame.mockRestore();
    scrollTo.mockRestore();
    if (originalScrollIntoView) {
      Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
        configurable: true,
        value: originalScrollIntoView,
      });
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
    }
  });
});
