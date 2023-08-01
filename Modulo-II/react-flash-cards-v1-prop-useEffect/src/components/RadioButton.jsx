import { getNewId } from "../services/idService";

export default function RadioButton({
  id = getNewId(),
  name = "RadionButtonName",
  children: buttonDescription = "Descrição do botão",
  buttonChecked = false,
  onButtonClick = false,
}) {
  function handleRadioButtonChange() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <div className="flex flex-row items-center space-x-2">
      <input
        type="radio"
        name={name}
        id={id}
        checked={buttonChecked}
        onChange={handleRadioButtonChange}
      />
      <label htmlFor={id}>{buttonDescription}</label>
    </div>
  );
}
