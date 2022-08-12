import { atom } from "recoil";

const rankState = atom({
  key: "rank",
  default: "",
});

const searchState = atom({
  key: "search",
  default: "",
});

export { rankState, searchState };
