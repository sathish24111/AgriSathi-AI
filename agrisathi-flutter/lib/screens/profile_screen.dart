import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Farmer Profile'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const CircleAvatar(
              radius: 48,
              backgroundColor: Color(0xFF15803D),
              child: Icon(Icons.person, size: 64, color: Colors.white),
            ),
            const SizedBox(height: 12),
            const Text('Sambhaji Patil', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
            const Text('+91 98765 43210 • Nashik, Maharashtra', style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 24),

            Card(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Column(
                children: [
                  ListTile(
                    leading: const Icon(Icons.eco, color: Color(0xFF15803D)),
                    title: const Text('Primary Crop'),
                    trailing: const Text('Tomato (Roma Hybrid)', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                  const Divider(height: 1),
                  ListTile(
                    leading: const Icon(Icons.square_foot, color: Color(0xFF15803D)),
                    title: const Text('Total Land Size'),
                    trailing: const Text('3.5 Acres', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                  const Divider(height: 1),
                  ListTile(
                    leading: const Icon(Icons.language, color: Color(0xFF15803D)),
                    title: const Text('App Language'),
                    trailing: const Text('English (EN)', style: TextStyle(fontWeight: FontWeight.bold)),
                    onTap: () => Navigator.pushNamed(context, '/language'),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            ElevatedButton.icon(
              onPressed: () => Navigator.pushReplacementNamed(context, '/login'),
              icon: const Icon(Icons.logout, color: Colors.white),
              label: const Text('Logout / लॉगआउट', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red.shade700,
                minimumSize: const Size.fromHeight(50),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
