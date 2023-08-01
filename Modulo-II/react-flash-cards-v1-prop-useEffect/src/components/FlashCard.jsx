import { useEffect, useState } from "react";

export default function FlashCard({
  title = "Titulo do card",
  description = "Descrição do card, que pode contar mais palavras do que o título",
  showFlashCardTitle = true,
}) {
  const [showTitle, setShowTitle] = useState(showFlashCardTitle);

  useEffect(() => {
    setShowTitle(showFlashCardTitle);
  }, [showFlashCardTitle]);

  function handleCardClick() {
    setShowTitle((currentShowTile) => !currentShowTile);
  }

  const fontSizeClassName = showTitle ? "text-xl" : "text-sm";

  return (
    <div
      className={`shadow-lg m-2 p-4 w-80 h-48 cursor-pointer
                    flex flex-row items-center justify-center 
                    font-semibold ${fontSizeClassName} font-mono`}
      onClick={handleCardClick}
    >
      {showTitle ? title : description}
    </div>
  );
}
