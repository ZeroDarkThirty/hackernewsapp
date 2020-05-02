import React, { useEffect, useState } from 'react';
import './App.css';
import { Menu, Container, Grid, Item, Divider, Comment } from "semantic-ui-react";
import { hackerNewsApiCalls } from './API/ApiCalls';
import { StoryCard } from './Features/StoryCard/StoryCard';
import { IFeedItem, IItem } from './Typings/Story';
import { ItemComment } from './Features/ItemComment/ItemComment';

export const App: React.FC = () => {
  const [stories, setStories] = useState<IFeedItem[]>();
  const [ selectedStory, setSelectedStory ] = useState<IItem>();
 
  useEffect(() => {
    hackerNewsApiCalls.getTopStories().then((news) => {
      const firstTenStories = news.slice(0, 10);
      setStories(firstTenStories);
    });
  }, []);

  const getSelectedStory = (id: number) => {
    hackerNewsApiCalls.getStory(id).then((story) => {
      console.log(story);
      setSelectedStory(story);
    })
  }

  const renderStories = () => {
    if (!stories) {
      return "Loading..."
    }

    return stories.map((story) => {
      return <StoryCard
              key={story.id}
              onStorySelect={getSelectedStory}
              {...story} />
    })
  }

  const renderSelectedItemComments = () => {
    if (selectedStory) {
      // Assumption: Top twenty top-level comments, not including nested comments
      const topTwentyComments = selectedStory.comments.slice(0, 20);

      return topTwentyComments.map((comment) => {
        return <Comment.Group><ItemComment key={comment.id} comment={comment} /></Comment.Group>
      })
    }
  }

  return (
    <>
      <Menu fixed="top" style={{backgroundColor: "#f68a2c"}}>
        <Container>
          <Menu.Item as="a" header>HackerNews App</Menu.Item>
        </Container>
      </Menu>

        <Container style={{marginTop: "72px"}}>
          {selectedStory === undefined ? 
          <Grid>
            <Item.Group>
              {renderStories()}
            </Item.Group>
          </Grid> : renderSelectedItemComments()}
        </Container>
    </>
  );
}

export default App;
