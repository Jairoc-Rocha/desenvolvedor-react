import { useEffect, useState } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import TextInput from "./components/TextInput"
import DateInput from "./components/DateInput"
import { getAgeFrom } from "./helpers/dateHelpers"
import { getNewId } from "./services/idServices"
import Timer from "./components/Timer"
import CheckBoxInput from "./components/CheckBoxInput"
import OnlineOffline from "./components/OnlineOffline"

export default function App() {
  const [name, setName] = useState("Raphael")
  const [birthDate, setBirthDate] = useState("1982-05-03")
  const [showTimer, setShowTimer] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    document.title = name
  },[name])

  useEffect(() => {

    function toggleOnline() {
      setIsOnline(true)
    }

    function toggleOffLine() {
      setIsOnline(false)
    }

    window.addEventListener("online", toggleOnline)
    window.addEventListener("offline", toggleOffLine)

    return () => {
      window.removeEventListener("online", toggleOnline)
      window.removeEventListener("offline", toggleOffLine)
    }

  }, [])

  function handleNameChange(newName) {
    setName(newName)
  }

  function handleBirthDateChange(newBirthDate) {
    setBirthDate(newBirthDate)
  }

  function toggleShowTimer() {
    setShowTimer(currentShowTimer => !currentShowTimer)
  }

  return (
    <>
      <Header>react-hello</Header>

      <Main>
        <OnlineOffline isOnline = {isOnline} />
        {
          showTimer && 
            <div className="text-right mt-1">
              <Timer />
            </div>
        }

        <CheckBoxInput 
          labelDescription="Mostrar cronômetro"
          onCheckBoxChange={toggleShowTimer}
        />

        <TextInput
          id={getNewId()}
          labelDescription="Digite o seu nome:"
          inputValue={name}
          onInputChange={handleNameChange}
          autoFocus
        />

        <DateInput 
          id ={getNewId()}
          labelDescription="Digite a sua data de nascimento:"
          inputValue={birthDate}
          onInputChange={handleBirthDateChange}

        />

        <p>O seu nome é {name}, com {name.length} caracter(es) e você possui {getAgeFrom(birthDate)} anos</p>
      </Main>
      
    </>
  )
}
