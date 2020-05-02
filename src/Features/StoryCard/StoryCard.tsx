import React from 'react';
import { Item as SemanticItem } from 'semantic-ui-react';
import "./StoryCard.css";
import { IFeedItem } from '../../Typings/Story';
import { Item } from '../Item/Item';

export interface IStoryCardProps extends IFeedItem {
    onStorySelect: (id: number) => void;
}

export const StoryCard: React.FC<IStoryCardProps> = ({onStorySelect: onShowComments, id, title, time_ago: timeAgo, url, domain, points, user: postedBy}) => {
    return (
        <>
            <SemanticItem>
                <SemanticItem.Content>
                    <Item url={url} title={title} domain={domain} />

                    <SemanticItem.Meta>
                        { points && <span className='price'>{`${points} points`}</span> }
                        { postedBy && <span className='stay'>{`by ${postedBy}`}</span> }
                        <span className='stay'>{timeAgo}</span>
                        <span className='stay' onClick={() => onShowComments(id)}><a href="#">Comments</a></span>
                    </SemanticItem.Meta>
                </SemanticItem.Content>
            </SemanticItem>
        </>
    )
}