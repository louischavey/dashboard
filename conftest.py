import sys
import os
import pytest
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))  # Add parent directory to Python path
from main import app#, create_app

# def app():
#     app = create_app()
#     app.config.update({"TESTING": True})
#     yield app

@pytest.fixture
def client():
    # app.config.update({"TESTING": True})

    with app.test_client() as client:
        yield client

@pytest.fixture()
def runner(app):
    return app.test_cli_runner()

# TEST FUNCTIONS
def test_homepage(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"<title>upload the file : GFG</title>" in response.data

def test_upload(client):
    response = client.get("/upload")
    

# test each route
# test each logic branch per route