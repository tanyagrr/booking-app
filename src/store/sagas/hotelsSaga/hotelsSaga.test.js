import { describe, it, expect } from "vitest";
import { call, put } from "redux-saga/effects";
import fetchHotelsServer from "../../../api/hotels/hotels";
import { fetchHotels } from "./hotelsSaga"; 

describe("hotelsSaga fetchHotels", () => {
  it("filters hotels by destination city", () => {
    const action = { payload: { destination: "Boston" } };
    const gen = fetchHotels(action);

    expect(gen.next().value).toEqual(call(fetchHotelsServer));

    const hotels = [
      { id: 1, city: "Boston" },
      { id: 2, city: "New York" },
    ];

    expect(gen.next(hotels).value).toEqual(
      put({
        type: "HOTELS_FETCH_SUCCEEDED",
        payload: [{ id: 1, city: "Boston" }],
      })
    );

    expect(gen.next().done).toBe(true);
  });

  it("returns all hotels when destination is missing", () => {
    const action = { payload: {} };
    const gen = fetchHotels(action);

    expect(gen.next().value).toEqual(call(fetchHotelsServer));

    const hotels = [
      { id: 1, city: "Boston" },
      { id: 2, city: "New York" },
    ];

    expect(gen.next(hotels).value).toEqual(
      put({
        type: "HOTELS_FETCH_SUCCEEDED",
        payload: hotels,
      })
    );

    expect(gen.next().done).toBe(true);
  });

  it("dispatches FAILED when fetch throws", () => {
    const action = { payload: { destination: "Boston" } };
    const gen = fetchHotels(action);

    expect(gen.next().value).toEqual(call(fetchHotelsServer));

    const err = new Error("Network error");

    expect(gen.throw(err).value).toEqual(
      put({ type: "HOTELS_FETCH_FAILED", message: "Network error" })
    );
  });
});