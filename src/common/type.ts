export type Article= {
    id: string,
    titleImg: string,
    name: string,
    theme: string,
    text: string;
    coments?: Comment[]
}

export type ShortArticle = {
    articleId: number,
    nameArticle: string,
    imgPath: string
}

export type Comment = {
    id: string,
    articleId: number,
    userId: number,
    text: string
}

export type User = {
    id: string,
    username: string,
    dateOfCreate: string
}