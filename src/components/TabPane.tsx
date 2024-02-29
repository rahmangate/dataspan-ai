"use client";

import { useState } from "react";
import { Card, CardSkeleton } from "./Card";
import PaginationBar, { getPageData } from "./PaginationBar";
import { PhotoData } from "@/utils/model";

const TabPane = ({
  loading,
  data = [],
  onViewImage,
}: {
  loading: boolean;
  data: any[];
  onViewImage: (photoData: PhotoData) => void;
}) => {
  const skeleton = [0, 1, 2, 3, 4, 5, 6];
  const maxPageSize = 32;
  const totalPages = Math.ceil(data.length / maxPageSize);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <div>
        <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 gap-y-2">
          {data.length == 0 && loading
            ? skeleton.map((_, i) => <CardSkeleton key={i} />)
            : getPageData(data, currentPage, maxPageSize).map((item, i) => (
                <Card
                  key={i}
                  photoData={item}
                  onView={() => {
                    onViewImage(item);
                  }}
                />
              ))}
        </div>

        {data.length == 0 && !loading && (
          <div className="w-full text-[35px] text-center">No Records </div>
        )}

        {data.length > 0 && !loading && (
          <div className="mt-6">
            <PaginationBar
              page={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                setCurrentPage(newPage);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabPane;
