package com.agrisathi.ai.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.agrisathi.ai.data.model.CropPlanInput
import com.agrisathi.ai.data.model.CropPlanResult
import com.agrisathi.ai.ui.components.RiskBadge
import com.agrisathi.ai.ui.theme.AccentAmber
import com.agrisathi.ai.ui.theme.AppStrings
import com.agrisathi.ai.ui.theme.PrimaryGreen
import com.agrisathi.ai.ui.theme.SecondaryGreen
import com.agrisathi.ai.ui.theme.SurfaceLight

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CropPlannerScreen(
    selectedLanguage: String,
    currentInput: CropPlanInput,
    planResult: CropPlanResult?,
    onUpdatePlanInput: (cropName: String, acres: Double, sowingDate: String, district: String) -> Unit,
    onNavigateBack: () -> Unit
) {
    val strings = AppStrings.get(selectedLanguage)

    val cropList = when (selectedLanguage) {
        "mr" -> listOf("टोमॅटो", "कापूस", "ऊस", "सोयाबीन", "कांदा", "गहू", "हरभरा")
        "hi" -> listOf("टमाटर", "कपास", "गन्ना", "सोयाबीन", "प्याज", "गेहूं", "चना")
        "ta" -> listOf("தக்காளி", "பருத்தி", "கரும்பு", "சோயாபீன்", "வெங்காயம்", "கோதுமை", "கடலை")
        else -> listOf("Tomato", "Cotton", "Sugarcane", "Soybean", "Onion", "Wheat", "Gram")
    }

    var selectedCrop by remember { mutableStateOf(cropList.first()) }
    var landAcresStr by remember { mutableStateOf(currentInput.acres.toString()) }
    var sowingDate by remember { mutableStateOf(currentInput.sowingDate) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(strings.plannerHeaderTitle, color = Color.White, fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = PrimaryGreen)
            )
        }
    ) { paddingValues ->
        val scrollState = rememberScrollState()

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .background(SurfaceLight)
                .verticalScroll(scrollState)
                .padding(16.dp)
        ) {
            // Form Card
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Text(
                        text = strings.selectCropFormTitle,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = PrimaryGreen
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    LazyRow(
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(cropList) { crop ->
                            val isSelected = crop == selectedCrop
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(20.dp))
                                    .background(if (isSelected) PrimaryGreen else Color.LightGray.copy(alpha = 0.3f))
                                    .clickable { selectedCrop = crop }
                                    .padding(horizontal = 14.dp, vertical = 8.dp)
                            ) {
                                Text(
                                    text = crop,
                                    color = if (isSelected) Color.White else Color.DarkGray,
                                    fontSize = 13.sp,
                                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        OutlinedTextField(
                            value = landAcresStr,
                            onValueChange = { landAcresStr = it },
                            label = { Text(strings.farmLandLabel) },
                            singleLine = true,
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                            modifier = Modifier.weight(1f),
                            colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = PrimaryGreen)
                        )

                        OutlinedTextField(
                            value = sowingDate,
                            onValueChange = { sowingDate = it },
                            label = { Text(strings.sowingDateLabel) },
                            singleLine = true,
                            modifier = Modifier.weight(1f),
                            colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = PrimaryGreen)
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Button(
                        onClick = {
                            val acres = landAcresStr.toDoubleOrNull() ?: 1.0
                            onUpdatePlanInput(selectedCrop, acres, sowingDate, currentInput.district)
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(48.dp),
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen)
                    ) {
                        Icon(imageVector = Icons.Default.DateRange, contentDescription = null, tint = Color.White)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(strings.calculatePlanBtn, fontWeight = FontWeight.Bold)
                    }
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            if (planResult != null) {
                // Financial Estimates Summary Card
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = PrimaryGreen.copy(alpha = 0.08f)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Text(
                            text = strings.financialEstimatesTitle,
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = PrimaryGreen
                        )

                        Spacer(modifier = Modifier.height(12.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Column {
                                Text(strings.estimatedCostLabel, fontSize = 12.sp, color = Color.Gray)
                                Text("₹${String.format("%,.0f", planResult.financial.estimatedCost)}", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = Color.DarkGray)
                            }
                            Column {
                                Text(strings.expectedYieldLabel, fontSize = 12.sp, color = Color.Gray)
                                Text("${planResult.financial.expectedYieldMin.toInt()} - ${planResult.financial.expectedYieldMax.toInt()} Quintals", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = PrimaryGreen)
                            }
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Column {
                                Text(strings.expectedRevenueLabel, fontSize = 12.sp, color = Color.Gray)
                                Text("₹${String.format("%,.0f", planResult.financial.expectedRevenue)}", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = SecondaryGreen)
                            }
                            Column {
                                Text(strings.netProfitLabel, fontSize = 12.sp, color = Color.Gray)
                                Text("₹${String.format("%,.0f", planResult.financial.estimatedProfitMin)} - ₹${String.format("%,.0f", planResult.financial.estimatedProfitMax)}", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = AccentAmber)
                            }
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        // Disclaimer Box
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(8.dp))
                                .background(Color.White)
                                .border(1.dp, Color.LightGray, RoundedCornerShape(8.dp))
                                .padding(10.dp)
                        ) {
                            Text(
                                text = strings.financialDisclaimer,
                                fontSize = 11.sp,
                                color = Color.DarkGray,
                                fontWeight = FontWeight.Medium
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // Disease Risk Periods Warning Box
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.Red.copy(alpha = 0.08f)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(imageVector = Icons.Default.Warning, contentDescription = null, tint = Color.Red)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(strings.riskWindowsTitle, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = Color.Red)
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        planResult.riskPeriods.forEach { risk ->
                            Text(text = "• $risk", fontSize = 13.sp, color = Color.DarkGray, modifier = Modifier.padding(vertical = 2.dp))
                        }
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // Crop Stages Timeline
                Text(
                    text = strings.cultivationStagesTitle,
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = PrimaryGreen
                )

                Spacer(modifier = Modifier.height(12.dp))

                planResult.stages.forEach { stage ->
                    Card(
                        shape = RoundedCornerShape(14.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 6.dp)
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(text = stage.stageName, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = PrimaryGreen)
                                    Text(text = stage.durationDays, fontSize = 12.sp, color = Color.Gray)
                                }
                                RiskBadge(riskLevel = stage.riskLevel)
                            }
                            Spacer(modifier = Modifier.height(8.dp))
                            stage.keyActions.forEach { action ->
                                Row(
                                    verticalAlignment = Alignment.Top,
                                    modifier = Modifier.padding(vertical = 2.dp)
                                ) {
                                    Icon(imageVector = Icons.Default.Check, contentDescription = null, tint = SecondaryGreen, modifier = Modifier.size(16.dp))
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Text(text = action, fontSize = 13.sp, color = Color.DarkGray)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
