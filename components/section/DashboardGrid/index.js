import Image from "next/image";
import React, { useState } from "react";
import UserExpense from "../UserExpenseDetails";

const DashboardGrid = ({ data }) => {
  const grid = [
    {
      title: "Total ",
      desc: data ? data.totalAmount : "Loading...",

      icons: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          fill="green"
          width="35"
          height="35"
        >
          <path d="m22,19.5c0,2.481-2.019,4.5-4.5,4.5H4.814c-1.162,0-2.192-.697-2.625-1.776-.432-1.079-.168-2.295.672-3.098l7.466-7.126L2.861,4.874c-.841-.803-1.104-2.02-.671-3.098.432-1.079,1.462-1.776,2.624-1.776h12.686c2.481,0,4.5,2.019,4.5,4.5,0,.829-.672,1.5-1.5,1.5s-1.5-.671-1.5-1.5-.673-1.5-1.5-1.5H5.243l8.293,7.915c.296.283.464.675.464,1.085s-.168.802-.464,1.085l-8.293,7.915h12.257c.827,0,1.5-.673,1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5Z" />
        </svg>
      ),
    },
    {
      title: "Per Head ",
      desc: data ? data.perHeadAmount : "Loading...",

      icons: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          fill="green"
          width="35"
          height="35"
        >
          <path d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM5.683,16H1a1,1,0,0,1-1-1A6.022,6.022,0,0,1,5.131,9.084a1,1,0,0,1,1.1,1.266A6.009,6.009,0,0,0,6,12a5.937,5.937,0,0,0,.586,2.57,1,1,0,0,1-.9,1.43ZM17,24H7a1,1,0,0,1-1-1,6,6,0,0,1,12,0A1,1,0,0,1,17,24ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8Zm17,8H18.317a1,1,0,0,1-.9-1.43A5.937,5.937,0,0,0,18,12a6.009,6.009,0,0,0-.236-1.65,1,1,0,0,1,1.105-1.266A6.022,6.022,0,0,1,24,15,1,1,0,0,1,23,16Z" />
        </svg>
      ),
    },
    {
      title: "Your Amount",
      desc: data?.yourDetails?.yourAmount,
      // data?.userExpenses && data.userExpenses.length > 0
      //   ? data.userExpenses[0].yourAmount
      //   : "Loading...",
      icons: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Capa_1"
          viewBox="0 0 512 512"
          fill="green"
          width="35"
          height="35"
        >
          <g>
            <circle cx="256" cy="128" r="128" />
            <path d="M256,298.667c-105.99,0.118-191.882,86.01-192,192C64,502.449,73.551,512,85.333,512h341.333   c11.782,0,21.333-9.551,21.333-21.333C447.882,384.677,361.99,298.784,256,298.667z" />
          </g>
        </svg>
      ),
    },
    {
      title: "Your Dues",
      desc: data?.yourDetails?.yourDues?.toFixed(2),
      // data?.userExpenses && data.userExpenses.length > 0
      //   ? data.userExpenses[0].yourDues
      //   : "Loading...",

      icons: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          fill="green"
          width="35"
          height="35"
        >
          <path d="m4.003,6.081c0-1.665,1.583-3.475,3.14-4.224-.183-.183-.359-.383-.51-.598-.372-.528.049-1.259.695-1.259h2.347c.683,0,1.056.776.651,1.326-.14.19-.298.368-.462.531,1.557.75,3.138,2.559,3.138,4.223,0,1.61-1.233,2.919-2.75,2.919h-3.5c-1.517,0-2.75-1.31-2.75-2.919Zm19.148,2.6c-.515-.469-1.186-.712-1.878-.678-.697.032-1.339.334-1.794.835l-3.541,3.737c.032.21.065.42.065.638,0,2.083-1.555,3.876-3.617,4.17l-4.252.596c-.547.078-1.053-.302-1.131-.848-.078-.547.302-1.053.848-1.131l4.162-.583c.936-.134,1.748-.806,1.94-1.732.296-1.425-.79-2.685-2.164-2.685h-7.787C1.794,11,.003,12.791.003,15v5C.003,22.209,1.794,24,4.003,24h4.262c2.805,0,5.48-1.178,7.374-3.246l7.702-8.409c.948-1.062.862-2.707-.189-3.665Z" />
        </svg>
      ),
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 p-5 md:p-10 gap-5">
        {grid.map((desc, index) => (
          <div
            key={index}
            className="bg-white border border-[#141e3033] shadow-md rounded-md flex items-center  text-[#141e30] font-semibold text-2xl gap-5 p-2 py-5 whitespace-nowrap"
          >
            <div className="bg-green-50 p-4  rounded-full">{desc.icons}</div>
            <div className="flex flex-col justify-center items-center">
              <h1>{desc.title}</h1>
              <span className="font-bold text-2xl">{desc.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardGrid;
