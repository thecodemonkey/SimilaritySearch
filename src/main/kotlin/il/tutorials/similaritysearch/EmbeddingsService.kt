package il.tutorials.similaritysearch

import jakarta.annotation.PostConstruct
import org.springframework.ai.document.Document
import org.springframework.ai.embedding.EmbeddingModel
import org.springframework.ai.vectorstore.SimpleVectorStore
import org.springframework.ai.vectorstore.VectorStore
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.stereotype.Service
import java.io.File
import java.nio.charset.StandardCharsets
import java.nio.file.Paths
import kotlin.io.path.pathString


@Service
class EmbeddingsService(
    val model: EmbeddingModel,
    val store: VectorStore
) {

    @Value("classpath:data/songs.raw.en.txt")
    private val songsRes: Resource? = null

    @Value("classpath:data/songs.embeddings.json")
    private val songsEmbeddingsRes: Resource? = null

    @PostConstruct
    fun init() {
        loadVectorData();
        //createVectorData()
    }

    fun embed(text: String) = model.embed(text)

    fun similar(text: String) = store.similaritySearch(text)

    fun createVectorData() {
        val docs = songsRes!!.getContentAsString(StandardCharsets.UTF_8)
                             .split("\n")
                             .filter { it.isNotBlank() }
                             .map { Document(it) }

        store.add(docs)

        val dbDataFile = Paths.get(System.getProperty("user.dir"), "/src/main/resources/data/songs.embeddings.json");
        (store as SimpleVectorStore).save(File(dbDataFile.pathString))
    }

    fun loadVectorData() {
        (store as SimpleVectorStore).load(songsEmbeddingsRes!!);
    }

}