import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout/Layout";
import { getPhrases } from "../services/phrases";
import { getCategory } from "../services/categories";
import Flashcard from "../components/PhaseCard/Flashcard";

function Category() {
  const { categoryId } = useParams();
const [currentIndex, setCurrentIndex] = useState(0);
const [shuffle, setShuffle] = useState(false);
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

 const displayedPhrases = useMemo(() => {
  if (!shuffle) {
    return phrases;
  }

  const shuffled = [...phrases];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}, [phrases, shuffle]);

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
<div className="mt-8">

  {/* Shuffle button */}
  <button
    onClick={() => {
      setShuffle((value) => !value);
      setCurrentIndex(0);
    }}
    className="
      w-full
      mb-4
      bg-white
      rounded-2xl
      py-3
      shadow-sm
      font-medium
      hover:bg-gray-50
      transition
    "
  >
    {shuffle ? "Shuffle: On" : "Shuffle: Off"}
  </button>

  {displayedPhrases.length > 0 ? (
    <Flashcard
      phrase={displayedPhrases[currentIndex]}
      currentIndex={currentIndex}
      total={displayedPhrases.length}
      onNext={() => {
        setCurrentIndex((index) => index + 1);
      }}
      onPrevious={() => {
        setCurrentIndex((index) => index - 1);
      }}
    />
  ) : (
    <p>No phrases yet.</p>
  )}

</div>
      </div>
    </Layout>
  );
}

export default Category;