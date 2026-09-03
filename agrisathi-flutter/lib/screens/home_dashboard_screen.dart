import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import 'disease_result_screen.dart';

class HomeDashboardScreen extends StatefulWidget {
  const HomeDashboardScreen({super.key});

  @override
  State<HomeDashboardScreen> createState() => _HomeDashboardScreenState();
}

class _HomeDashboardScreenState extends State<HomeDashboardScreen> {
  int _currentIndex = 0;
  List<CropItem> _crops = [];
  List<RiskAlertItem> _alerts = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadDashboardData();
  }

  void _loadDashboardData() async {
    final crops = await ApiService.getCrops();
    final alerts = await ApiService.getAlerts();
    if (mounted) {
      setState(() {
        _crops = crops;
        _alerts = alerts;
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('AgriSathi AI', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
            Text('Nashik, Maharashtra • 28°C', style: TextStyle(fontSize: 11, color: Colors.white81)),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.person_outline),
            onPressed: () => Navigator.pushNamed(context, '/profile'),
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Scan Crop Banner
                  Card(
                    elevation: 3,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    color: const Color(0xFF15803D),
                    child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: Colors.white24,
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: const Text(
                                    'AI Crop Scanner',
                                    style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                                  ),
                                ),
                                const SizedBox(height: 10),
                                const Text(
                                  'Detect Crop Diseases Instantly',
                                  style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 14),
                                ElevatedButton.icon(
                                  onPressed: () => Navigator.pushNamed(context, '/scanner'),
                                  icon: const Icon(Icons.camera_alt, color: Color(0xFF15803D)),
                                  label: const Text('Scan Crop Now', style: TextStyle(color: Color(0xFF15803D), fontWeight: FontWeight.bold)),
                                  style: ElevatedButton.styleFrom(backgroundColor: Colors.white),
                                ),
                              ],
                            ),
                          ),
                          const Icon(Icons.qr_code_scanner, size: 72, color: Colors.white30),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Weather Card
                  Card(
                    elevation: 1,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Row(
                            children: [
                              Icon(Icons.wb_sunny, size: 40, color: Colors.orange),
                              SizedBox(width: 12),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('Mostly Sunny', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                                  Text('Humidity: 82% • Rain Prob: 20%', style: TextStyle(fontSize: 12, color: Colors.grey)),
                                ],
                              ),
                            ],
                          ),
                          Text('28°C', style: TextStyle(fontSize: 28, fontWeight: FontWeight.extrabold, color: Colors.grey.shade900)),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Active Crops
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('My Active Crops', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                      TextButton(onPressed: () {}, child: const Text('View All')),
                    ],
                  ),
                  const SizedBox(height: 8),

                  SizedBox(
                    height: 130,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: _crops.length,
                      itemBuilder: (context, idx) {
                        final crop = _crops[idx];
                        return Container(
                          width: 180,
                          margin: const EdgeInsets.only(right: 12),
                          child: Card(
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                            child: Padding(
                              padding: const EdgeInsets.all(12),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Row(
                                    children: [
                                      const Icon(Icons.eco, color: Color(0xFF15803D)),
                                      const SizedBox(width: 6),
                                      Text(crop.cropName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                                    ],
                                  ),
                                  Text('${crop.farmSize} Acres • ${crop.variety}', style: const TextStyle(fontSize: 11, color: Colors.grey)),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: Colors.green.shade100,
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Text(crop.healthStatus, style: const TextStyle(color: Color(0xFF15803D), fontSize: 10, fontWeight: FontWeight.bold)),
                                  )
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Alerts Center
                  const Text('Alerts Center', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),

                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: _alerts.length,
                    itemBuilder: (context, idx) {
                      final alert = _alerts[idx];
                      return Card(
                        margin: const EdgeInsets.only(bottom: 8),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        child: ListTile(
                          leading: const Icon(Icons.warning_amber_rounded, color: Colors.amber, size: 32),
                          title: Text(alert.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                          subtitle: Text(alert.description, maxLines: 2, style: const TextStyle(fontSize: 11)),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        selectedItemColor: const Color(0xFF15803D),
        unselectedItemColor: Colors.grey,
        onTap: (idx) {
          setState(() => _currentIndex = idx);
          if (idx == 1) Navigator.pushNamed(context, '/scanner');
          if (idx == 2) Navigator.pushNamed(context, '/market');
          if (idx == 3) Navigator.pushNamed(context, '/assistant');
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.camera_alt), label: 'Scanner'),
          BottomNavigationBarItem(icon: Icon(Icons.trending_up), label: 'Mandi'),
          BottomNavigationBarItem(icon: Icon(Icons.chat_bubble), label: 'AI Assistant'),
        ],
      ),
    );
  }
}
