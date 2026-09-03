import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import 'disease_result_screen.dart';

class CropScannerScreen extends StatefulWidget {
  const CropScannerScreen({super.key});

  @override
  State<CropScannerScreen> createState() => _CropScannerScreenState();
}

class _CropScannerScreenState extends State<CropScannerScreen> {
  String _selectedCrop = 'Tomato';
  bool _analyzing = false;

  final List<Map<String, String>> _cropOptions = [
    {'name': 'Tomato', 'icon': '🍅'},
    {'name': 'Cotton', 'icon': '🌱'},
    {'name': 'Paddy', 'icon': '🌾'},
    {'name': 'Wheat', 'icon': '🌾'},
    {'name': 'Sugarcane', 'icon': '🎋'},
    {'name': 'Not a Crop', 'icon': '🚫'},
  ];

  void _triggerScan() async {
    setState(() => _analyzing = true);

    final result = await ApiService.uploadAndScan(
      cropName: _selectedCrop,
      location: 'Nashik, Maharashtra',
    );

    if (mounted) {
      setState(() => _analyzing = false);
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => DiseaseResultScreen(result: result),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Crop Scanner'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Crop Grid Selector
            const Text(
              'Select Target Crop',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),

            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                childAspectRatio: 1.3,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
              ),
              itemCount: _cropOptions.length,
              itemBuilder: (context, idx) {
                final crop = _cropOptions[idx];
                final isSelected = _selectedCrop == crop['name'];
                return InkWell(
                  onTap: () => setState(() => _selectedCrop = crop['name']!),
                  child: Container(
                    decoration: BoxDecoration(
                      color: isSelected ? const Color(0xFF15803D).withOpacity(0.1) : Colors.white,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(
                        color: isSelected ? const Color(0xFF15803D) : Colors.grey.shade300,
                        width: isSelected ? 2 : 1,
                      ),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(crop['icon']!, style: const TextStyle(fontSize: 22)),
                        const SizedBox(height: 4),
                        Text(
                          crop['name']!,
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                            color: isSelected ? const Color(0xFF15803D) : Colors.black87,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),

            const SizedBox(height: 24),

            // Camera Box Card
            Container(
              height: 260,
              decoration: BoxDecoration(
                color: Colors.grey.shade900,
                borderRadius: BorderRadius.circular(24),
                image: const DecorationImage(
                  image: NetworkImage('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5'),
                  fit: BoxFit.cover,
                ),
              ),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(24),
                  color: Colors.black45,
                ),
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _analyzing
                          ? const Column(
                              children: [
                                CircularProgressIndicator(color: Colors.white),
                                SizedBox(height: 12),
                                Text(
                                  'AI Analyzing Crop Foliage...',
                                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                                ),
                              ],
                            )
                          : Column(
                              children: [
                                const Icon(Icons.center_focus_strong, size: 64, color: Colors.white70),
                                const SizedBox(height: 8),
                                Text(
                                  'Align $_selectedCrop Leaf in Frame',
                                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                                ),
                              ],
                            ),
                    ],
                  ),
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Shutter Button
            ElevatedButton.icon(
              onPressed: _analyzing ? null : _triggerScan,
              icon: const Icon(Icons.camera_alt, color: Colors.white),
              label: Text(
                _analyzing ? 'Analyzing...' : 'Take Photo & Analyze',
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF15803D),
                padding: const EdgeInsets.all(16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
