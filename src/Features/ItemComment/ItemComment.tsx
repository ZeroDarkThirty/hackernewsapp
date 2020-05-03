import React from 'react';
import { IItem } from '../../Typings/Story';
import DOMPurify from 'dompurify';
import { Comment } from 'semantic-ui-react'

export interface IItemCommentsProps {
    comment: IItem;
}

export const ItemComment: React.FC<IItemCommentsProps> = ({comment}) => {
    const parseHTML = (html: string) => {
        return {__html: DOMPurify.sanitize(html)};
    }

    const nestedComments = () => {
        return (comment.comments || []).map(comment => {
            return (
                <Comment.Group key={comment.id}>
                    <ItemComment key={comment.id} comment={comment}/>
                </Comment.Group>
            )
        });
    }

    return (
        <Comment>
            <Comment.Content>
                <Comment.Author as='a'>{comment.user}</Comment.Author>
                <Comment.Metadata>
                    <div>{comment.time_ago}</div>
                </Comment.Metadata>
                <Comment.Text dangerouslySetInnerHTML={parseHTML(comment.content)} />
            </Comment.Content>
            {nestedComments()}
        </Comment>
    )
}