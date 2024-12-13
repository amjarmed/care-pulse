import Link from "next/link";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  contentStyle: string;
}
const Footer: React.FC<FooterProps> = ({
  className,
  contentStyle = "mt-10 py-4",
  ...props
}: FooterProps) => {
  return (
    <div className={className} {...props}>
      {" "}
      <p className={`copyright ${contentStyle}`}>
        &copy; {new Date().getFullYear()}
        <Link href="/"> CarePulse</Link>
      </p>
    </div>
  );
};

export default Footer;
