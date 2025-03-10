package il.tutorials.similaritysearchtutorial

import org.springframework.ai.document.MetadataMode
import org.springframework.ai.embedding.EmbeddingModel
import org.springframework.ai.transformers.TransformersEmbeddingModel
import org.springframework.ai.vectorstore.SimpleVectorStore
import org.springframework.ai.vectorstore.VectorStore
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
class VectorStoreConfig {

    @Bean
    fun vectorStore(embeddingModel: EmbeddingModel): VectorStore =
        SimpleVectorStore.builder(embeddingModel).build()


//    @Bean(name = ["miniLM"])
//    fun miniLmEmbeddingModel() = TransformersEmbeddingModel(MetadataMode.ALL)
//        .apply {
//            setModelResource("https://huggingface.co/jinaai/jina-clip-v2/resolve/main/onnx/model.onnx_data")
//            setTokenizerResource("https://huggingface.co/jinaai/jina-clip-v2/resolve/main/tokenizer.json")
//        }
}