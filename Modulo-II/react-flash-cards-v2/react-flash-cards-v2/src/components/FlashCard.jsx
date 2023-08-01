export default function FlashCard({
  id,
  title = "Titulo do card",
  description = "Descrição do card, que pode contar mais palavras do que o título",
  showFlashCardTitle = true,
  onToggleFlashCard = null,
}) {
  function handleCardClick() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
  }

  const fontSizeClassName = showFlashCardTitle ? "text-xl" : "text-sm";

  return (
    <div
      className={`shadow-lg m-2 p-4 w-80 h-48 cursor-pointer
                    flex flex-row items-center justify-center 
                    font-semibold ${fontSizeClassName} font-mono`}
      onClick={handleCardClick}
    >
      {showFlashCardTitle ? title : description}
    </div>
  );
}
