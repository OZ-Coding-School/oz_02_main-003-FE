import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Footer from "@components/footer/Footer";
import MainHeader from "@components/header/MainHeader";
import Modal from "../components/Modal";
import BestRecipeList from "../components/BestRecipeList";
import { mainPageData } from "../data/mainPageData";
import CategorySectionList from "../components/CategorySectionList";
import { fetchData } from "../../../api/axios";
import { apiRoutes } from "../../../api/apiRoutes";
import { MainPageDataType, UserDetailType } from "../../../types/mainPageDataType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";

const MainPage: React.FC = () => {
  const [isMainPageModalOpen, setIsMainPageModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<UserDetailType>();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<MainPageDataType>({
    queryKey: ["main"],
    queryFn: () => fetchData("GET", apiRoutes.main),
  });

  useEffect(() => {
    if (data?.data.detailStatus === 1) {
      setIsMainPageModalOpen(true);
    }
    if (error) {
      console.log(error);
    }
  }, [data]);

  const handleCloseModal = () => {
    setIsMainPageModalOpen(false);
  };

  const fetchDetail = async (): Promise<UserDetailType> => {
    return await fetchData("POST", apiRoutes.userDetail, userDetail);
  };

  const mutationDetail = useMutation<UserDetailType>({
    mutationFn: fetchDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["detail"],
      });
      setIsMainPageModalOpen(false);
    },
  });

  const handleSubmitModal = (gender: string, age: number, alertStatus: boolean) => {
    // api로 넘겨야함
    let genderNumber = false;
    if (gender === "여자") {
      genderNumber = true;
    }
    setUserDetail({
      age: age,
      gender: genderNumber,
      alert: alertStatus,
    });
    mutationDetail.mutate();
  };

  return (
    <div>
      <MainHeader />
      <div className="min-h-[calc(100vh-105px)]">
        <div className="py-5 px-7 flex flex-col gap-y-[20px]">
          {isLoading ? (
            <div>
              <Skeleton height={30} width={200} />
              <Skeleton height={20} width={150} />
              <Skeleton count={6} height={200} className="my-4" />
            </div>
          ) : (
            <>
              <div>
                <div>
                  <p className="text-[20px] font-semibold">🏆 금주의 레시피 🏆 </p>
                  <p className="text-[14px] text-gray-400">냉뚝이 어워즈 인기 레시피 !</p>
                </div>
                <BestRecipeList mainPageData={mainPageData} />
              </div>

              <div className="flex flex-col gap-y-10">
                <CategorySectionList
                  mainPageData={mainPageData}
                  categoryName="daily"
                  category="일상요리"
                  categoryDescription="everyday cooking recipes"
                />
                <CategorySectionList
                  mainPageData={mainPageData}
                  categoryName="healthy"
                  category="건강요리"
                  categoryDescription="healthy cooking recipes"
                />
                <CategorySectionList
                  mainPageData={mainPageData}
                  categoryName="midnightSnack"
                  category="야식"
                  categoryDescription="dessert cooking recipes"
                />
                <CategorySectionList
                  mainPageData={mainPageData}
                  categoryName="desert"
                  category="디저트"
                  categoryDescription="midnight food recipes"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={isMainPageModalOpen}
        handleCloseModal={handleCloseModal}
        onSubmit={handleSubmitModal}
      />
      <Footer page="main" />
    </div>
  );
};

export default MainPage;
