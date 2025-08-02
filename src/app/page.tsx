import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main>
        <a href="https://himanshutamoli.me/">
          <h1 className="text-8xl text-blue-600">DO NOT CLICK</h1>
        </a>
        {
          ["profile", "profile/2", "login", "register", "forgot-password", "reset-password"].map((path) => (
            <Link
              key={path}
              href={`/${path}`}
              className="text-2xl py-3.5 px-3.5 text-green-600 hover:underline"
            >
              {path}
            </Link>
          ))
        }
      </main>
    </div>
  );
}
