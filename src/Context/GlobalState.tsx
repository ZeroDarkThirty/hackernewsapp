import React, { useState } from 'react';
import HackerNewsContext, { IHackerNewsContext } from './HackerNewsContext';
import { IFeedItem, IItem } from '../Typings/Story';
import { hackerNewsApiCalls } from '../API/ApiCalls';

const GlobalState = ({children}) => {
    const [ stories, setStories ] = useState<IFeedItem[]>();
    const [ selectedStory, setSelectedStory ] = useState<IItem>();
    const [ isLoading, setIsLoading ] = useState(false);

    const getTopTenStories = async () => {
        setIsLoading(true);

        try {
            const stories = await hackerNewsApiCalls.getTopStories();
            const topTenStories = stories.slice(0, 10);
            setStories(topTenStories)
            setIsLoading(false);
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    const getSelectedStory = async (id: number) => {
        setIsLoading(true);

        try {
            const stories = await hackerNewsApiCalls.getStory(id);
            setSelectedStory(stories)
            setIsLoading(false);
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
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