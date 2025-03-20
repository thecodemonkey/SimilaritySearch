package il.tutorials.similaritysearch

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.*

@SpringBootApplication
@ComponentScan(
	excludeFilters = [
		ComponentScan.Filter(
			type = FilterType.REGEX,
			pattern = ["il.tutorials.similaritysearch.java.*"]
		)
	]
)
class SimilaritySearchKotlinApplication

fun main(args: Array<String>) {
	runApplication<SimilaritySearchKotlinApplication>(*args)
}
