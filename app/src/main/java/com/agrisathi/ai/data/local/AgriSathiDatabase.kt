package com.agrisathi.ai.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [ScanHistoryEntity::class], version = 1, exportSchema = false)
abstract class AgriSathiDatabase : RoomDatabase() {

    abstract fun scanHistoryDao(): ScanHistoryDao

    companion object {
        @Volatile
        private var INSTANCE: AgriSathiDatabase? = null

        fun getDatabase(context: Context): AgriSathiDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AgriSathiDatabase::class.java,
                    "agrisathi_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
