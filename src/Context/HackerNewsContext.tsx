import React, { useEffect, useState } from 'react';
import { IFeedItem, IItem } from '../Typings/Story';

export interface IHackerNewsContext {
    stories?: IFeedItem[];
    selectedStory?: IItem;
    isLoading: boolean;
    getTopTenStories: () => void;
    getSeletedStory: (id: number) => void;
    clearSelectedStory: () => void;
}

export default React.createContext<IHackerNewsContext>({
    isLoading: false,
    getTopTenStories: () => {},
    getSeletedStory: () => {},
    clearSelectedStory: () => {}
});