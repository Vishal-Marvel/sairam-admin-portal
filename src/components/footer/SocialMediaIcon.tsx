import { Link } from "react-router";
import { cn } from "../../lib/utils";

interface FooterSocialIconProps {
  src?: string;
  alt?: string;
  className?: string;
  href?: string;
}

const FooterSocialIcon = (props: FooterSocialIconProps) => {
  return (
    <Link
      to={props.href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:-translate-y-2 hover:transition-transform duration-300"
    >
      <img
        className={cn(props.className, "w-8 h-8 object-contain mr-2")}
        src={props.src}
        alt={props.alt}
      />
    </Link>
  );
};

export default FooterSocialIcon;
