# Similarity Search with Spring AI

## Table of Contents
- [Introduction](#introduction)
- [Quick Start](#quick-start)
    - [Clone Project](#clone-project)
    - [Build & Run](#build--run)
    - [Test API](#test-api)

## Introduction
This project is part of a tutorial demonstrating how to use Kotlin with Spring-AI to generate embeddings and perform simple similarity searches.
It provides a minimal implementation approach.

## Quick Start

### Clone Project
```sh
git clone https://github.com/your-repo/similarity-search-spring-ai.git
cd similarity-search-spring-ai
```

### Build & Run
Using Gradle:
```sh
gradle build
java -jar build/libs/similarity-search.jar
```

### Test API
Once the application is running, the API is available at `http://localhost:8080`. Example request:
```sh
curl http://localhost:8080/embeddings?text=Hello
```


## Windows WSL2 

wsl has its own IP, which changes with every start

inside wsl terminal: 
    
    ip addr show eth0

grab the specific ip and open in browser on your host machine:
    
    curl http://172.20.45.2:7070
