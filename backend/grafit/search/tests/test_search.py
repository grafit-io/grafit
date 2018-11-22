from django.test import TestCase
from grafit.search.search import Search


class SearchTest(TestCase):
    def test_cleanSearchTerm_spaceToOr(self):
        testTerm = "word1 word2"
        expectedResult = "word1|word2"
        assert Search.cleanSearchTerm(testTerm) == expectedResult

    def test_cleanSearchTerm_removeAnd(self):
        testTerm = "word1&word2"
        expectedResult = "word1|word2"
        assert Search.cleanSearchTerm(testTerm) == expectedResult

    def test_cleanSearchTerm_removeExcamation(self):
        testTerm = "word1&word2"
        expectedResult = "word1|word2"
        assert Search.cleanSearchTerm(testTerm) == expectedResult

    def test_cleanSearchTerm_removeMultispace(self):
        testTerm = "   word1    word2 "
        expectedResult = "word1|word2"
        assert Search.cleanSearchTerm(testTerm) == expectedResult
