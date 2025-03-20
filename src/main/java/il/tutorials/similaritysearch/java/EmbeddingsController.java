package il.tutorials.similaritysearch.java;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmbeddingsController {


    private final EmbeddingsService embeddings;

    public EmbeddingsController(EmbeddingsService embeddings) {
        this.embeddings = embeddings;
    }

    @GetMapping("/embeddings")
    public Object embed(@RequestParam String text) {
        return embeddings.embed(text);
    }

    @GetMapping("/similarity")
    public Object similar(@RequestParam String text) {
        return embeddings.similar(text);
    }
}
