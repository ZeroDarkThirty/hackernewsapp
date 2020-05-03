import React, { useContext, useEffect } from "react";
import { IItem } from "../../Typings/Story";
import { Item as SemanticItem, Comment } from "semantic-ui-react";
import { ItemComment } from "../ItemComment/ItemComment";
import { Item } from "../Item/Item";
import HackerNewsContext from "../../Context/HackerNewsContext";
import { Loader } from "../../Loader/Loader";

export interface ISelectedItemProps {
    selectedStory: IItem;
}

export const SelectedItem: React.FC<ISelectedItemProps> = ({selectedStory}) => {
    const { isLoading } = useContext(HackerNewsContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if (isLoading) {
        return <Loader />
    }

    const renderItemWithComments = () => {
        let comments;

        if (selectedStory.comments.length === 0) {
            comments = <div>This story doesn't have any comments yet.</div>
        } else {
            // Assumption: Top twenty top-level comments, not including nested comments
            const topTwentyComments = selectedStory.comments.slice(0, 20);

            comments = topTwentyComments.map((comment) => {
                return (
                    <Comment.Group key={comment.id}>
                        <ItemComment key={comment.id} comment={comment} />
                    </Comment.Group>
                )
            })
        }

        return (
            <>
                <SemanticItem.Group>
                    <SemanticItem>
                        <SemanticItem.Content>
                        <Item title={selectedStory.title} url={selectedStory.url} domain={selectedStory.domain} />
                        </SemanticItem.Content>
                    </SemanticItem>
                </SemanticItem.Group>
                {comments}
            </>
        )
    }

    return renderItemWithComments();
}