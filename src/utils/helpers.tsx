
import { Modal } from "antd";
import { GAME_TYPES } from "./consts";

//CARD HELPER LOGICS
function rankCombination(combo: string): number[] {
  return combo
    .split("-")
    .map(card => parseInt(card));
}

export const comboSorter =(a: string, b: string): number=> {
  const combA = rankCombination(a);
  const combB = rankCombination(b);

  for (let i = 0; i < combA.length; i++) {
    if (combA[i] !== combB[i]) {
      return combA[i] - combB[i];
    }
  }
  return 0; //equal
}

export const safeNumber = (val: number | string | null): number => {
  return typeof val === 'number' ? val : 0;
};

export const intlMobileFormat = (number:string) =>{
  return "+63"+number.substring(1);
}

export const formatGender = (gender:number | undefined) =>{
  if(gender == undefined) return "";
  return gender == 1 ? "Male" : "Female";
}

export const getPercentage = (total: number, amount:number) => {
  return (amount/total) *100;
}

export const getGameType = (gameName:string) => {
  return GAME_TYPES.find((e) => e.label == gameName);
}

//// --------------------HELPER MODALS
export const cancellationModal = ( handleOkay:()=>void) => {
  Modal.confirm({
    title: 'Confirmation!',
    content: 'Are you sure you want to cancel this entry?',
    okText: "Yes",
    cancelText: "No",
    onOk: handleOkay,
    cancelButtonProps: {
      variant: 'outlined'
    },
    okButtonProps:{
      danger: true
    }
  });
}

export const updateModal = ( handleOkay:()=>void) => {
  Modal.confirm({
    title: 'Confirmation!',
    content: 'Are you sure you want to update this entry?',
    okText: "Save",
    cancelText: "No",
    onOk: handleOkay,
    cancelButtonProps: {
      variant: 'outlined'
    },
  });
}

export const deletionModal = ( handleOkay:()=>void, bodyText: string) => {
  Modal.confirm({
    title: 'Confirmation!',
    content: bodyText,
    okText: "Yes",
    cancelText:  "No",
    onOk: handleOkay,
    cancelButtonProps: {
      variant: 'outlined'
    },
    okButtonProps:{
      danger: true
    }
  });
}

const images = import.meta.glob('../assets/game_logo/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});

// Game name to image filename mapping
const gameImageMap: Record<string, string> = {
  'Aztec Treasure Hunt': 'Aztec-Bonanza.png',
  'Volcano Goddess': 'Voodoo-Magic.png',
  'Roulette 1 - Azure': 'Mysterious.png',
  'Blackjack X 1 - Azure': 'Black-Bull.png',
  'Gem Fire Fortune': 'Elemental-Gems-Megaways.png',
  'Wild West Gold Blazing Bounty': 'Wild-West-Gold-Megaways.png',
  'Finger Lick’n Free Spins': 'Spin-Score-Megaways.png',
  'Gold Party 2 - After Hours': 'Gold-Party.png',
};

export const getGameImage = (gameName: string): string => {
  const fileName = gameImageMap[gameName] || 'Book-Of-Kingdoms.png';

  for (const path in images) {
    if (path.includes(fileName)) {
      return images[path] as string;
    }
  }

  return images['Book-Of-Kingdoms.png'] as string; // fallback if image not found
};