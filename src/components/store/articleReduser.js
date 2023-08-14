const inicialState = {
  articles: [],
  oneArticle: [],
  pageSize: 0,
  loading: true,
  redirect: false,
  tagList: [],
  tag: "",
};

const GET_ARTICLES = "GET_ARTICLES";
const ONE_ARTICLE = "ONE_ARTICLE";
const GET_ONE_ARTICLE = "GET_ONE_ARTICLE";
const PAGE_SIZE = "PAGE_SIZE";
const LOADING = "LOADING";
const REDIRECT = "REDIRECT";
const ADD_TAGS = "ADD_TAGS";
const ADD_TAGLIST = "ADD_TAGLIST";
const DEL_TAG = "DEL_TAG";
const GET_TAGS = "GET_TAGS";

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
    case PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case REDIRECT:
      return {
        ...state,
        redirect: action.payload,
      };
    case ADD_TAGS:
      return {
        ...state,
        tag: action.payload,
      };
    case ADD_TAGLIST:
      return {
        ...state,
        tagList: [...state.tagList, action.payload],
      };
    case DEL_TAG:
      return {
        ...state,
        tagList: [...action.payload],
      };
    case GET_TAGS:
      return {
        ...state,
        tagList: [...action.payload],
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
export const pageSize = (payload) => ({ type: PAGE_SIZE, payload });
export const getLoading = (payload) => ({ type: LOADING, payload });
export const getRedirect = (payload) => ({ type: REDIRECT, payload });
export const addTag = (payload) => ({ type: ADD_TAGS, payload });
export const addTaglist = (payload) => ({ type: ADD_TAGLIST, payload });
export const dellTag = (payload) => ({ type: DEL_TAG, payload });
export const addTags = (payload) => ({ type: GET_TAGS, payload });
