import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

interface FooterLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

const FooterLink = (props: FooterLinkProps) => {
  return (
    <Link
      to={props.to}
      className={cn(props.className, "hover:underline underline-offset-2")}
    >
      {props.children}
    </Link>
  );
};

export default FooterLink;
