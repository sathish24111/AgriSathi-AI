package com.agrisathi.ai.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.QrCodeScanner
import androidx.compose.material.icons.filled.Storefront
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import com.agrisathi.ai.ui.theme.AppStrings
import com.agrisathi.ai.ui.theme.PrimaryGreen
import com.agrisathi.ai.ui.theme.TextSecondary

sealed class BottomNavItem(val route: String, val icon: ImageVector) {
    object Home : BottomNavItem("home", Icons.Default.Home)
    object Scan : BottomNavItem("scanner", Icons.Default.QrCodeScanner)
    object Planner : BottomNavItem("planner", Icons.Default.DateRange)
    object Market : BottomNavItem("market", Icons.Default.Storefront)
    object Profile : BottomNavItem("profile", Icons.Default.Person)
}

@Composable
fun BottomNavBar(
    selectedLanguage: String,
    currentRoute: String,
    onNavigate: (String) -> Unit
) {
    val strings = AppStrings.get(selectedLanguage)

    val items = listOf(
        Pair(BottomNavItem.Home, strings.navHome),
        Pair(BottomNavItem.Scan, strings.navScan),
        Pair(BottomNavItem.Planner, strings.navPlanner),
        Pair(BottomNavItem.Market, strings.navMarket),
        Pair(BottomNavItem.Profile, strings.navProfile)
    )

    NavigationBar(
        containerColor = Color.White,
        contentColor = PrimaryGreen
    ) {
        items.forEach { (item, title) ->
            val isSelected = currentRoute == item.route
            NavigationBarItem(
                selected = isSelected,
                onClick = { onNavigate(item.route) },
                icon = {
                    Icon(
                        imageVector = item.icon,
                        contentDescription = title
                    )
                },
                label = {
                    Text(
                        text = title,
                        color = if (isSelected) PrimaryGreen else TextSecondary
                    )
                },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = PrimaryGreen,
                    selectedTextColor = PrimaryGreen,
                    unselectedIconColor = TextSecondary,
                    unselectedTextColor = TextSecondary,
                    indicatorColor = PrimaryGreen.copy(alpha = 0.15f)
                )
            )
        }
    }
}
