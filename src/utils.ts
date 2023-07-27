import { Level } from "./Guess/types";

export const stringToLevel = (strLvl: string): Level => {
  switch (strLvl) {
    case "easy": return Level.Green;
    case "medium": return Level.Yellow;
    case "hard": return Level.Red;
    default: return Level.Green;
  }
}
