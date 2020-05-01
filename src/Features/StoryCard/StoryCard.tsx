import React from 'react';
import { Item } from 'semantic-ui-react';

export interface IStoryCardProps {
    Title: string;
    TimeAgo: string;
    Url?: string;
    Points?: number | null;
    PostedBy?: string | null;
}

export const StoryCard: React.FC<IStoryCardProps> = ({Title, TimeAgo, Url, Points, PostedBy}) => {
    return (
        <Item>
            <Item.Content>
                <Item.Header as='a'>
                    <a href={Url} target="_blank" rel="noopener noreferrer">{Title}</a>
                </Item.Header>
                <Item.Meta>
                    { Points && <span className='price'>{`${Points} points`}</span> }
                    { PostedBy && <span className='stay'>{`by ${PostedBy}`}</span> }
                    <span className='stay'>{TimeAgo}</span>
                    <span className='stay'><a href="#">Comments</a></span>
                </Item.Meta>
            </Item.Content>
        </Item>
    )
}