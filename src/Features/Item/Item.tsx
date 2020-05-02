import React from "react";
import { Item as SemanticItem } from 'semantic-ui-react';

export interface IItemProps {
    title: string
    url?: string;
    domain?: string;
}

export const Item: React.FC<IItemProps> = ({title, url, domain}) => {
    const convertHeaderToLink = () => {
        if (url) {
            return {
                as: "a",
                href: url,
                target: "_blank",
                rel: "noopener noreferrer"
            }
        }
    }

    return(
        <>
            <SemanticItem.Header {...convertHeaderToLink()}>
                {title}
            </SemanticItem.Header>
            {domain && <span className="domain">({domain})</span>}
        </>
    )
}