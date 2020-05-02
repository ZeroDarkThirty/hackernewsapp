interface IItemBase {
    id: number;
    title: string;
    points?: number | null;
    user?: string | null;
    time: number;
    time_ago: string;
    comments_count: number;
    type: string;
    url?: string;
    domain?: string;
}

export interface IFeedItem extends IItemBase {
}

export interface IItem extends IItemBase{
    content: string;
    deleted?: boolean;
    dead?: boolean;
    type: string;
    comments: IItem[]; // Comments are items too
    level: number;
}