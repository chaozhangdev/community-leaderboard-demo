/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

import { get } from "../utils/http";

type CommunityProps = {
  logo: string;
  name: string;
  members: string[];
  totalPoints: number;
  __v: number;
  _id: string;
};

const Leaderboard = () => {
  // const [users, setUsers] = useState();
  const [communities, setCommunities] = useState<CommunityProps[]>([]);

  const fetchAllCommunityData = async () => {
    const { data }: any = await get("community");
    const sortedData: CommunityProps[] = [...data].sort(
      (a, b) => b.totalPoints - a.totalPoints
    );
    setCommunities(sortedData);
  };

  useEffect(() => {
    fetchAllCommunityData();
  }, []);

  const renderBoardJsx = (data: CommunityProps[], order: number) => {
    return (
      <div className="m-5">
        <div className="flex flex-row justify-between items-center mb-4 px-4">
          <p>Rank Community</p>
          <p>EXP</p>
        </div>
        {data.map((el: CommunityProps, index) => (
          <div
            key={el._id}
            style={{
              background: index % 2 === 0 ? "#131313" : "black",
            }}
            className="flex flex-row justify-between items-center p-6"
          >
            <div className="flex flex-row justify-start items-center">
              <p className="text-l mx-2 font-bold">{index + 1 + order * 5}</p>
              <img
                className="mx-2 rounded"
                src={el.logo}
                width={50}
                height={50}
                alt="logo"
              />
              {[1, 2, 3].includes(index + 1) && order === 0 && (
                <img
                  src={`./${index + 1}.png`}
                  height={30}
                  width={30}
                  alt="rank-img"
                />
              )}

              <p className="text-l mx-2">
                {el.name} ({el.members.length} members)
              </p>
            </div>
            <p className="text-l font-bold">{el.totalPoints}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container m-auto animate__animated animate__fadeIn">
      <div className="text-left text-2xl font-bold mb-6">
        Top Community Leaderboard
      </div>
      <div className="w-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2">
          {renderBoardJsx(communities.slice(0, 5), 0)}
        </div>
        <div className="w-full sm:w-1/2">
          {renderBoardJsx(communities.slice(5, 10), 1)}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
