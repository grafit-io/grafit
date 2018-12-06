from ..models import SearchResult, SearchWord
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class Search:

    @staticmethod
    def __cleanSearchTerm(searchTerm: str) -> str:

        searchTerm = searchTerm.strip()

        # Remove critical character for ts_query
        searchTerm = searchTerm.replace("&", " ")
        searchTerm = searchTerm.replace("!", " ")
        searchTerm = searchTerm.replace("|", " ")

        # Remove multiple withspace
        searchTerm = ' '.join(searchTerm.split())

        # Add OR between all words
        searchTerm = searchTerm.replace(" ", "|")

        return searchTerm

    @staticmethod
    def __runSearchQuery(searchTerm: str):
        return SearchResult.objects.raw('''
            SELECT grafit_search_index.id, ts_headline(grafit_search_index.title, to_tsquery('english', %(query)s)) as title, ts_headline(grafit_article.text, to_tsquery('english', %(query)s)) as headline, ts_rank(document, to_tsquery('english', %(query)s)) as rank
            FROM grafit_search_index
            INNER  JOIN grafit_article  ON grafit_article.id = grafit_search_index.id
            WHERE grafit_search_index.document @@ to_tsquery('english', %(query)s)
            ORDER BY rank DESC 
            LIMIT 25''', {'query': searchTerm})

    @staticmethod
    def __findSimilarWord(word: str) -> str:

        queryset = SearchWord.objects.raw('''
            SELECT word, similarity(word, %(word)s) as similarity
            FROM grafit_search_word
            WHERE similarity(word, %(word)s) > 0.5
            ORDER BY similarity desc
            LIMIT 1;
            ''', {'word': word})

        if len(queryset) > 0:
            for item in queryset:
                return item.word
        return None

    @staticmethod
    def search(searchTerm: str):
        cleanSearchTerm = Search.__cleanSearchTerm(searchTerm)
        logger.info("searching for: " + cleanSearchTerm)

        queryset = Search.__runSearchQuery(cleanSearchTerm)
        resultsCount = len(queryset)

        if(resultsCount < 1):
            searchWords = searchTerm.split("|")
            for word in searchWords:
                similarWord = Search.__findSimilarWord(word)
                if similarWord is not None:
                    cleanSearchTerm += '|'
                    cleanSearchTerm += similarWord
            queryset = Search.__runSearchQuery(cleanSearchTerm)

        return queryset