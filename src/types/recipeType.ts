type IngredientType = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
};

type StepType = {
  step: string;
  image: string;
};

type CommentType = {
  id: number;
  userId: number;
  userNickname: string;
  canUpdate: number;
  profileImage: string;
  updatedAt: string;
  comment: string;
};

type UserType = {
  id: number;
  profileImage: string;
  nickname: string;
  date: string;
};

type RecipeDataType = {
  canUpdate: number;
  title: string;
  mainImage: string;
  category: string;
  story: string;
  bookmark: number;
  bookmarkStatus: number;
  like: number;
  likeStatus: number;
  user: UserType;
  ingredients: IngredientType[];
  steps: StepType[];
  comments: CommentType[];
};

type RecipeRegistrationDataType = {
  title: string;
  mainImage: string;
  category: string;
  story: string;
  ingredients: IngredientType[];
  steps: StepType[];
};
