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
    const { getSeletedStory } = useContext(HackerNewsContext);

    return (
        <SemanticItem>
            <SemanticItem.Content>
                <Item url={url} title={title} domain={domain} />

                <SemanticItem.Meta>
                    { points && <span>{`${points} points`}</span> }
                    { postedBy && <span>{`by ${postedBy}`}</span> }
                    <span>{timeAgo}</span>
                    <button className="comments-btn" onClick={() => getSeletedStory(id)}>
                        Comments ({comments_count})
                    </button>
                </SemanticItem.Meta>
            </SemanticItem.Content>
        </SemanticItem>
    )
}