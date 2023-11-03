import { FaTelegram, FaFacebookF } from "react-icons/fa";
import { BsPinterest, BsYoutube, BsTwitter } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import SocialMediaItem from "../SocialMediaItem/SocialMediaItem";

function SocialMedia() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center px-5">
      <p className="sm:text-lg leading-10 text-center dark:text-gray-100">
        همیشه اولین نفر باشید! برای اطلاع از آخرین تخفیف‌ها و جدیدترین کالاها در
        شبکه‌های اجتماعی ما را دنبال کنید.
      </p>
      <div className="flex mt-20 items-center" dir="ltr">
        <SocialMediaItem title={<FaTelegram />} />
        <SocialMediaItem title={<BsPinterest />} />
        <SocialMediaItem title={<BsYoutube />} />
        <SocialMediaItem title={<GrInstagram />} />
        <SocialMediaItem title={<BsTwitter />} />
        <SocialMediaItem title={<FaFacebookF />} />
      </div>
    </div>
  );
}

export default SocialMedia;
