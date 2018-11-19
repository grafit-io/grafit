from .concept_extractor.extractor import TextblobTfIdfExtractStrategy
from .models import Article, GraphArticle
import logging


logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


class ConceptRunner:

    _tfidf_extractor = None

    @classmethod
    def _get_tfidf_extractor(cls):
        if not cls._tfidf_extractor:
            cls._tfidf_extractor = TextblobTfIdfExtractStrategy()
        return cls._tfidf_extractor

    @classmethod
    def _extract_and_save(cls, article, disconnectAll=False):
        article_node = GraphArticle.nodes.get_or_none(uid=article.id)
        if disconnectAll:
            article_node.related.disconnect_all()

        if not article_node:
            article_node = GraphArticle(
                uid=article.id, name=article.title).save()

        keywords = cls._get_tfidf_extractor().extract_keyphrases(article.text)
        logger.info(f"Extracted keywords {keywords}")

        for keyword in keywords:

            related_title = keyword['word']
            related_article = Article.objects.filter(
                title__iexact=related_title).first()

            if not related_article:
                related_article = Article(title=related_title, workspace=article.workspace)
                related_article.save()

            related_article_node = GraphArticle.nodes.get_or_none(
                uid=related_article.id)

            if not related_article_node:
                related_article_node = GraphArticle(
                    uid=related_article.id, name=related_article.title)

            article_node.save()
            related_article_node.save()
            logger.info(
                f"Set {article_node.name} as related to {related_article_node.name}")

            if article_node.related.is_connected(related_article_node):
                article_node.related.disconnect(related_article_node)

            article_node.related.connect(
                related_article_node, {'tf_idf': keyword['tf-idf']})

    @classmethod
    def generate_graph(cls):
        print("[ConceptRunner] generating graph for all articles")
        articles = Article.objects.all()

        for article in articles:
            cls._extract_and_save(article)

    @classmethod
    def generate_concepts_for_article(cls, articleId):
        article = Article.objects.get(pk=articleId)

        if article:
            cls._extract_and_save(article, disconnectAll=True)
