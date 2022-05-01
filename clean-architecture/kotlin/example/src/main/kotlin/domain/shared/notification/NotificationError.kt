package domain.shared.notification

open class NotificationError(errors: List<NotificationErrorProps>) : Error(
    errors.joinToString(",") { error -> "${error.context}: ${error.message}" }
)
