package com.agrisathi.ai.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.agrisathi.ai.data.model.RiskLevel
import com.agrisathi.ai.ui.theme.AppStrings
import com.agrisathi.ai.ui.theme.DangerRed
import com.agrisathi.ai.ui.theme.PrimaryGreen
import com.agrisathi.ai.ui.theme.SuccessGreen
import com.agrisathi.ai.ui.theme.WarningOrange

@Composable
fun RiskBadge(
    riskLevel: RiskLevel,
    selectedLanguage: String = "en",
    modifier: Modifier = Modifier
) {
    val strings = AppStrings.get(selectedLanguage)

    val (backgroundColor, textColor, label) = when (riskLevel) {
        RiskLevel.LOW -> Triple(SuccessGreen.copy(alpha = 0.15f), SuccessGreen, strings.riskLow)
        RiskLevel.MODERATE -> Triple(WarningOrange.copy(alpha = 0.15f), WarningOrange, strings.riskModerate)
        RiskLevel.HIGH -> Triple(DangerRed.copy(alpha = 0.15f), DangerRed, strings.riskHigh)
        RiskLevel.SEVERE -> Triple(DangerRed.copy(alpha = 0.25f), DangerRed, strings.riskSevere)
    }

    Box(
        modifier = modifier
            .clip(RoundedCornerShape(8.dp))
            .background(backgroundColor)
            .border(1.dp, textColor.copy(alpha = 0.4f), RoundedCornerShape(8.dp))
            .padding(horizontal = 10.dp, vertical = 4.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = label,
            color = textColor,
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun SectionHeader(title: String, subtitle: String? = null, modifier: Modifier = Modifier) {
    Row(
        modifier = modifier.padding(vertical = 6.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .padding(end = 8.dp)
                .clip(RoundedCornerShape(4.dp))
                .background(PrimaryGreen)
                .padding(horizontal = 4.dp, vertical = 12.dp)
        )
        Text(
            text = title,
            style = MaterialTheme.typography.titleLarge,
            color = MaterialTheme.colorScheme.onBackground,
            fontWeight = FontWeight.Bold
        )
    }
}
