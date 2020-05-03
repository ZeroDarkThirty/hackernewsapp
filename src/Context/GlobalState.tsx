import React, { useState } from 'react';
import HackerNewsContext, { IHackerNewsContext } from './HackerNewsContext';
import { IFeedItem, IItem } from '../Typings/Story';
import { hackerNewsApiCalls } from '../API/ApiCalls';

const GlobalState = ({children}) => {
    const [ stories, setStories ] = useState<IFeedItem[]>();
    const [ selectedStory, setSelectedStory ] = useState<IItem>();
    const [ isLoading, setIsLoading ] = useState(false);

    const getTopTenStories = () => {
        setIsLoading(true);

        hackerNewsApiCalls.getTopStories().then((news) => {
            const firstTenStories = news.slice(0, 10);
            setStories(firstTenStories);
            console.log(news);
            setIsLoading(false);
        });
    }

    const getSelectedStory = (id: number) => {
        setIsLoading(true);
        hackerNewsApiCalls.getStory(id).then((story) => {
          setSelectedStory(story);

          setIsLoading(false);
        });
    }

    const clearSelectedStory = () => {
        if (setSelectedStory !== undefined) {
            setSelectedStory(undefined)
        }
    };

    const buildState: IHackerNewsContext = {
        getTopTenStories: getTopTenStories,
        getSeletedStory: getSelectedStory,
        stories: stories,
        selectedStory: selectedStory,
        clearSelectedStory: clearSelectedStory,
        isLoading: isLoading,
    }

    return (
        <HackerNewsContext.Provider value={buildState}>
            {children}
        </HackerNewsContext.Provider>
    )
}

export default GlobalState;