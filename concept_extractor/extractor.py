import abc
import csv
from textblob import TextBlob as tb
import math
from pkg_resources import resource_string


class ExtractStrategyAbstract(object):
    """Abstract strategy class for the extract method."""

    __metaclass__ = abc.ABCMeta  # define as absctract class

    @abc.abstractmethod
    def extract_keyphrases(self, text: str):
        """Required Method"""


class FakeExtractStrategy(ExtractStrategyAbstract):
    def extract_keyphrases(self, text: str):
        return ["test"]


class TextblobTfIdfExtractStrategy(ExtractStrategyAbstract):

    def __init__(self):
        self.corpus = self.load_corpus()

    def tf(self, word, blob):
        return blob.words.count(word) / len(blob.words)

    def n_containing(self, word, corpus):
        return sum(1 for blob in corpus if word in blob.words)

    def idf(self, word, corpus):
        return math.log(len(corpus) / (1 + self.n_containing(word, corpus)))

    def tfidf(self, word, blob, corpus):
        return self.tf(word, blob) * self.idf(word, corpus)

    def load_corpus(self):
        raw_csv = resource_string(
            'resources', 'grafit_public_article.csv').decode('utf-8').splitlines()
        results = list(csv.reader(raw_csv, delimiter=','))

        tbs = []
        for result in results:
            tbs.append(tb(result[1] + " " + result[2]))

        return tbs

    def extract_keyphrases(self, text: str, top_n_words=5):
        result = []
        blob = tb(text)

        scores = {word: self.tfidf(word, blob, self.corpus)
                  for word in blob.words}
        sorted_words = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        for word, score in sorted_words[:top_n_words]:
            result.append({
                "word": word,
                "tf-idf": score
            })

        return result


def main():
    keyword_extractor = TextblobTfIdfExtractStrategy()
    print(keyword_extractor.extract_keyphrases("Vulkan Vulkan Vulkan Ollagüe (Spanish pronunciation: [oˈʝaɣwe]) or Ullawi (Aymara pronunciation: [uˈʎawi]) is a massive andesite stratovolcano in the Andes on the border between Bolivia and Chile, within the Antofagasta Region of Chile and the Potosi Department of Bolivia. Part of the Central Volcanic Zone of the Andes, its highest summit is 5,868 metres (19,252 ft) above sea level and features a summit crater that opens to the south. The western rim of the summit crater is formed by a compound of lava domes, the youngest of which features a vigorous fumarole that is visible from afar."))


if __name__ == '__main__':
    main()
