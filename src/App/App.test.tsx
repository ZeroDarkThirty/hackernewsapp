import React from 'react';
import { render, cleanup, act, RenderResult, waitForElement } from '@testing-library/react';
import App from './App';
import GlobalState from '../Context/GlobalState';
import HackerNewsContext, { IHackerNewsContext } from '../Context/HackerNewsContext';
import { hackerNewsApiCalls } from '../API/ApiCalls';

jest.mock('../Features/StoryCard/StoryCard', () => {
  return {
    StoryCard: () => <div data-testid="story-card-mock">StoryCardMock</div>
  }
})

afterEach(cleanup);

const renderWithContext = () => {
  return (
    <GlobalState>
      <App />
    </GlobalState>
  )
}

test("Given the stories are being loaded, when the component renders, then render the Loader", () => {
  // Arrange, act
  const { getByText } = render(renderWithContext());

  // Act
  const loader = getByText(/Loading.../i);
  expect(loader).toBeInTheDocument();
});

test("When the stories have been successfully loaded, then render the stories", async () => {
  // Arrange
  const storyMock = {
    id: 1,
    title: "Mock story",
    time: 10,
    time_ago: "10 min ago",
    comments_count: 50,
    type: "Story"
  }

  const spyOn: Promise<any> = Promise.resolve([storyMock])
  hackerNewsApiCalls.getTopStories = jest.fn(() => spyOn);

  const { getByTestId } = render(renderWithContext());

  // Act
  await act(() => spyOn);

  // Assert
  expect(getByTestId("story-card-mock")).toBeInTheDocument();
});
