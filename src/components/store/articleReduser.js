const inicialState = {
  articles: [],
  oneArticle: [],
};

const GET_ARTICLES = "GET_ARTICLES";
const ONE_ARTICLE = "ONE_ARTICLE";
const GET_ONE_ARTICLE = "GET_ONE_ARTICLE";

export const articleReduser = (state = inicialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: [...state.articles, ...action.payload.articles],
      };
    case ONE_ARTICLE:
      return {
        ...state,
        oneArticleLink: action.payload,
      };
    case GET_ONE_ARTICLE:
      return {
        ...state,
        oneArticle: [action.payload.article],
      };
    default:
      return {
        ...state,
      };
  }
};

export const getArticleAction = (payload) => ({ type: GET_ARTICLES, payload });
export const oneArticleAction = (payload) => ({ type: ONE_ARTICLE, payload });
export const getOneArticle = (payload) => ({ type: GET_ONE_ARTICLE, payload });
