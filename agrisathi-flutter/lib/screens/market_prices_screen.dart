import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/api_service.dart';

class MarketPricesScreen extends StatefulWidget {
  const MarketPricesScreen({super.key});

  @override
  State<MarketPricesScreen> createState() => _MarketPricesScreenState();
}

class _MarketPricesScreenState extends State<MarketPricesScreen> {
  List<MarketPriceItem> _prices = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadPrices();
  }

  void _loadPrices() async {
    final list = await ApiService.getMarketPrices();
    if (mounted) {
      setState(() {
        _prices = list;
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('APMC Mandi Rates'),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  // Notice Banner
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.amber.shade50,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.amber.shade300),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.info_outline, color: Colors.amber),
                        SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            'SIMULATED DEMO MARKET DATA',
                            style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.amber),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  Expanded(
                    child: ListView.builder(
                      itemCount: _prices.length,
                      itemBuilder: (context, idx) {
                        final item = _prices[idx];
                        return Card(
                          margin: const EdgeInsets.only(bottom: 10),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                          child: ListTile(
                            leading: CircleAvatar(
                              backgroundColor: const Color(0xFF15803D).withOpacity(0.1),
                              child: const Icon(Icons.shopping_bag, color: Color(0xFF15803D)),
                            ),
                            title: Text(item.cropName, style: const TextStyle(fontWeight: FontWeight.bold)),
                            subtitle: Text('${item.marketName} • ${item.district}'),
                            trailing: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text('₹${item.price.toInt()}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Color(0xFF15803D))),
                                Text('Range: ₹${item.minPrice.toInt()} - ₹${item.maxPrice.toInt()}', style: const TextStyle(fontSize: 10, color: Colors.grey)),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
