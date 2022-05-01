package domain.shared.notification

class NotificationErrorProps(val context: String, val message: String)

class Notification(private val errors: MutableList<NotificationErrorProps> = mutableListOf()) {
    fun addError(error: NotificationErrorProps) {
        this.errors.add(error)
    }

    fun hasErrors(): Boolean = this.errors.size > 0

    fun getErrors(): MutableList<NotificationErrorProps> = this.errors

    fun messages(context: String?): String {
        var message = ""
        errors.forEach {
            if (context != null && it.context == context) message += "${it.context}: ${it.message},"
        }
        return message
    }
}
