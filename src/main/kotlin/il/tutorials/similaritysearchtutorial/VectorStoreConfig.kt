package il.tutorials.similaritysearchtutorial

import org.springframework.ai.embedding.EmbeddingModel
import org.springframework.ai.vectorstore.SimpleVectorStore
import org.springframework.ai.vectorstore.VectorStore
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
class VectorStoreConfig {

    @Bean
    fun vectorStore(model: EmbeddingModel): VectorStore =
        SimpleVectorStore.builder(model).build()

}