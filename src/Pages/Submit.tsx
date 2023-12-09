import React from 'react';
import close_black from '../image/close_black.svg';
const Submit: React.FC = () => {

  return (
    <div className="fixed z-[2] inset-0 h-full w-full bg-[rgba(0,0,0,0.20)] bg-white flex flex-row justify-center 2xl:items-center xl:items-center lg:items-center md:items-center sm:items-center max-sm:items-center">
      <div
        className={`2xl:w-[35rem] xl:w-[45rem] lg:w-[45rem] md:w-[45rem] sm:w-[21rem] max-sm:w-[21rem] h-[38.875rem] ${true
          ? 'bg-[#FFFFFF] border-[#DAECEF]'
          : 'bg-gradient-to-r from-[#f5fffa0f] to-[#F5F7FA00] border-[#1e1f22] bg-white'
          } border-2 rounded-[1rem]`}
      >
        <div className="flex justify-between p-[3%_5%] connect_bg_container  rounded-t-[1rem]  ">
          <div className={`text-${true ? '#364152' : 'white'} font-[500] text-[1.25rem]`}>
          </div>
          <img
            src={close_black}
            alt="close"
            className="cursor-pointer"
            // onClick={() => {
            //   updateSubmittVisible(false);
            // }}
          />
        </div>
        <div className="flex justify-center   ">
        </div>
      </div>
    </div>
  );
};

export default Submit;
