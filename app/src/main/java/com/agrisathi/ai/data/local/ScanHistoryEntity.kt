package com.agrisathi.ai.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "scan_history")
data class ScanHistoryEntity(
    @PrimaryKey val scanId: String,
    val imageUri: String?,
    val cropName: String,
    val diseaseName: String,
    val confidence: Int,
    val riskLevel: String,
    val severity: String,
    val explanation: String,
    val summaryAdvisory: String,
    val timestamp: Long
)
