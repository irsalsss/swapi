import { getFilmsData } from "../utils/MockTesting";

jest.mock("../utils/MockTesting", () => {
  return {
    getFilmsData: jest.fn(),
  };
});

it ("gets films data", async() => {
  const response = await getFilmsData(1)
  expect(getFilmsData).toHaveBeenCalled()
})