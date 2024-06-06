import Like from "@components/recipe/Like";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainPageCategoryDataType } from "src/types/mainPageDataType";

interface CategorySectionItemProps {
  data: MainPageCategoryDataType;
  index: number;
}

const CategorySectionItem: React.FC<CategorySectionItemProps> = ({ data, index }) => {
  return (
    <>
      <Link
        to={`/recipe/${data.recipeId}`}
        key={index}
        className="flex flex-col w-full relative cursor-pointer"
      >
        <div className="w-full h-full mt-5 mb-3 border border-gray-200 rounded-[8px] overflow-hidden">
          <img
            src={data.mainImage}
            alt="레시피 완성 이미지"
            className="w-full h-full object-cover"
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>
        <span className="text-[16px]">{data.title}</span>
        <div className="flex flex-row justify-between items-center">
          <span className="text-[12px] font-light">{data.userNickname}</span>
          <Like like={data.likesCount} likeStatus={data.likesStatus} />
        </div>
      </Link>
    </>
  );
};

export default CategorySectionItem;