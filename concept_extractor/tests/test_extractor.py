from concept_extractor.extractor import FakeExtractStrategy

def test_function():
    assert FakeExtractStrategy().extract_keyphrases("testtestest") == ["test"]
