package il.tutorials.similaritysearch.java;

import jakarta.annotation.PostConstruct;
import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmbeddingsService {

    private final EmbeddingModel model;
    private final VectorStore store;

    @Value("classpath:data/songs.raw.en.txt")
    private Resource songsRes;

    @Value("classpath:data/songs.embeddings.json")
    private Resource songsEmbeddingsRes;

    public EmbeddingsService(EmbeddingModel model, VectorStore store) {
        this.model = model;
        this.store = store;
    }

    @PostConstruct
    public void init() {
        loadVectorData();
        // createVectorData();
    }

    public Object embed(String text) {
        return model.embed(text);
    }

    public Object similar(String text) {
        return store.similaritySearch(text);
    }

    public void createVectorData() {
        try {
            String raw = songsRes.getContentAsString(StandardCharsets.UTF_8);
            List<Document> docs = List.of(raw.split("\n"))
                .stream()
                .filter(line -> !line.isBlank())
                .map(Document::new)
                .collect(Collectors.toList());

            store.add(docs);

            File dbDataFile = Paths.get(System.getProperty("user.dir"), "/src/main/resources/data/songs.embeddings.json").toFile();
            ((SimpleVectorStore) store).save(dbDataFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void loadVectorData() {
        try {
            ((SimpleVectorStore) store).load(songsEmbeddingsRes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
