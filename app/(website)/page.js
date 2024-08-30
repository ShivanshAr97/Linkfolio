import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/Forms/HeroForm";
import { getServerSession } from "next-auth";
import hero from "@/components/hero.jpeg";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="grid grid-cols-2 items-center  h-screen bg-gray-100 -mx-4xl">
      <section className="flex flex-col border ">
        <div className="pl-12 ">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
            One link for your<br /> <span className="text-blue-700">every need</span> in one place.
          </h1>
          <h2 className="text-gray-600 text-lg sm:text-xl lg:text-2xl mt-6">
            Share your links, social profiles, contact info, and more on one
            page
          </h2>
        </div>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
          <HeroForm user={session?.user} />
        </div>
      </section>
      <div className="border mx-auto w-fit">
        <Image
          src={hero}
          className="h-[30rem] w-[20rem] rounded-md object-cover"
          alt="eg"
        />
      </div>
    </main>
  );
}
