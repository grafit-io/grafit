from concept_extractor.extractor import FakeExtractStrategy, TextblobTfIdfExtractStrategy


def test_function():
    assert FakeExtractStrategy().extract_keyphrases("testtestest") == ["test"]


def test_tfidf_strategy():
    # test load corpus
    keyword_extractor = TextblobTfIdfExtractStrategy()


def test_tfidf_strategy_top_word():
    keyword_extractor = TextblobTfIdfExtractStrategy()
    keywords = keyword_extractor.extract_keyphrases(
        "Vulkan Vulkan Vulkan Ollagüe (Spanish pronunciation: [oˈʝaɣwe]) or Ullawi (Aymara pronunciation: [uˈʎawi]) is a massive andesite stratovolcano in the Andes on the border between Bolivia and Chile, within the Antofagasta Region of Chile and the Potosi Department of Bolivia. Part of the Central Volcanic Zone of the Andes, its highest summit is 5,868 metres (19,252 ft) above sea level and features a summit crater that opens to the south. The western rim of the summit crater is formed by a compound of lava domes, the youngest of which features a vigorous fumarole that is visible from afar.")
    assert keywords[0]['word'] == "Vulkan"


def test_tfidf_strategy_nr_keywords():
    keyword_extractor = TextblobTfIdfExtractStrategy()
    keywords = keyword_extractor.extract_keyphrases(
        "Vulkan Vulkan Vulkan Ollagüe (Spanish pronunciation: [oˈʝaɣwe]) or Ullawi (Aymara pronunciation: [uˈʎawi]) is a massive andesite stratovolcano in the Andes on the border between Bolivia and Chile, within the Antofagasta Region of Chile and the Potosi Department of Bolivia. Part of the Central Volcanic Zone of the Andes, its highest summit is 5,868 metres (19,252 ft) above sea level and features a summit crater that opens to the south. The western rim of the summit crater is formed by a compound of lava domes, the youngest of which features a vigorous fumarole that is visible from afar.", top_n_words=10)
    assert len(keywords) == 10
