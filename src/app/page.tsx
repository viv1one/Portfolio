import { getPortfolioProfile } from "@lib/content";

export default function Home() {
  const userData = getPortfolioProfile();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-1 text-center font-mono bg-radial-at-t from-amber-700 via-orange-300 to-rose-800 relative">
        <div className="flex relative pt-20 items-center">
          <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-2">
            <div className="flex flex-col">
              <img
                className="w-28 mx-auto rounded-full"
                src={userData.avatar}
                alt=""
              />
              <p className="text-3xl my-3 text-center dark:text-white">
                Hi, I'm {userData.firstName} 🤘
              </p>
              <h2 className="max-w-3xl text-3xl md:text-6xl font-bold mx-auto text-center py-2">
                Building digital products, brands, and experiences.
              </h2>
              <div className="flex items-center justify-center mt-4">
                <a
                  href={`mailto:${userData.email}`}
                  className="uppercase py-2 my-2 px-4 md:mt-16 bg-transparent dark:text-gray-800 dark:bg-white border-2 border-gray-800 dark:border-white text-gray-800 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-800 dark:hover:text-white text-md"
                >
                  CONNECT WITH ME
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
