const DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function getSynonymsAndDefinition(word) {
  try {
    const response = await fetch(`${DICTIONARY_API_URL}${word}`);
    const data = await response.json();
    const definition = data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";
    const synonyms = data[0]?.meanings[0]?.synonyms || [];
    return { definition, synonyms };
  } catch (error) {
    console.error("Error fetching synonyms/definition:", error);
    return { definition: "Error fetching data.", synonyms: [] };
  }
}
