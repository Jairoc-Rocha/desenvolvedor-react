import { useState } from "react";

export default function FlashCard({
  title = "Titulo do card",
  description = "Descrição do card, que pode contar mais palavras do que o título",
}) {
  const [showTitle, setShowTitle] = useState(true);

  function handleCardClick() {
    setShowTitle((currentShowTile) => !currentShowTile);
  }

  const fontSizeClassName = showTitle ? "text-xl" : "text-md";

  return (
    <div
      className={`shadow-lg p-4 w-64 h-32 cursor-pointer
                    flex flex-row items-center justify-center 
                    font-semibold ${fontSizeClassName} font-mono`}
      onClick={handleCardClick}
    >
      {showTitle ? title : description}
    </div>
  );
}
