package com.agrisathi.ai.util

import java.text.NumberFormat
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * Format timestamp to user readable date string.
 */
fun Long.toDateString(pattern: String = "dd MMM yyyy, hh:mm a"): String {
    val formatter = SimpleDateFormat(pattern, Locale.getDefault())
    return formatter.format(Date(this))
}

/**
 * Format currency amount to Indian Rupee (INR) representation.
 */
fun Double.toCurrencyFormat(): String {
    val formatter = NumberFormat.getCurrencyInstance(Locale("en", "IN"))
    return formatter.format(this)
}

fun Int.toCurrencyFormat(): String {
    val formatter = NumberFormat.getCurrencyInstance(Locale("en", "IN"))
    return formatter.format(this)
}

