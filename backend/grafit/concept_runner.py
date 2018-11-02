from .models import Article
from .concept_extractor.extractor import TextblobTfIdfExtractStrategy

class ConceptRunner:
    def generate_graph(self):

        print("[ConceptRunner] generating graph")
        articles = Article.objects.all()

        for article in articles:
            article.related.clear()

        tfidf_extractor = TextblobTfIdfExtractStrategy()

        for article in articles:
            
            keywords = tfidf_extractor.extract_keyphrases(article.text)

            for keyword in keywords:

                node = Article.objects.filter(title__iexact=keyword['word'])

                if node:
                    article.related.add(node[0])
                else:
                    concept = Article(title=keyword['word'])
                    concept.save()
                    article.related.add(concept)
                article.save()

        return "success"
