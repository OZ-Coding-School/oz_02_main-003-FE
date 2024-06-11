export type MainPageDataType = {
  status: number;
  message: string;
  data: {
    detailStatus: number;
    best: MainPageCategoryDataType[];
    bestBookmarked: MainPageCategoryDataType[];
    daily: MainPageCategoryDataType[];
    healthy: MainPageCategoryDataType[];
    desert: MainPageCategoryDataType[];
    midnightSnack: MainPageCategoryDataType[];
  };
};
export type MainPageCategoryDataType = {
  recipeId: number;
  user: {
    nickname: string;
    id: number;
  };
  title: string;
  mainImage: string;
  likeStatus: number;
  likesCount: number;
  bookmarkStatus: number;
  bookmarksCount: number;
};

export type UserDetailType = {
  age: number;
  gender: boolean;
  alert: boolean;
};
