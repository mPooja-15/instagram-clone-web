import React, { useState } from 'react';
import { TfiSettings } from 'react-icons/tfi';
import { IoMdAdd } from "react-icons/io";
import { AiOutlineInsertRowRight } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { RiPriceTag2Fill } from "react-icons/ri";
import { CiCamera } from "react-icons/ci";
import { MdClose } from "react-icons/md";

const Profile = () => {
  const [followingCount, setFollowingCount] = useState(20);
  const [highlights, setHighlights] = useState([]);
  const [isHighlightModalOpen, setIsHighlightModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [issettingModalOpen, setIsWttingModalOpen] = useState(false);
  const [highlightName, setHighlightName] = useState("");
  const [highlightImage, setHighlightImage] = useState(null);
  const [profileName, setProfileName] = useState("azevde_dd");
  const [profileImage, setProfileImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s");
  const [profileBio, setProfileBio] = useState("❤️ Lucky Boy👑\nGym Addict..⚡\nLove to play cricket 🏏\nPhotoholic ❤️\nMusic lover 🎧\nWish Me On 9 May 🎂");

  const openHighlightModal = () => setIsHighlightModalOpen(true);
  const closeHighlightModal = () => setIsHighlightModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openSetting = () => setIsWttingModalOpen(true);
  const closeSetting = () => setIsWttingModalOpen(false);
  const handleFollow = () => setFollowingCount(followingCount + 1);

  const handleAddHighlight = () => {
    if (highlightName && highlightImage) {
      const imageUrl = URL.createObjectURL(highlightImage);
      setHighlights([...highlights, { name: highlightName, imageUrl, id: Date.now() }]);
      setHighlightName("");
      setHighlightImage(null);
      closeHighlightModal();
    } else {
      alert("Please enter a name and select an image.");
    }
  };

  const handleImageChange = (event) => {
    setHighlightImage(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setHighlightName(event.target.value);
  };

  const handleDeleteHighlight = (id) => {
    setHighlights(highlights.filter(highlight => highlight.id !== id));
  };

  const handleProfileImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleProfileNameChange = (event) => {
    setProfileName(event.target.value);
  };

  const handleProfileBioChange = (event) => {
    setProfileBio(event.target.value);
  };

  return (
    <div>
      <div className="w-[975px] h-[790px] m-auto pt-[30px] pl-[20px] pr-[20px]">
        <div className="flex justify-center items-center">
          <img
            className="w-[150px] h-[150px] rounded-full border-4 border-gray-200"
            src={profileImage}
            alt="Profile"
          />
          <div className="ml-[40px]">
            <div className="mb-[20px] flex items-center justify-center space-x-4">
              <h1 className="text-xl font-semibold">{profileName}</h1>
              <button
                className="bg-[#e1e0e0] ml-4 px-4 py-2 rounded-full font-semibold text-sm"
                onClick={openEditModal}
              >
                Edit Profile
              </button>
              <button className="bg-[#e1e0e0] ml-2 px-4 py-2 rounded-full font-semibold text-sm">
                View Archive
              </button>
              <TfiSettings onClick={openSetting} className="text-2xl ml-2 cursor-pointer" />
            </div>
            <div className="mb-[10px] flex">
              <div className="flex text-center">
                <p className="text-lg font-semibold">0</p>
                <p className="text-gray-600 ml-[8px]">Posts</p>
              </div>
              <div className="ml-[40px] flex text-center">
                <p className="text-lg font-semibold">{followingCount}</p>
                <p className="text-gray-600 ml-[8px]">Following</p>
              </div>
              <div className="ml-[40px] flex text-center">
                <p className="text-lg font-semibold">300</p>
                <p className="text-gray-600 ml-[8px]">Followers</p>
              </div>
            </div>
            <pre className="text-[18px] whitespace-pre-line">{profileBio}</pre>
          </div>
        </div>

        {/* Add Highlight Button */}
        <div className="flex items-center justify-center mb-[50px]">
          <div onClick={openHighlightModal} className="w-[115px] cursor-pointer p-[15px] h-[128px]">
            <div className="bg-[#f1f4f7] text-center p-[16px] w-[87px] h-[87px] rounded-full">
              <IoMdAdd className="text-[55px] text-gray-300" />
            </div>
            <h1 className="text-[15px] text-center pt-[10px]">New</h1>
          </div>

          {/* Display Highlights */}
          <div className="flex flex-wrap">
            {highlights.map((highlight) => (
              <div key={highlight.id} className="w-[115px] cursor-pointer p-[15px] h-[128px] text-center">
                <div className="bg-[#f1f4f7] text-center p-[16px] w-[87px] h-[87px] rounded-full">
                  <img
                    className="w-[100px] h-full rounded-full"
                    src={highlight.imageUrl}
                    alt={highlight.name}
                  />
                </div>
                <h1 className="text-[15px] text-center pt-[10px]">{highlight.name}</h1>
                <button
                  onClick={() => handleDeleteHighlight(highlight.id)}
                  className="mt-2 text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[705px] m-auto h-[1px] bg-[#a1a1a1]"></div>
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center">
            <AiOutlineInsertRowRight />
            <h1 className="text-[14px] ml-[5px]">POSTS</h1>
          </div>
          <div className="ml-[40px] flex items-center justify-center">
            <BsBookmark />
            <h1 className="text-[14px] ml-[5px]">SAVED</h1>
          </div>
          <div className="ml-[40px] flex items-center justify-center">
            <RiPriceTag2Fill />
            <h1 className="text-[14px] ml-[5px]">TAGGED</h1>
          </div>
        </div>
        <div className="w-[450px] m-auto text-center">
          <div className="w-[100px] h-[100px] p-[15px] m-auto mt-[40px] rounded-full border-[#000] mb-[20px] border-[1px]">
            <CiCamera className="text-[60px] m-auto" />
          </div>
          <h1 className="font-semibold text-[30px]">Share Photos</h1>
          <p className="text-[14px]">When you share photos, they will appear on your profile.</p>
          <span className="text-[14px] text-[#0095f6]">Share your First Photos</span>
        </div>
      </div>

      {/* Highlight Modal */}
      {isHighlightModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-70"
          onClick={closeHighlightModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-[400px] text-[#000] h-[400px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className='text-[16px] border-b-[1.5px] text-center pb-[10px]'>Create new Highlight</h1>
            <input
              type="text"
              placeholder="Enter highlight name"
              value={highlightName}
              onChange={handleNameChange}
              className="w-full border p-2 mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            <button
              onClick={handleAddHighlight}
              className="w-full bg-[#1877F2] text-[#fff] hover:bg-[#0652dd] text-[16px] py-2 rounded-[10px]"
            >
              Add Highlight
            </button>
            <button
              className="absolute top-3 right-3 text-[#fff] text-[28px] hover:text-[#ddd]"
              onClick={closeHighlightModal}
            >
              <MdClose />
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-70"
          onClick={closeEditModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-[400px] text-[#000] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className='text-[16px] border-b-[1.5px] text-center pb-[10px]'>Edit Profile</h1>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="mb-4"
            />
            <input
              type="text"
              placeholder="Enter your name"
              value={profileName}
              onChange={handleProfileNameChange}
              className="w-full border p-2 mb-4"
            />
            <textarea
              placeholder="Enter your bio"
              value={profileBio}
              onChange={handleProfileBioChange}
              className="w-full border p-2 mb-4"
              rows="6"
            />
            <button
              onClick={closeEditModal}
              className="w-full bg-[#1877F2] text-[#fff] hover:bg-[#0652dd] text-[16px] py-2 rounded-[10px]"
            >
              Save Changes
            </button>
            <button
              className="absolute top-3 right-3 text-[#fff] text-[28px] hover:text-[#ddd]"
              onClick={closeEditModal}
            >
              <MdClose />
            </button>
          </div>
        </div>
      )}
      {issettingModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-70"
          onClick={closeSetting}
        >
          <div
            className="bg-white p-6 rounded-lg w-[400px] text-[#000] relative">
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
