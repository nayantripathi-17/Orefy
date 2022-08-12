import { atom } from "recoil";

const rankState = atom({
  key: "rank",
  default: "sort",
});

const searchState = atom({
  key: "search",
  default: "",
});

export { rankState, searchState };
