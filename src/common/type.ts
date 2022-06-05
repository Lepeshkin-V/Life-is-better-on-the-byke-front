
export type Article= {
    id: string,
    title: string,
    text: string,
    image?: string,
    type: string,
    comments: Comment[],
    updatedAt: string,
    createdAt: string
}

export type SArticle = {
    articleId: string,
    titleImg:string,
    name: string,
    type: string,
}

export type Comment = {
    id: string,
    userId: number,
    articleId: number,
    comment: string
    user: User;
}

export type User = {
    id: string,
    login: string,
    password: string,
    updatedAt: string,
    createdAt: string,
}

export type InputType = {
  comment: string,
  userId: string,
  login: string
}

export type Arguments = {
  input: InputType,
  idArticle: string,
}

export type signUpDto = {
    login: string;
    password: string;
  };
  
  export type signInDto = {
    login: string;
    password: string;
  };
  
  export type SignResponse = {
    user: User;
    jwtToken: string;
  };
  
export type UsersState = {
    currentUser: User;
    loading: boolean;
    error: string | null;
    token: string;
  };
  
  export type ArticleDto = {
    image: string,
    title: string,
    text: string,
    type: string,
  }

  export type ArgumentsArticle = {
    id:string,
    input: ArticleDto
  }

  export type DeleteCommDto = {
    postId: string
    commentId: string,
    userId: string
  }