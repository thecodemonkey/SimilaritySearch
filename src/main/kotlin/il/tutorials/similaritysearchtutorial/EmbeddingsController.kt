package il.tutorials.similaritysearchtutorial

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class EmbeddingsController(val embeddings: EmbeddingsService) {

    @GetMapping("/embeddings")
    fun embed(@RequestParam text: String) = embeddings.embed(text)

    @GetMapping("/similarity")
    fun similar(@RequestParam text: String) = embeddings.similar(text)
}