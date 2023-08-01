import { useEffect, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Button from "../components/Button";
import FlashCard from "../components/FlashCard";
import FlashCards from "../components/FlashCards";
import Header from "../components/Header";
import Main from "../components/Main";
import Loading from "../components/Loading";
import Error from "../components/Error";
import RadioButton from "../components/RadioButton";

import { helperShuffleArray } from "../helpers/arrayHelpers";
import { apiGetAllFlashCards } from "../services/apiService";
import FlashCardItem from "../components/FlashCardItem";

export default function FlashCardsPage() {
  // Back End
  const [allCards, setAllCards] = useState([]);

  // Exclusivo para estudos
  const [studyCards, setStudyCards] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [radioButtonshowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    //Promises
    // apiGetAllFlashCards().then((allFlashCards) => {
    //   setAllCards(allFlashCards);
    // });

    //IIFE
    // (async function getAllCards() {
    //   const backEndAllCards = await apiGetAllFlashCards();
    //   setAllCards(backEndAllCards);
    // })();

    // async await
    async function getAllCards() {
      try {
        const backEndAllCards = await apiGetAllFlashCards();

        setAllCards(backEndAllCards);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }
    getAllCards();
  }, []);

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards);
  }

  useEffect(() => {
    setStudyCards(allCards.map((card) => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleRadioShowDescriptionClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({...card, showTitle: false}))

    setStudyCards(updatedCards);

    setRadioButtonShowTitle(false);
  }

  function handleRadioShowTitleClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({...card, showTitle: true}))

    setStudyCards(updatedCards);

    setRadioButtonShowTitle(true);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyCards(updatedCards);
  }

  function handleDeleteFlashCard(cardId) {
    setAllCards(allCards.filter((card) => card.id !== cardId));
  }

  let mainJsx = (
    <div className=" flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading) {
    mainJsx = (
      <>
        <Tabs>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudos</Tab>
          </TabList>

          <TabPanel>
            {allCards.map((flashCard) => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onDelete={handleDeleteFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>
          <TabPanel>Cadastro</TabPanel>

          <TabPanel>
            <div className="text-center mb-4">
              <Button onButtonClick={handleShuffle}>Embaralhar cards</Button>
            </div>
            <div className="flex flex-row items-center justify-center space-x-4 m-4">
              <RadioButton
                id="radioButtonShowTitle"
                name="showInfo"
                buttonChecked={radioButtonshowTitle}
                onButtonClick={handleRadioShowTitleClick}
              >
                Mostrar titulo
              </RadioButton>
              <RadioButton
                id="radioButtonShowDescription"
                name="showInfo"
                buttonChecked={!radioButtonshowTitle}
                onButtonClick={handleRadioShowDescriptionClick}
              >
                Mostrar descrição
              </RadioButton>
            </div>
            <FlashCards>
              {studyCards.map(({ id, title, description, showTitle }) => {
                return (
                  <FlashCard
                    id={id}
                    key={id}
                    title={title}
                    description={description}
                    showFlashCardTitle={showTitle}
                    onToggleFlashCard={handleToggleFlashCard}
                  />
                );
              })}
            </FlashCards>
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <Header>react-flash-cards-v2</Header>
      <Main>{mainJsx}</Main>
    </>
  );
}
