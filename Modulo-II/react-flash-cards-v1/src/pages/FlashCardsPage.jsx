import FlashCard from "../components/FlashCard";
import Header from "../components/Header";
import Main from "../components/Main";
import { allFlashCards } from "../data/allFlashCards";

export default function FlashCardsPage() {
  return (
    <>
      <Header>react-flash-cards-v1</Header>
      <Main>
        <FlashCard />
      </Main>
    </>
  );
}
