from fastapi import FastAPI

app = FastAPI(title="FitFlow AI Service")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/")
def root():
    return {"service": "FitFlow AI Service", "purpose": "workout plan generation and explainability"}