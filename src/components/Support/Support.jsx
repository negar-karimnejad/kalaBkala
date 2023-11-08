import { FaMicrophone } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidSend } from "react-icons/bi";
import { MdSupportAgent, MdTagFaces } from "react-icons/md";
import { useState } from "react";
import "./Support.css";

function Support() {
  const [isShowChat, setIsShowChat] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [chatValue, setChatValue] = useState("");
  const [allChat, setAllChat] = useState([]);

  const submitHandler = () => {
    chatValue && setAllChat((prev) => [...prev, chatValue]);

    if (allChat.length === 0) {
      setInterval(() => {
        setIsShowAnswer(true);
      }, 2000);
    }
    setChatValue("");
  };
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  return (
    <>
      {!isShowChat ? (
        <div
          className="fixed bottom-10 right-10 bg-rose-600 w-[4.5rem] h-[4.5rem] rounded-full z-50 shadow-lg cursor-pointer transition-all duration-100 hover:scale-110"
          onClick={() => setIsShowChat(true)}
        >
          <img
            loading="lazy"
            src="/images/support/support.svg"
            alt="support"
            className="w-50 h-50"
          />
        </div>
      ) : (
        <div className="h-[41rem] sm:w-[28rem] mx-5 fixed sm:right-5 -bottom-[45rem] bg-white flex flex-col justify-between rounded-lg overflow-hidden shadow-gray-800 shadow-2xl z-50 support__extend">
          <div className="p-3 flex justify-between bg-rose-600 text-white">
            <div className="flex items-center">
              <MdSupportAgent className="text-3xl me-3 text-gray-700 p-2 w-14 h-14 bg-white rounded-full" />
              <div>
                <h4 className="font-bold">مشاوره خرید</h4>
                <p className="text-sm opacity-70 mt-1">
                  پاسخگوی سوالات شما جهت خرید هستیم
                </p>
              </div>
            </div>
            <AiOutlineClose
              className="bg-red-700 rounded-full p-1 w-7 h-7 cursor-pointer hover:bg-red-800"
              onClick={() => setIsShowChat(false)}
            />
          </div>
          <div className="bg-[url('/images/support/bgchat.png')] w-full h-full p-4 overflow-y-auto">
            {allChat.map((chat) => (
              <>
                <div className="flex flex-col" dir="ltr">
                  <p
                    dir="rtl"
                    className="bg-red-600 relative my-2 w-fit px-6 py-2  ms-10 text-white rounded-lg support__singlechat"
                  >
                    {chat}
                  </p>
                </div>
                {isShowAnswer && (
                  <div className="flex flex-col">
                    <p className="support__answerchat bg-white text-gray-500 relative w-64 my-2 p-2 rounded-lg">
                      در حال حاضر قادر به پاسخگویی به شما نیستیم. <br />
                      در کوتاهترین مدت همکاران ما با شما ارتباط برقرار خواهند
                      کرد. با تشکر
                    </p>
                  </div>
                )}
              </>
            ))}
          </div>
          <div className="shadow-[0_0_20px_0_rgba(0,0,0,0.1)] px-4 h-20 flex justify-between">
            <div className="flex w-full">
              <div className="flex items-center w-full">
                <FaMicrophone className="opacity-50 text-xl cursor-pointer hover:opacity-100" />
                <input
                  type="text"
                  placeholder="پیامی بنویسید..."
                  className="border border-transparent focus:ring-0 focus:border-white ms-3 h-full w-full"
                  value={chatValue}
                  onChange={(e) => setChatValue(e.target.value)}
                  onKeyDown={keyHandler}
                />
              </div>
            </div>
            <div className="flex items-center">
              <MdTagFaces className="text-3xl opacity-20 cursor-pointer hover:opacity-50" />

              {chatValue ? (
                <BiSolidSend
                  onClick={submitHandler}
                  className="rotate-180 text-red-600 text-3xl ms-1 "
                />
              ) : (
                <div>
                  <input
                    type="file"
                    className="opacity-0 w-10 h-12 absolute left-5 bottom-4 z-10"
                  />
                  <img
                    loading="lazy"
                    src="/images/support/pin.svg"
                    alt="pin"
                    className="opacity-60"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Support;
