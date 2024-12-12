import Link from "next/link";

function Footer() {
  return (
    <div>
      {" "}
      <p className="copyright mt-10 py-4">
        &copy; {new Date().getFullYear()}
        <Link href="/"> CarePulse</Link>
      </p>
    </div>
  );
}

export default Footer;
