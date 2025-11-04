const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  bn: () => import("./bn.json").then((module) => module.default),
};

const getDictionary = (locale) => dictionaries[locale]();

export default getDictionary;
