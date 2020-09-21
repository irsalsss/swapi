import { urlToID } from "./Helper";

describe("Test all helper function", () => {
  test("function urlToID", () => {
    expect(urlToID("http://swapi.dev/api/people/1/")).toBe("people-1")
    expect(urlToID("http://swapi.dev/api/films/1/")).toBe("films-1")
    expect(urlToID("http://swapi.dev/api/starhips/1/")).toBe("starhips-1")
  })
})