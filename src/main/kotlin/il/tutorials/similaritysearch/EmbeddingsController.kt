package il.tutorials.similaritysearch

import org.springframework.web.bind.annotation.*

@RestController
class EmbeddingsController(val embeddings: EmbeddingsService) {

    @GetMapping("/embeddings")
    fun embed(@RequestParam text: String) = embeddings.embed(text)

    @GetMapping("/similarity")
    fun similar(@RequestParam text: String) = embeddings.similar(text)
}