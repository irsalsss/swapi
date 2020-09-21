import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { getDataForTesting } from "../../utils/MockTesting";
import BodySection from './BodySection';

global.fetch = jest.fn(() => (
  Promise.resolve({
    json: () => Promise.resolve(({}))
  })
))

beforeEach(() => {
  fetch.mockClear();
});

afterEach(cleanup)

describe("Dropdown Component", () => {
  it("renders correctly", async() => {
    const response = [await getDataForTesting(`https://swapi.dev/api/people/1/`)]
    const {getByTestId} = render(<BodySection isLoading={false} peopleData={response} />)
    expect(getByTestId('card-people-1')).toHaveTextContent("Luke Skywalker")
  })
})