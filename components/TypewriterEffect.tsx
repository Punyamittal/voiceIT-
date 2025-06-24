import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  words: string[];
  typingSpeed?: number; // milliseconds per character
  deletingSpeed?: number; // milliseconds per character
  delayBetweenWords?: number; // milliseconds
  className?: string;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  typingSpeed = 150,
  deletingSpeed = 100,
  delayBetweenWords = 1000,
  className = '',
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(typingSpeed);

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = words[currentWordIndex];
      if (isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setSpeed(deletingSpeed);
      } else {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setSpeed(typingSpeed);
      }

      if (!isDeleting && currentText === fullWord) {
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setSpeed(typingSpeed);
      }
    };

    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, speed, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypewriterEffect;