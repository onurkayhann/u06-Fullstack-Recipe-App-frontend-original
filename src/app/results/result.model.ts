export type ResultModel = {
  number: number;
  offset: number;
  totalResults: number;
  results: RecipeDetail[];
};

export interface RecipeDetail {
  pricePerServing: number;
  extendedIngredients?: ExtendedIngredientsEntity[] | null;
  id: number;

  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines?: string[] | null;
  instructions: string;
  analyzedInstructions?: AnalyzedInstructionsEntity[] | null;
}
export interface ExtendedIngredientsEntity {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta?: string[] | null;
  measures: Measures;
}
export interface Measures {
  us: UsOrMetric;
  metric: UsOrMetric;
}
export interface UsOrMetric {
  amount: number;
  unitShort: string;
  unitLong: string;
}
export interface AnalyzedInstructionsEntity {
  name: string;
  steps?: StepsEntity[] | null;
}
export interface StepsEntity {
  number: number;
  step: string;
  ingredients?: IngredientsEntityOrEquipmentEntity[] | null;
  equipment?: IngredientsEntityOrEquipmentEntity[] | null;
}
export interface IngredientsEntityOrEquipmentEntity {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}
