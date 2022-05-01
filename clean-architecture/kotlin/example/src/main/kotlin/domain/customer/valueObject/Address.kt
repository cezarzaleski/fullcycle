package domain.customer.valueObject

class Address private constructor(
    private var _street: String = "",
    private var _number: Int = 0,
    private var _zip: String = "",
    private var _city: String = ""
) {
    init {
        validate()
    }

    val street get() = _street
    val number get() = _number
    val zip get() = _zip
    val city get() = _city

    private fun validate() {
        if (this._street.isEmpty()) throw Error("Street is required")
        if (this._number == 0) throw Error("Number is required")
        if (this._zip.isEmpty()) throw Error("Zip is required")
        if (this._city.isEmpty()) throw Error("City is required")
    }

    override fun toString() = "$street, $number, $zip $city"

    companion object {
        fun from(street: String, number: Int, zip: String, city: String): Address {
            return Address(street, number, zip, city)
        }
    }
}
