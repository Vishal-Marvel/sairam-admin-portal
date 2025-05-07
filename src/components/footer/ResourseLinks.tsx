import FooterLink from "./FooterLink";

const ResourceLinks = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-around w-full gap-10 text-white p-5">
      {/* General Info */}
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-lg">General Information</h3>
        <ul className="text-[#d7d7d7] text-sm flex flex-wrap md:flex-col gap-3">
          <li>
            <FooterLink to="/about">About Us</FooterLink>
          </li>
          <li>
            <FooterLink to="/terms">Terms and Conditions</FooterLink>
          </li>
          <li>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
          </li>
          <li>
            <FooterLink to="/faqs">FAQs</FooterLink>
          </li>
        </ul>
      </div>

      {/* Useful Resources */}
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-lg">Useful Resources</h3>
        <ul className="text-[#d7d7d7] text-sm flex flex-wrap md:flex-col gap-3">
          <li>
            <FooterLink to="/guide">User Guide</FooterLink>
          </li>
          <li>
            <FooterLink to="/blog">Blog</FooterLink>
          </li>
          <li>
            <FooterLink to="/knowledge-base">Knowledge Base</FooterLink>
          </li>
          <li>
            <FooterLink to="/help">Help Center</FooterLink>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-lg">Contact Us</h3>
        <div className="text-[#d7d7d7] text-sm grid grid-cols-[auto_1fr] gap-2 items-start">
          <span>Email:</span>
          <FooterLink to="mailto:uba@sairam.edu.in">
            uba@sairam.edu.in
          </FooterLink>

          <span>Phone:</span>
          <FooterLink to="tel:+04422512222">044-2251 2222</FooterLink>

          <span>Address:</span>
          <address className="not-italic md:col-span-2 leading-relaxed">
            SRI SAI RAM ENGINEERING COLLEGE, <br />
            Sai Leo Nagar, West Tambaram, <br />
            Chennai - 600 044, Tamil Nadu, India
          </address>
        </div>
      </div>
    </div>
  );
};

export default ResourceLinks;
