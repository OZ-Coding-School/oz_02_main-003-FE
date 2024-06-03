import React, { useState } from "react";

interface ScrapProps {
  id?: number;
  book: number;
  bookStatus: number;
}

const dummyData: ScrapProps = {
  id: 1,
  book: 10,
  bookStatus: -1,
};

const Scrap: React.FC<ScrapProps> = ({ id, book, bookStatus }) => {
  const [scrapCount, setScrapCount] = useState<{ book: number; booked: boolean }>({
    book: dummyData.book,
    booked: dummyData.bookStatus === 1,
  });

  const handleScrap = () => {
    setScrapCount((prevState) => ({
      book: prevState.booked ? prevState.book - 1 : prevState.book + 1,
      booked: !prevState.booked,
    }));
  };

  return (
    <div className="flex items-center">
      <button
        className={`ml-3 rounded-full focus:outline-none transition-colors ${
          scrapCount.booked ? "bg-white text-leafGreen" : "bg-white text-leafGreen"
        }`}
        onClick={handleScrap}
      >
        <svg
          className="w-6 h-6"
          fill={scrapCount.booked ? "currentColor" : "none"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v18l-7-3.5L5 23V5z" />
        </svg>
      </button>
      <span className="ml-1 text-[#000000]/50">{scrapCount.book}</span>
    </div>
  );
};

export default Scrap;
