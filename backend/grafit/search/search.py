from ..models import SearchResult
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class Search:

    @staticmethod
    def cleanSearchTerm(searchTerm: str) -> str:

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
    def search(searchTerm: str):
        cleanSearchTerm = Search.cleanSearchTerm(searchTerm)
        logger.info("searching for: " + cleanSearchTerm)

        queryset = SearchResult.objects.raw('''
            SELECT id, title, ts_rank(document, to_tsquery('english', %s)) as rank
            FROM grafit_search_index
            WHERE document @@ to_tsquery('english', %s)
            ORDER BY rank DESC ''', [cleanSearchTerm, cleanSearchTerm])

        return queryset
