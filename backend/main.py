from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()
PORT=5000
GITHUB_API = "https://api.github.com/users"

@app.get("/")
def home():
    return {"message": "FastAPI Backend Running"}

@app.get("/repos/{username}")
def get_repositories(username: str):
    try:
        response = requests.get(f"{GITHUB_API}/{username}/repos")

        if response.status_code != 200:
            raise HTTPException(
                status_code=404,
                detail="GitHub user not found"
            )

        data = response.json()

        repos = []

        for repo in data:
            repos.append({
                "id": repo["id"],
                "name": repo["name"],
                "description": repo["description"],
                "url": repo["html_url"]
            })

        return repos

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch repositories"
        )