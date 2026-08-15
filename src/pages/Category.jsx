import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/layout/Layout";
import { getPhrases } from "../services/phrases";
import { getCategory } from "../services/categories";

function Category() {
  const { categoryId } = useParams();

  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory(categoryId),
  });

  const {
    data: phrases = [],
    isLoading: phrasesLoading,
    error: phrasesError,
  } = useQuery({
    queryKey: ["phrases", categoryId],
    queryFn: () => getPhrases(categoryId),
  });

  if (categoryLoading || phrasesLoading) {
    return (
      <Layout>
        <p className="text-center mt-10">
          Loading phrases...
        </p>
      </Layout>
    );
  }

  if (categoryError || phrasesError) {
    const error = categoryError || phrasesError;

    return (
      <Layout>
        <p className="text-center mt-10 text-red-500">
          Error loading category:
          <br />
          {error.message}
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-black mb-6"
      >
        ← Back
      </Link>

      {/* Category name */}
      <h1 className="text-3xl font-bold">
        {category.name}
      </h1>

      {/* Phrases */}
      <div className="mt-8 space-y-4">
        {phrases.map((phrase) => (
          <div
            key={phrase.id}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <p className="text-lg font-semibold">
              {phrase.english}
            </p>

            <p className="text-3xl mt-3">
              {phrase.burmese}
            </p>

            <p className="text-gray-500 mt-2">
              {phrase.romanization}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Category;