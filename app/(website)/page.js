import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/Forms/HeroForm";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <section className="pt-32 md:pt-40 lg:pt-48 text-center">
        <div className="max-w-md mx-auto mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
            Your one link<br />for everything
          </h1>
          <h2 className="text-gray-600 text-lg sm:text-xl lg:text-2xl mt-6">
            Share your links, social profiles, contact info, and more on one page
          </h2>
        </div>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
          <HeroForm user={session?.user} />
        </div>
      </section>
    </main>
  );
}
