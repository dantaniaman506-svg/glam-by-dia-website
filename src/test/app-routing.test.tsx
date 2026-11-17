import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AppRoutes } from "@/App";
import * as bridalChime from "@/lib/bridal-chime";
import { SITE } from "@/lib/site";

describe("App routing", () => {
  it("offers makeup, self-makeup and gift card options", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const chime = vi.spyOn(bridalChime, "playBridalChime").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/booking-options"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("heading", { name: "Choose your beauty service" }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("banner")).getByRole("link", { name: /Book Now/ }),
    ).toHaveAttribute("href", "/booking-options");
    const makeupLink = screen.getByRole("link", { name: /Book Makeup & Hair/ });
    expect(makeupLink).toHaveAttribute("href", "/book");
    expect(screen.queryByRole("link", { name: /Henna Service/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Gift Cards/ })).toHaveAttribute("href", "/gift-cards");
    expect(screen.getByRole("link", { name: /Self-Makeup Class/ })).toHaveAttribute(
      "href",
      "/self-makeup-class",
    );

    fireEvent.click(makeupLink);
    expect(chime).toHaveBeenCalledOnce();
    expect(await screen.findByRole("heading", { name: /Book Makeup & Hair/ })).toBeInTheDocument();

    chime.mockRestore();
    scrollTo.mockRestore();
  });

  it("renders the contact page from a direct route entry", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(await screen.findByRole("heading", { name: "Glam by Dia Studio" })).toBeInTheDocument();
    scrollTo.mockRestore();
  });

  it("offers a Bridal shortcut that opens the bridal enquiry service", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    const bridalShortcut = await screen.findByRole("link", { name: /Bridal Makeup & Hair/ });
    expect(decodeURIComponent(bridalShortcut.getAttribute("href") ?? "")).toContain(
      "Bridal Makeup and Hair (from $300) — Enquiry",
    );
    scrollTo.mockRestore();
  });

  it("keeps the home hero and Instagram image areas white until approved photos arrive", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    const heroSlot = await screen.findByRole("img", {
      name: "Reserved for a client-approved hero photo",
    });
    expect(heroSlot).toHaveClass("bg-white");
    expect(heroSlot.querySelector("img")).toHaveAttribute(
      "src",
      "/images/white-image-placeholder.svg",
    );
    const instagramSlots = await screen.findAllByRole("img", {
      name: /Reserved for Instagram post/,
    });
    expect(instagramSlots).toHaveLength(6);
    const firstInstagramSlot = instagramSlots[0];
    expect(firstInstagramSlot).toHaveClass("bg-white");
    expect(firstInstagramSlot?.querySelector("img")).toHaveAttribute(
      "src",
      "/images/white-image-placeholder.svg",
    );
  });

  it("keeps six white gallery slots for approved portfolio photos", async () => {
    render(
      <MemoryRouter initialEntries={["/gallery"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    const gallerySlots = await screen.findAllByRole("img", {
      name: /Reserved for client-approved portfolio photo/,
    });
    expect(gallerySlots).toHaveLength(6);
    const firstGallerySlot = gallerySlots[0];
    expect(firstGallerySlot).toHaveClass("bg-white");
    expect(firstGallerySlot?.querySelector("img")).toHaveAttribute(
      "src",
      "/images/white-image-placeholder.svg",
    );
  });

  it("shows only supplied Google review excerpts and links every card to Maps", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    const reviewsRegion = await screen.findByRole("region", {
      name: /Google review excerpts/,
    });
    const reviewLinks = within(reviewsRegion).getAllByRole("link", {
      name: /Google review from/,
    });

    expect(reviewLinks).toHaveLength(6);
    expect(reviewLinks[0]).toHaveAttribute("href", SITE.googleReviewsUrl);
    expect(reviewLinks[0]).toHaveTextContent(/comfortable throughout the whole appointment/);
    expect(reviewLinks[1]).toHaveTextContent(/amazing job doing my make up/);
    expect(reviewLinks[2]).toHaveTextContent(/40th birthday/);
    expect(reviewLinks[3]).toHaveTextContent(/very natural, fresh/);
    expect(reviewLinks[4]).toHaveTextContent(/Absolute perfection/);
    expect(reviewLinks[5]).toHaveTextContent(/went above and beyond/);
    expect(reviewLinks.some((link) => link.textContent?.includes("Thank you so much"))).toBe(false);
  });

  it("shows compact footer links for Instagram, maps, phone, and email", async () => {
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    const footerLinks = within(
      screen.getByRole("navigation", { name: "Footer quick contact links" }),
    );
    expect(footerLinks.getByRole("link", { name: "Footer Instagram" })).toHaveAttribute(
      "href",
      SITE.instagram,
    );
    expect(footerLinks.getByRole("link", { name: "Footer Location" })).toHaveAttribute(
      "href",
      SITE.directionsUrl,
    );
    expect(footerLinks.getByRole("link", { name: "Footer Phone" })).toHaveAttribute(
      "href",
      SITE.phoneHref,
    );
    expect(footerLinks.getByRole("link", { name: "Footer Email" })).toHaveAttribute(
      "href",
      SITE.emailHref,
    );
  });

  it("shows an Instagram icon link in the navigation menu", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const instagramLink = await screen.findByRole("link", { name: "Instagram profile" });
    expect(instagramLink).toHaveAttribute("href", SITE.instagram);
    expect(instagramLink.querySelector("svg")).toBeInTheDocument();
  });

  it("selects a pricing service and smoothly brings the booking form into view", async () => {
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
    fireEvent.click(
      await screen.findByRole("button", { name: "Choose Makeup & Hair Down ($200)" }),
    );

    expect(screen.getByRole("combobox", { name: "Which service would you like?" })).toHaveValue(
      "Makeup & Hair Down ($200)",
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
        initialEntries={[`/book?service=${encodeURIComponent("Makeup with Hair Up ($220)")}`]}
      >
        <AppRoutes />
      </MemoryRouter>,
    );
    await waitFor(() =>
      expect(screen.getByRole("combobox", { name: "Which service would you like?" })).toHaveValue(
        "Makeup with Hair Up ($220)",
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
