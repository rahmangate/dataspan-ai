"use client";
import { Card, CardSkeleton } from "@/components/Card";
import ImageModal from "@/components/ImageModal";
import { DataRecord, viewAlbum } from "@/service/aws";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore";

export default function Home() {
  const {
    trainData,
    setTrainData,
    validData,
    setValidData,
    testData,
    setTestData,
    refresh,
  } = useStore();

  const [activeTab, setActiveTab] = useState("All Groups");
  const tabs = ["All Groups", "Train", "Valid", "Test"];
  const [openModal, setOpenModal] = useState(false);
  const skeleton = [1, 2, 3, 4, 5, 6];

  const data = [...trainData.data, ...validData.data, ...testData.data];

  const [loadingTrainData, setLoadingTrainData] = useState(false);
  const [loadingValueData, setLoadingValueData] = useState(false);
  const [loadingTestData, setLoadingTestData] = useState(false);

  useEffect(() => {
    if (trainData.canFetch && trainData.data.length == 0) {
      fetchTrainData();
    }
    if (validData.canFetch && validData.data.length == 0) {
      fetchValueData();
    }
    if (testData.canFetch && testData.data.length == 0) {
      fetchTestData();
    }
  }, []);

  const fetchTrainData = async () => {
    setLoadingTrainData(true);
    let resp = await viewAlbum("bone-fracture-detection/test/train/");
    setLoadingTrainData(false);
    if (resp.success && resp.data) {
      console.log(resp.data);
      setTrainData({ canFetch: false, data: resp.data });
      return;
    }
    console.log(resp.message);
  };
  const fetchTestData = async () => {
    setLoadingTrainData(true);
    let resp = await viewAlbum("bone-fracture-detection/test/images/");
    setLoadingTrainData(false);
    if (resp.success && resp.data) {
      console.log(resp.data);
      setTrainData({ canFetch: false, data: resp.data });
      return;
    }
    console.log(resp.message);
  };
  const fetchValueData = async () => {
    setLoadingTrainData(true);
    let resp = await viewAlbum("bone-fracture-detection/value/image/");
    setLoadingTrainData(false);
    if (resp.success && resp.data) {
      console.log(resp.data);
      setTrainData({ canFetch: false, data: resp.data });
      return;
    }
    console.log(resp.message);
  };

  const getCount: { [key: string]: number } = {
    "All Groups": data.length || 0,
    Train: trainData.data.length || 0,
    Valid: validData.data.length || 0,
    Test: testData.data.length || 0,
  };

  return (
    <>
      <main className="max-w-[996px] mx-auto p-2 pb-[50px]">
        <div className="flex justify-between mb-7">
          <div className="text-[32px] text-dark font-semibold">
            Bone-fracture-detection
          </div>
          <div className="pt-4 text-[18px] text-dark text-normal">
            {/*   <span className="font-medium">50</span> of{" "} */}
            <span className="font-medium">{getCount[activeTab]}</span> images
          </div>
        </div>

        <div className=" flex border-b-[1px] border-gray-100">
          {tabs.map((text, i) => (
            <Tab
              key={i}
              name={text}
              active={activeTab == text}
              onTabChange={(text) => setActiveTab(text)}
            />
          ))}
        </div>
        <div className="mb-3 flex justify-end w-full">
          <div
            className="text-gray-500 p-2 cursor-pointer text-[12px]"
            onClick={() => refresh()}
          >
            Refresh
          </div>
        </div>
        <div>
          {activeTab == "All Groups" && (
            <div>
              {
                <div className="flex flex-wrap gap-5">
                  {data.length == 0 &&
                  (loadingTrainData || loadingValueData || loadingTestData)
                    ? skeleton.map((_, i) => <CardSkeleton key={i} />)
                    : data.slice(0, 40).map((item, i) => (
                        <Card
                          key={i}
                          text={item.label}
                          image={item.image}
                          onView={() => {
                            setOpenModal(true);
                          }}
                        />
                      ))}
                </div>
              }
            </div>
          )}

          {activeTab == "Train" && (
            <div>
              {
                <div className="flex flex-wrap gap-5">
                  {loadingTrainData
                    ? skeleton.map((_, i) => <CardSkeleton key={i} />)
                    : trainData.data.slice(0, 10).map((item, i) => (
                        <Card
                          key={i}
                          text={item.label}
                          image={item.image}
                          onView={() => {
                            setOpenModal(true);
                          }}
                        />
                      ))}
                </div>
              }
            </div>
          )}

          {activeTab == "Value" && (
            <div>
              {
                <div className="flex flex-wrap gap-5">
                  {loadingValueData
                    ? skeleton.map((_, i) => <CardSkeleton key={i} />)
                    : validData.data.slice(0, 10).map((item, i) => (
                        <Card
                          key={i}
                          text={item.label}
                          image={item.image}
                          onView={() => {
                            setOpenModal(true);
                          }}
                        />
                      ))}
                </div>
              }
            </div>
          )}
          {activeTab == "Test" && (
            <div>
              {
                <div className="flex flex-wrap gap-5">
                  {loadingTestData
                    ? skeleton.map((_, i) => <CardSkeleton key={i} />)
                    : testData.data.slice(0, 10).map((item, i) => (
                        <Card
                          key={i}
                          text={item.label}
                          image={item.image}
                          onView={() => {
                            setOpenModal(true);
                          }}
                        />
                      ))}
                </div>
              }
            </div>
          )}

          <div className="flex justify-center">
            <div className="flex"></div>
          </div>
        </div>
        <ImageModal
          open={openModal}
          image=""
          onClose={() => setOpenModal(false)}
        />
      </main>
    </>
  );
}

const Tab = ({
  name,
  active,
  onTabChange,
}: {
  name: string;
  active: boolean;
  onTabChange: (name: string) => void;
}) => (
  <div
    className={`pt-1 h-[27px] px-3 text-dark text-[14px] cursor-pointer border-b-[1px] border-b-transparent hover:font-medium ${
      active ? "text-yellow bg-yellow-50 font-medium border-b-yellow" : ""
    }`}
    onClick={() => onTabChange(name)}
  >
    {name}
  </div>
);

const data = [
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
  { text: "Tfdfdfdfdfdf dfdf", image: "" },
];
