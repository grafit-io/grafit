import abc

class ExtractStrategyAbstract(object):
    """Abstract strategy class for the extract method."""

    __metaclass__ = abc.ABCMeta # define as absctract class

    @abc.abstractmethod
    def extract_keyphrases(self, text: str):
        """Required Method"""

class FakeExtractStrategy(ExtractStrategyAbstract):
    def extract_keyphrases(self, text: str):
        return ["test"]
