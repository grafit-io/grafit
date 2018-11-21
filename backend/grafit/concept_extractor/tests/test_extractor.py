from django.test import TestCase
from grafit.concept_extractor.extractor import FakeExtractStrategy, TextblobTfIdfExtractStrategy


class ExtractorTest(TestCase):

    text = """
               Vulkan Ollagüe (Spanish pronunciation: [oˈʝaɣwe]) or Ullawi 
               (Aymara pronunciation: [uˈʎawi]) is a massive andesite stratovolcano Vulkan in the 
               Andes on the border between Bolivia and Chile, within the Antofagasta Region of 
               Chile and the Potosi Department of Bolivia. Part of the Central Volcanic Zone of the 
               Andes, its highest summit is 5,868 metres (19,252 ft) above sea level and features 
               a summit crater that opens to the south. The western rim of the summit crater is 
               formed by a compound of lava domes, the youngest of which features a vigorous fumarole 
               that is visible from afar. The Vulkan...
            """

    def test_function(self):
        assert FakeExtractStrategy().extract_keyphrases("testtestest") == ["test"]

    def test_tfidf_strategy_from_db(self):
        # test load corpus
        TextblobTfIdfExtractStrategy()

    def test_tfidf_strategy_from_csv(self):
        TextblobTfIdfExtractStrategy(loadFromDB=False)

    def test_tfidf_strategy_top_word(self):
        keyword_extractor = TextblobTfIdfExtractStrategy(loadFromDB=False)
        keywords = keyword_extractor.extract_keyphrases(self.text)
        assert keywords[0]['word'] == "vulkan"

    def test_tfidf_strategy_nr_keywords(self):
        keyword_extractor = TextblobTfIdfExtractStrategy(loadFromDB=False)
        keywords = keyword_extractor.extract_keyphrases(self.text, top_n_words=10)
        assert len(keywords) == 10
