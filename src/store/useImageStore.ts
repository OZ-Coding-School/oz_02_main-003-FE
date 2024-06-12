import { create } from "zustand";

interface ImageStore {
  mainImage: imageUpload;
  setMainImage: (newData: imageUpload) => void;
  stepImage: imageUpload[];
  setStepImage: (newData: imageUpload[]) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  mainImage: {
    action: "write",
    type: "main",
    order: 0,
    image: "",
  },
  setMainImage: (newData) => set({ mainImage: newData }),
  stepImage: [
    {
      action: "write",
      type: "step",
      order: 0,
      image: "",
    },
  ],
  setStepImage: (newData) => set({ stepImage: newData }),
}));
