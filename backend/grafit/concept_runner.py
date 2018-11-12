from .concept_extractor.extractor import TextblobTfIdfExtractStrategy
from .models import Article, GraphArticle
import logging


logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


class ConceptRunner:
    def generate_graph(self):

        print("[ConceptRunner] generating graph")
        articles = Article.objects.all()

        for article in articles:
            article.related.clear()

        tfidf_extractor = TextblobTfIdfExtractStrategy()

        for article in articles:

            article_node = GraphArticle.nodes.get_or_none(uid=article.id)
            if not article_node:
                article_node = GraphArticle(
                    uid=article.id, name=article.title).save()

            keywords = tfidf_extractor.extract_keyphrases(article.text)
            logger.info(f"Extracted keywords {keywords}")

            for keyword in keywords:

                related_title = keyword['word']
                related_article = Article.objects.filter(
                    title__iexact=related_title).first()

                if related_article:
                    article.related.add(related_article)
                else:
                    related_article = Article(title=related_title)
                    related_article.save()
                    article.related.add(related_article)
                article.save()

                related_article_node = GraphArticle.nodes.get_or_none(
                    uid=related_article.id)

                if not related_article_node:
                    related_article_node = GraphArticle(
                        uid=related_article.id, name=related_article.title)

                article_node.save()
                related_article_node.save()
                logger.info(
                    f"Set {article_node.name} as related to {related_article_node.name}")

                article_node.related.connect(
                    related_article_node, {'tf_idf': keyword['tf-idf']})

        return "success"
