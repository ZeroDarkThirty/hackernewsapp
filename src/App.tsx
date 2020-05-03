import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import { Menu, Container, Grid, Item as SemanticItem } from "semantic-ui-react";
import { hackerNewsApiCalls } from './API/ApiCalls';
import { StoryCard } from './Features/StoryCard/StoryCard';
import { IFeedItem, IItem } from './Typings/Story';
import { SelectedItem } from './Features/SelectedItem/SelectedItem';
import HackerNewsContext from './Context/HackerNewsContext';
import { Loader } from './Loader/Loader';

export const App: React.FC = () => {
  const { stories, selectedStory, getTopTenStories, isLoading, clearSelectedStory } = useContext(HackerNewsContext);
 
  useEffect(() => {
    if (stories === undefined) {
      getTopTenStories();
    }
  }, [stories]);

  const renderStories = () => {
    if (isLoading) {
      return <Loader />
    }

    return stories && stories.map((story) => {
      return <StoryCard key={story.id} {...story} />
    })
  }

  return (
    <>
      <Menu fixed="top" style={{backgroundColor: "#f68a2c"}}>
        <Container>
          <Menu.Item header onClick={clearSelectedStory}>HackerNews App</Menu.Item>
        </Container>
      </Menu>

      <Container style={{marginTop: "72px"}}>
        {
          selectedStory === undefined ? 
          <Grid>
            <SemanticItem.Group>
              {renderStories()}
            </SemanticItem.Group>
          </Grid> : 
          <SelectedItem selectedStory={selectedStory} />
        }
      </Container>
    </>
  );
}

export default App;
