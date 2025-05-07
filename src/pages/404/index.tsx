import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 bg-white">
      <h1 className="text-9xl font-bold text-[#ff8c00]">404</h1>
      <h2 className="text-4xl font-bold text-black mt-4 mb-8">Page Not Found</h2>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-14 py-3 rounded-[6px] bg-[#ff8c00] text-white font-semibold transition hover:bg-[#e07a00]"
      >
        Go Home
      </Link>
    </div>
  );
}