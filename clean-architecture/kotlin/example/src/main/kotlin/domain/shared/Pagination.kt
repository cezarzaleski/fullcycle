package domain.shared

class Pagination<T> private constructor(
    val currentPage: Int,
    val perPage: Int,
    val total: Long,
    val items: List<T>
) {

    data class Builder<T>(
        var currentPage: Int = 0,
        var perPage: Int = 0,
        var total: Long = 0,
        var items: MutableList<T> = mutableListOf()
    ) {

        fun currentPage(currentPage: Int) = apply { this.currentPage = currentPage }
        fun perPage(perPage: Int) = apply { this.perPage = perPage }
        fun total(total: Long) = apply { this.total = total }
        fun items(items: MutableList<T>) = apply { this.items = items }
        fun build() = Pagination(currentPage, perPage, total, items)

    }


//    fun <R> map(mapper: Function<T, R>?): Pagination<R?> {
//        return Builder<R ?>()
//            .currentPage(currentPage)
//            .perPage(perPage)
//            .total(total)
//            .items(
//                items.map {  }(mapper)
//                    .collect(Collectors.toList())
//            )
//            .build()
//    }
}