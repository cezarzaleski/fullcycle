package domain.shared.repository

interface IRepository<T> {
    fun create(entity: T)
    fun update(entity: T)
    fun find(id: String): T
    fun findAll(): List<T>
}