import React from "react";
import { Dimmer, Loader as SemanticLoader } from "semantic-ui-react";

interface ILoaderProps {
    Content?: string;
}

export const Loader: React.FC<ILoaderProps> = ({Content = "Loading"}) => {
    return (
        <Dimmer active inverted={true}>
            <SemanticLoader content={Content} />
        </Dimmer>
    )
}