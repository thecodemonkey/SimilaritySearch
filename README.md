# Similarity Search with Spring AI

<a href="https://simsearch.thecodemonkey.de" target="_blank">Demo</a>


## Table of Contents
<!-- TOC -->
* [Similarity Search with Spring AI](#similarity-search-with-spring-ai)
  * [Table of Contents](#table-of-contents)
  * [Introduction](#introduction)
  * [Project structure](#project-structure)
  * [Requirements](#requirements)
  * [Quick Start](#quick-start)
    * [Clone Project](#clone-project)
    * [Build & Run](#build--run)
    * [run applicaiton](#run-applicaiton)
    * [run in docker](#run-in-docker)
    * [use the UI](#use-the-ui)
  * [Troubleshooting](#troubleshooting)
    * [Memory Usage](#memory-usage)
    * [Windows WSL2](#windows-wsl2)
<!-- TOC -->


## Introduction
This project is part of a tutorial demonstrating how to use Kotlin or Java with Spring-AI to generate embeddings and perform simple similarity searches.
It provides a minimal implementation approach. This sample project contains both a Kotlin and a Java implementation. I like to use Kotlin because the syntax is much leaner and more precise than the classic Java. But it's up to you which one you prefer.

## Project structure

    root
     |
     |-- src
           |-- java                         # java source code
           |-- kotlin                       # kotlin source code                   
           |-- resources           
                      |-- data              # raw and vecorized data
                      |-- model             # optional local model
                      |-- static            # frontend implementation of PoC
                      |-- application.yml   



## Requirements

- jdk 21
- gradle (current version)
- min 2GB free ram


## Quick Start

### Clone Project
```sh
git clone https://github.com/thecodemonkey/SimilaritySearch.git
cd SimilaritySearch
```

### Build & Run
Using Gradle:
```sh
./gradlew build
```

### run applicaiton
Once the application is running, the API is available at `http://localhost:7070`. I have explicitly used a different port to avoid collisions with applications that are already running. The configuration can be found in **application.yml/server.port**

Example request:
```sh
./gradlew bootRun
curl http://localhost:7070/embeddings?text=give%20me%20love%20songs
```

### run in docker
The application can also be started in Docker. The already generated image from the GitLab Container Registry can be used, or the local project can be rebuilt as a Docker image and run locally.

run from ghcr.io:

    docker run -p 7070:7070 ghcr.io/thecodemonkey/similaritysearch:main
    
    # arm

    docker run --platform linux/amd64 -p 80:7070 ghcr.io/thecodemonkey/similaritysearch:main


### use the UI

open the URL http://localhost:7070/ in your browser to see and use the ui.
use the input field for the search. You can use the microphone icon for the voice function. 
Note which language is selected. You can currently select German or English.



## Troubleshooting

### Memory Usage
The application requires slightly more memory than usual. If you get an error message with “out of memory” or something with “java heap size” then you should increase the JAVA memory.

    java JAVA_OPTS="-Xmx1024m" -jar similarity-search.jar

### Windows WSL2

If you are working with WSL under windows, note that wsl has its own IP, which changes with every restart. This is how you can determine the IP from the WSL console

inside wsl terminal: 
    
    ip addr show eth0

grab the specific ip and open in browser on your host machine:
    
    curl http://172.20.45.2:7070
