import React, { useContext } from 'react';
import { Item as SemanticItem } from 'semantic-ui-react';
import "./StoryCard.css";
import { IFeedItem } from '../../Typings/Story';
import { Item } from '../Item/Item';
import HackerNewsContext from '../../Context/HackerNewsContext';

export interface IStoryCardProps extends IFeedItem {
}

export const StoryCard: React.FC<IStoryCardProps> = (
    {id, title, time_ago: timeAgo, url, domain, points, user: postedBy, comments_count}) => {
    const context = useContext(HackerNewsContext);

    return (
        <SemanticItem>
            <SemanticItem.Content>
                <Item url={url} title={title} domain={domain} />

                <SemanticItem.Meta>
                    { points && <span className='price'>{`${points} points`}</span> }
                    { postedBy && <span className='stay'>{`by ${postedBy}`}</span> }
                    <span className='stay'>{timeAgo}</span>
                    <button className="comments-btn" onClick={() => context.getSeletedStory(id)}>
                        Comments ({comments_count})
                    </button>
                </SemanticItem.Meta>
            </SemanticItem.Content>
        </SemanticItem>
    )
}