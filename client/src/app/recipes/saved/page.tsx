import { Metadata } from "next";
import SavedRecipesListing from "./_components/saved-recipes-listing";

export const metadata: Metadata = {
  title: "Saved Recipes - Recipe Generator",
  description: "View and manage all your saved recipes generated with AI based on your tastes and ingredients.",
};

export default function SavedRecipes() {
  return <SavedRecipesListing />
}