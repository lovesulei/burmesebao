import Layout from "../components/Layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categories";
import { Link } from "react-router-dom";

function Home() {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log("categories:", categories);
  console.log("isLoading:", isLoading);
  console.log("error:", error);

  if (isLoading) {
    return (
      <Layout>
        <p className="text-center mt-10">Loading Burmese lessons... 🇲🇲</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p className="text-center mt-10 text-red-500">
          Error loading categories:
          <br />
          {error.message}
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Burmese Bao</h1>
      </div>

      <div className="mt-8 space-y-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="
              bg-white
              rounded-2xl
              p-5
              shadow-sm
              flex
              items-center
              gap-4
              cursor-pointer
              hover:scale-[1.02]
              transition
            "
          >
            <h2 className="text-lg font-semibold">{category.name}</h2>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
