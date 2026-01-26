import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../client", () => ({
  default: { get: vi.fn() },
}));

import api from "../client";
import fetchHotelsServer from "./hotels";

describe("fetchHotelsServer", () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls api.get("/hotels") and returns response.data', async () => {
    api.get.mockResolvedValueOnce({ data: [{ id: 1 }, { id: 2 }] });

    const result = await fetchHotelsServer();

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith("/hotels");
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });
});