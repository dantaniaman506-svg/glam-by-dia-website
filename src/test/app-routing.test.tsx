import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AppRoutes } from "@/App";
import * as bridalChime from "@/lib/bridal-chime";
import { SITE } from "@/lib/site";

describe("App routing", () => {
  it("offers makeup and self-makeup options", async () => {
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
    expect(screen.queryByRole("link", { name: /Gift Cards/ })).not.toBeInTheDocument();
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

  it("keeps the temporarily disabled gift card page unavailable", async () => {
    render(
      <MemoryRouter initialEntries={["/gift-cards"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: "Oh, lovely" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });

  it("shows four homepage service shortcuts and links to all services", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("link", { name: "View Makeup with hair down service" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View Makeup with hair up service" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Makeup only service" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Hairstyle only service" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "View Bridal Makeup & Hair service" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "View Bridal Makeup & Hair service" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Show more services" })).toHaveAttribute(
      "href",
      "/services",
    );
    scrollTo.mockRestore();
  });

  it("shows four white homepage gallery placeholders before Google reviews", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    const slots = await screen.findAllByRole("img", {
      name: /Reserved for client-approved homepage gallery photo/,
    });
    expect(slots).toHaveLength(4);
    expect(slots[0]).toHaveClass("bg-white");
    expect(slots[0]?.querySelector("img")).toHaveAttribute(
      "src",
      "/images/white-image-placeholder.svg",
    );
    expect(screen.getByRole("link", { name: /Explore the full gallery/ })).toHaveAttribute(
      "href",
      "/gallery",
    );
    expect(
      screen
        .getByRole("heading", { name: "A look at our work" })
        .compareDocumentPosition(
          screen.getByRole("heading", { name: "Kind words from our clients" }),
        ) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("uses the supplied About excerpt on the homepage and links to the full page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(
        "I'm Diya, the founder of Glam by Dia, a Melbourne-based beauty business specialising in bridal and special occasion makeup and hairstyling.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText("Feel like yourself")).not.toBeInTheDocument();
    expect(screen.getByText("Just a little more unforgettable.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Show more" })).toHaveAttribute("href", "/about");
  });

  it("shows the exact About Us copy, heading, eight reasons, and closing paragraph", async () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "Welcome to Glam by Dia!" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "I'm Diya, the founder of Glam by Dia, a Melbourne-based beauty business specialising in bridal and special occasion makeup and hairstyling.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "At Glam by Dia, we believe beauty is about more than just makeup. It's about embracing your individuality, enhancing your natural features and feeling confident in your own skin.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "We are a team of highly qualified and talented makeup artists and hairstylists, bringing over 10 years of industry experience. Our passion lies in creating beautiful, personalised looks that make every client feel confident, elegant and their absolute best.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Whether you're preparing for your wedding day, a special celebration or an important milestone, we are committed to making your beauty experience enjoyable, seamless and memorable.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Why Choose Glam by Dia?" })).toBeInTheDocument();
    const reasons = [
      "Experienced and professional beauty artists",
      "Convenient mobile makeup and hairstyling services",
      "Personalised beauty experiences",
      "Luxury service and attention to detail",
      "Friendly and responsive communication",
      "Reliable and organised booking processes",
      "Flexible artist availability",
      "Consistent quality and professional standards",
    ];
    for (const reason of reasons) {
      expect(screen.getByText(reason)).toBeInTheDocument();
    }
    expect(
      screen.getByText(
        "We are proud to have been part of thousands of special moments, helping clients look and feel their best. We look forward to being part of yours!",
      ),
    ).toBeInTheDocument();
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
    const starRatings = within(reviewsRegion).getAllByRole("img", { name: "5 out of 5 stars" });
    expect(starRatings).toHaveLength(6);
    expect(starRatings[0]?.querySelector("svg")).toHaveClass("fill-[#e0ad24]");
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
    expect(screen.queryByRole("link", { name: /Gift cards/i })).not.toBeInTheDocument();
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
