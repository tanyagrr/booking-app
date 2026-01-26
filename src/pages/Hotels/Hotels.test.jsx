import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const dispatchMock = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
  useSelector: (selectorFn) =>
    selectorFn({
      hotels: [
        {
          id: 1,
          name: "Hotel One",
          address: "Addr 1",
          city: "Boston",
          state: "MA",
          country_code: "US",
        },
        {
          id: 2,
          name: "Hotel Two",
          address: "Addr 2",
          city: "Boston",
          state: "MA",
          country_code: "US",
        },
      ],
    }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: () => [
      {
        get: (key) => (key === "destination" ? "Boston" : null),
      },
    ],
  };
});

import Hotels from "./Hotels";

describe("Hotels page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches HOTELS_FETCH_REQUESTED on mount with destination from query", async () => {
    render(<Hotels />);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        type: "HOTELS_FETCH_REQUESTED",
        payload: { destination: "Boston" },
      });
    });
  });

  it('renders "Found: X" based on hotels length', () => {
    render(<Hotels />);
    expect(screen.getAllByText(/found:\s*2/i)).toHaveLength(1);
  });

  it("renders hotel cards (names appear)", () => {
    render(<Hotels />);
    expect(screen.getByText("Hotel One")).toBeInTheDocument();
    expect(screen.getByText("Hotel Two")).toBeInTheDocument();
  });
});
