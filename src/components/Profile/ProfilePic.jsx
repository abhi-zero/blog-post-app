import React, { useEffect, useState } from "react";

export default function ProfilePic({ profileImg }) {
  const [isopen, setOpen] = useState(false);

  useEffect(() => {
    const modal = document.querySelector("dialog");
    if (isopen === true) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [isopen]);
  return (
    <div>
      <div>
        <img
          onClick={() => setOpen(!isopen)}
          className="rounded-full w-[77px] lg:w-[150px] h-[77px] lg:h-[150px] object-cover cursor-pointer"
          src={profileImg}
          alt=""
        />
      </div>
      <dialog className="top-[50%] left-[50%] absolute bg-[#E4E3E3] dark:bg-[#272829] p-5 rounded-xl w-[300px] md:w-[400px] text-[black] dark:text-white transition-all -translate-1/2 duration-300 ease-in-out">
        <h2 className="mb-3 font-medium text-xl text-center">
          Change Profile Picture
        </h2>
        <div className="flex flex-col gap-2.5">
          <button className="w-full text-[#9810FA] hover:text-[#591788] dark:hover:text-[#6189df] dark:text-[#2563EB] transition-all duration-300 ease-in-out cursor-pointer">
            <label htmlFor="file">Upload Photo</label>
            <input type="file" name="file" id="file" hidden />
          </button>
          <button className="w-full text-red-600 hover:text-red-400 transition-all duration-300 ease-in-out cursor-pointer">Remove Current Photo</button>
          <button className="w-full hover:text-[#686868] transition-all duration-300 ease-in-out cursor-pointe" onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
}
