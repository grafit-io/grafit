import abc
import csv
import math

from pkg_resources import resource_string
from textblob import TextBlob as tb

from ..models import Article

stopwords = set(
    ["’", "−", "—", "'s", "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
     "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't",
     "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during",
     "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he",
     "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i",
     "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me",
     "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off",
     "on", "once", "only", "or", "other", "ought", "our", "ours"    "ourselves", "out", "over", "own", "same", "shan't",
     "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the",
     "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll",
     "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't",
     "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's",
     "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd",
     "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"])


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

    def __init__(self, loadFromDB=True):
        if loadFromDB:
            self.corpus = self.load_corpus_db()
        else:
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
            'grafit.concept_extractor.resources', 'grafit_public_article.csv').decode('utf-8').splitlines()
        results = list(csv.reader(raw_csv, delimiter=','))

        tbs = []
        for result in results:
            tbs.append(tb(result[1] + " " + result[2]))

        return tbs

    def load_corpus_db(self):
        articles = Article.objects.all()

        tbs = []
        for article in articles:
            tbs.append(tb(article.title.lower() + " " + article.text.lower()))

        return tbs

    def extract_keyphrases(self, text: str, top_n_words=5):
        result = []
        blob = tb(text.lower())

        scores = {word: self.tfidf(word, blob, self.corpus)
                  for word in blob.words}
        sorted_words = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        for word, score in sorted_words:
            if word.lower() not in stopwords:
                result.append({
                    "word": word,
                    "tf-idf": score
                })

        return result[:top_n_words]
