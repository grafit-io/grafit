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
            SELECT grafit_search_index.id, ts_headline(grafit_search_index.title, to_tsquery('english', %(query)s)) as title, ts_headline(grafit_article.text, to_tsquery('english', %(query)s)) as headline, ts_rank(document, to_tsquery('english', %(query)s)) as rank
            FROM grafit_search_index
            INNER  JOIN grafit_article  ON grafit_article.id = grafit_search_index.id
            WHERE grafit_search_index.document @@ to_tsquery('english', %(query)s)
            ORDER BY rank DESC 
            LIMIT 25''', {'query': cleanSearchTerm})

        return queryset
