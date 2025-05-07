import FooterSocialIcon from "./SocialMediaIcon";

const SocialMedia = () => {
  return (
    <div className="flex flex-row items-center space-x-4 justify-center ">
      <FooterSocialIcon
        src="/footerImages/instagram.png"
        alt="Instagram Logo"
        href="https://www.instagram.com/sairam.uba/?igshid=p4q0q"
      />
      <FooterSocialIcon
        src="/footerImages/youtube.png"
        alt="youtube Logo"
        href="https://www.youtube.com/channel/UCejM5ohr3QocEdXgmHhPjRQ"
      />
      <FooterSocialIcon
        src="/footerImages/twitter.png"
        alt="twitter Logo"
        href="https://www.instagram.com/sairam.uba/?igshid=p4q0q"
      />
      <FooterSocialIcon
        src="/footerImages/linkedin.png"
        alt="linkedin Logo"
        href="https://www.linkedin.com/in/sairam-uba-4296721b3/"
      />
    </div>
  );
};

export default SocialMedia;
