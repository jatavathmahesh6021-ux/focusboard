import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

function FocusNotes() {
  const slides = [
    {
      id: 1,
      tag: "FOCUS NOTES - 1 OF 3",
      title: "Plan your day",
      description: "Organise your top priorities early in the morning and focus on the tasks that matter most."
    },
    {
      id: 2,
      tag: "FOCUS NOTES - 2 OF 3",
      title: "Stay in deep work",
      description: "Break big deliverables into smaller steps and complete one task at a time without distractions."
    },
    {
      id: 3,
      tag: "FOCUS NOTES - 3 OF 3",
      title: "Review and celebrate",
      description: "Update your task statuses at the end of the day to track your completion progress clearly."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrevious() {
    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function handleNext() {
    if (currentIndex === slides.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function handleDotClick(index) {
    setCurrentIndex(index);
  }

  const activeSlide = slides[currentIndex];

  return (
    <section className="focus-notes-section" aria-label="Focus Notes Carousel">
      <div className="focus-notes-card">
        <div className="focus-notes-header">
          <div className="focus-notes-tag">
            <Sparkles size={16} />
            <span>{activeSlide.tag}</span>
          </div>
          <div className="focus-notes-controls">
            <button
              type="button"
              className="carousel-btn"
              onClick={handlePrevious}
              aria-label="Previous focus note"
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>
            <button
              type="button"
              className="carousel-btn"
              onClick={handleNext}
              aria-label="Next focus note"
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="focus-notes-body">
          <h2 className="focus-notes-title">{activeSlide.title}</h2>
          <p className="focus-notes-desc">{activeSlide.description}</p>
        </div>

        <div className="focus-notes-indicators" role="tablist" aria-label="Slide indicators">
          {slides.map(function (slide, index) {
            const isSelected = index === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                className={isSelected ? "indicator-dot indicator-dot-active" : "indicator-dot"}
                onClick={function () {
                  handleDotClick(index);
                }}
                aria-label={"Go to slide " + (index + 1)}
                aria-selected={isSelected}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FocusNotes;