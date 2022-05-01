package domain.shared.entity

import domain.shared.notification.Notification

abstract class Entity(protected open val _id: String, open val notification: Notification = Notification()) {
    val id get() = _id
}
