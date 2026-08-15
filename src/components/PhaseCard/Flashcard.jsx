import { useState } from "react";

function Flashcard({ phrase, onNext, onPrevious, currentIndex, total }) {
  const [showAnswer, setShowAnswer] = useState(false);

  function handleNext() {
    setShowAnswer(false);
    onNext();
  }

  function handlePrevious() {
    setShowAnswer(false);
    onPrevious();
  }

  return (
    <div>
      {/* Progress */}
      <p className="text-center text-sm text-gray-400 mb-4">
        {currentIndex + 1} / {total}
      </p>

      {/* Flashcard */}
      <div
        onClick={() => setShowAnswer(!showAnswer)}
        className="
          bg-white
          rounded-3xl
          p-8
          shadow-sm
          min-h-[280px]
          flex
          flex-col
          items-center
          justify-center
          text-center
          cursor-pointer
          select-none
          hover:shadow-md
          transition
        "
      >
        {!showAnswer ? (
          <>
            <p className="text-sm text-gray-400 mb-4">Translate this</p>

            <p className="text-2xl font-semibold">{phrase.english}</p>
          </>
        ) : (
          <>
            <p className="text-4xl">{phrase.romanization}</p>

            <p className="text-gray-500 mt-4">{phrase.burmese}</p>
          </>
        )}
      </div>

      {/* Listen */}
      <button
        onClick={(event) => {
          event.stopPropagation();
          // We'll add audio here later
        }}
        className="
          w-full
          mt-4
          bg-white
          rounded-2xl
          py-3
          shadow-sm
          font-medium
          hover:bg-gray-50
          transition
        "
      >
        🔊 Listen
      </button>

      {/* Navigation */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="
            flex-1
            bg-white
            rounded-2xl
            py-3
            shadow-sm
            disabled:opacity-40
            hover:bg-gray-50
            transition
          "
        >
          ← Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === total - 1}
          className="
            flex-1
            bg-white
            rounded-2xl
            py-3
            shadow-sm
            disabled:opacity-40
            hover:bg-gray-50
            transition
          "
        >
          Next →
        </button>
      </div>

      <p className="text-center text-sm text-gray-400 mt-4">
        Tap the card to reveal the answer
      </p>
    </div>
  );
}

export default Flashcard;
