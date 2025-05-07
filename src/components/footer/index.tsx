import ResourseLinks from "./ResourseLinks";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <div className="bg-[#393939] mt-4 flex flex-col items-center justify-center py-4 space-y-14 pb-10">
      <div className="flex justify-around items-center w-full flex-col md:flex-row gap-5">
        <img
          src="/footerImages/sairamInstitutions-full.png"
          alt="UBA Logo"
          className="h-16 mr-2"
        />
        <p className="text-white text-center md:w-1/3 md:text-xl ">
          The conceptualization of Unnat Bharat Abhiyan started with the
          initiative of the development and technology.The conceptualization of
          Unnaology.
        </p>
        <SocialMedia />
      </div>
      <ResourseLinks />
    </div>
  );
};

export default Footer;
