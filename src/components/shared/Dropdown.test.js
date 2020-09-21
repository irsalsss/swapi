import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Dropdown from './Dropdown';
import '@testing-library/jest-dom/extend-expect';
import { getFilmsData } from "../../utils/MockTesting";

global.fetch = jest.fn(() => (
  Promise.resolve({
    json: () => Promise.resolve(({}))
  })
))

beforeEach(() => {
  fetch.mockClear();
});

afterEach(cleanup)

it("renders correctly", async() => {
  const response = [await getFilmsData(1)]
  const {getByTestId} = render(<Dropdown listValue={response} />)
  expect(getByTestId('dropdown-button')).toHaveTextContent("A New Hope")
})