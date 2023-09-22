import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("token"))?.user.token;
//Асинхронный экшон, делается с помощью createAsyncThunk
//#17: 🍕 React Pizza v2 — Асинхронные экшены в RTK (createAsyncThunk), отлавливаем ошибки
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticlesStatus",
  async (pageNumber) => {
    const data = await fetch(
      `https://blog.kata.academy/api/articles?limit=5&offset=${pageNumber}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await data.json();
    return result;
  }
);

export const getFullArticle = createAsyncThunk(
  "fullArticle/fetchArticlesStatus",
  async (slug) => {
    const data = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await data.json();
    return result;
  }
);

export const getEditArticle = (user) => {
  fetch("https://blog.kata.academy/api/articles", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((data) => data.json())
    .then(() => window.location.reload())
    .catch((err) => console.log(err));
};

export async function favoriteArticle(slug) {
  if (token) {
    return await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((data) => {
        if (data.ok) {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }
}

export async function unFavorite(slug) {
  if (token) {
    return await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((data) => {
        if (data.ok) {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }
}

export async function deleteArticle(slug) {
  fetch(`https://blog.kata.academy/api/articles/${slug.slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((data) => {
      if (data.ok) {
        window.location.reload();
      }
    })
    .catch((err) => console.log(err));
}

const initialState = {
  articles: [],
  fullArticle: {},
  pageSize: 0,
  loading: true,
  error: true,
  redirect: false,
  tagList: [],
  tag: "",
};

// const GET_ARTICLES = "GET_ARTICLES";
// const ONE_ARTICLE = "ONE_ARTICLE";
// const GET_ONE_ARTICLE = "GET_ONE_ARTICLE";
// const PAGE_SIZE = "PAGE_SIZE";
// const LOADING = "LOADING";
// const REDIRECT = "REDIRECT";
// const ADD_TAGS = "ADD_TAGS";
// const ADD_TAGLIST = "ADD_TAGLIST";
// const DEL_TAG = "DEL_TAG";
// const GET_TAGS = "GET_TAGS";
// const GET_ONE_ARTICLE_N = "GET_ONE_ARTICLE_N";

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    // getArticleAction(state, action) {
    //   state.articles = action.payload.articles;
    // },
    oneArticleAction(state, action) {
      state.oneArticleLink = action.payload;
    },
    // getOneArticle(state, action) {
    //   state.fullArticle = action.payload.article;
    // },
    getOneArticleNull(state) {
      state.fullArticle = {};
    },
    pageSize(state, action) {
      state.pageSize = action.payload;
    },
    getLoading(state, action) {
      state.loading = action.payload;
    },
    getRedirect(state, action) {
      state.redirect = action.payload;
    },
    addTag(state, action) {
      state.tag = action.payload;
    },
    addTaglist(state, action) {
      state.tagList = [...state.tagList, action.payload];
    },
    dellTag(state, action) {
      state.tagList = [...action.payload];
    },
    addTags(state, action) {
      state.tagList = [...action.payload];
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.loading = true;
      state.error = true;
      // console.log("идет отправка");
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.articles = action.payload.articles;
    },
    [fetchArticles.rejected]: (state) => {
      state.error = false;
      state.loading = false;
      console.log("была ошибка");
    },

    [getFullArticle.pending]: (state) => {
      state.loading = true;
      state.error = true;
      // console.log("идет отправка");
    },
    [getFullArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.fullArticle = action.payload.article;
    },
    [getFullArticle.rejected]: (state) => {
      state.error = false;
      state.loading = false;
      console.log("была ошибка");
    },
  },
});

export const {
  oneArticleAction,
  getOneArticleNull,
  pageSize,
  getLoading,
  getRedirect,
  addTag,
  addTaglist,
  dellTag,
  addTags,
} = articleSlice.actions;

export default articleSlice.reducer;

// export const articleReduser = (state = initialState, action) => {
//   switch (action.type) {
// case GET_ARTICLES:
//   return {
//     ...state,
//     articles: [...state.articles, ...action.payload.articles],
//   };
// case ONE_ARTICLE:
//   return {
//     ...state,
//     oneArticleLink: action.payload,
//   };
// case GET_ONE_ARTICLE:
//   return {
//     ...state,
//     fullArticle: action.payload.article,
//   };
// case GET_ONE_ARTICLE_N:
//   return {
//     ...state,
//     fullArticle: {},
//   };
// case PAGE_SIZE:
//   return {
//     ...state,
//     pageSize: action.payload,
//   };
// case LOADING:
//   return {
//     ...state,
//     loading: action.payload,
//   };
// case REDIRECT:
//   return {
//     ...state,
//     redirect: action.payload,
//   };
// case ADD_TAGS:
//   return {
//     ...state,
//     tag: action.payload,
//   };
// case ADD_TAGLIST:
//   return {
//     ...state,
//     tagList: [...state.tagList, action.payload],
//   };
// case DEL_TAG:
//   return {
//     ...state,
//     tagList: [...action.payload],
//   };
//     case GET_TAGS:
//       return {
//         ...state,
//         tagList: [...action.payload],
//       };
//     default:
//       return {
//         ...state,
//       };
//   }
// };

// export const getArticleAction = (payload) => ({ type: GET_ARTICLES, payload });
// export const oneArticleAction = (payload) => ({ type: ONE_ARTICLE, payload });
// export const getOneArticle = (payload) => ({ type: GET_ONE_ARTICLE, payload });
// export const pageSize = (payload) => ({ type: PAGE_SIZE, payload });
// export const getLoading = (payload) => ({ type: LOADING, payload });
// export const getRedirect = (payload) => ({ type: REDIRECT, payload });
// export const addTag = (payload) => ({ type: ADD_TAGS, payload });
// export const addTaglist = (payload) => ({ type: ADD_TAGLIST, payload });
// export const dellTag = (payload) => ({ type: DEL_TAG, payload });
// export const addTags = (payload) => ({ type: GET_TAGS, payload });
// export const getOneArticleNull = (payload) => ({
//   type: GET_ONE_ARTICLE_N,
//   payload,
// });
