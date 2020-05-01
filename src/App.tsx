import React, { useEffect, useState } from 'react';
import './App.css';
import { Menu, Container, Grid, Item } from "semantic-ui-react";
import { hackerNewsApiCalls } from './API/ApiCalls';
import { StoryCard } from './Features/StoryCard/StoryCard';
import { Story } from './Typings/Story';

export const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>();

  useEffect(() => {
    hackerNewsApiCalls.getTopStories().then((news) => {
      setStories(news);
    })
  }, []);

  const renderStories = () => {
    if (!stories) {
      return "Loading..."
    }

    return stories.map((story) => {
      return <StoryCard
              Title={story.title}
              TimeAgo={story.time_ago}
              Url={story.url}
              Points={story.points}
              PostedBy={story.user} />
    })
  }

  return (
    <>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as="a" header>Hacker News App</Menu.Item>
        </Container>
      </Menu>

      <Container style={{marginTop: "72px"}}>
        <Grid>
          <Item.Group>
            {renderStories()}
          </Item.Group>
        </Grid>
      </Container>
    </>
  );
}

export default App;
