import axios from "axios";
import { getData } from "../utils/MockTesting";

describe("Homepage Component", () => {
  test ("gets films data", async() => {

    const films = ["A New Hope", "The Empire Strikes Back", "Return of the Jedi", "The Phantom Menace", "Attack of the Clones", "Revenge of the Sith"]
    for (let i = 1; i < 7; i++){
      getData(`https://swapi.dev/api/films/${i}/`).then(data => {
        expect(data.title).toEqual(films[i])
      })
    }

  })
})