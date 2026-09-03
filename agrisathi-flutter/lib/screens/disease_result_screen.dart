import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/voice_service.dart';

class DiseaseResultScreen extends StatefulWidget {
  final DiseaseScanResult result;

  const DiseaseResultScreen({super.key, required this.result});

  @override
  State<DiseaseResultScreen> createState() => _DiseaseResultScreenState();
}

class _DiseaseResultScreenState extends State<DiseaseResultScreen> {
  bool _speaking = false;

  @override
  void initState() {
    super.initState();
    VoiceService.init().then((_) {
      _playVoiceAdvisory();
    });
  }

  void _playVoiceAdvisory() {
    final text = '${widget.result.cropName} diagnosis: ${widget.result.diseaseName}. ${widget.result.explanation}';
    VoiceService.speakAdvisory(text);
    setState(() => _speaking = true);
  }

  void _toggleSpeech() {
    if (_speaking) {
      VoiceService.stop();
      setState(() => _speaking = false);
    } else {
      _playVoiceAdvisory();
    }
  }

  @override
  void dispose() {
    VoiceService.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isLowConfidence = widget.result.confidence < 60;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Crop Health Diagnosis'),
        actions: [
          IconButton(
            icon: Icon(_speaking ? Icons.volume_off : Icons.volume_up),
            onPressed: _toggleSpeech,
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Diagnosis Banner Card
            Card(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              elevation: 2,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(widget.result.cropName, style: const TextStyle(fontSize: 14, color: Colors.grey, fontWeight: FontWeight.bold)),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: isLowConfidence ? Colors.grey.shade200 : Colors.red.shade100,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            widget.result.severity,
                            style: TextStyle(
                              color: isLowConfidence ? Colors.grey.shade800 : Colors.red.shade800,
                              fontWeight: FontWeight.bold,
                              fontSize: 11,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      widget.result.diseaseName,
                      style: TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.extrabold,
                        color: isLowConfidence ? Colors.grey.shade900 : Colors.red.shade900,
                      ),
                    ),
                    const SizedBox(height: 14),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('AI Confidence Score', style: TextStyle(fontSize: 12, color: Colors.grey)),
                        Text('${widget.result.confidence}%', style: const TextStyle(fontWeight: FontWeight.extrabold, fontSize: 16)),
                      ],
                    ),
                    const SizedBox(height: 6),
                    LinearProgressIndicator(
                      value: widget.result.confidence / 100.0,
                      backgroundColor: Colors.grey.shade200,
                      color: isLowConfidence ? Colors.grey : const Color(0xFF15803D),
                      minHeight: 8,
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16),

            // Voice Advisory Button
            Card(
              color: Colors.green.shade50,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: ListTile(
                leading: Icon(_speaking ? Icons.volume_up : Icons.play_arrow, color: const Color(0xFF15803D), size: 32),
                title: const Text('Voice Advisory Assistant', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                subtitle: Text(_speaking ? '🔊 Speaking advisory aloud...' : 'Press to listen to voice readout'),
                trailing: ElevatedButton(
                  onPressed: _toggleSpeech,
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF15803D)),
                  child: Text(_speaking ? 'Stop' : 'Listen', style: const TextStyle(color: Colors.white)),
                ),
              ),
            ),

            const SizedBox(height: 16),

            // Symptoms Card
            Card(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('What We Detected', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 8),
                    Text(widget.result.explanation, style: const TextStyle(fontSize: 13, color: Colors.black87, height: 1.4)),
                    const SizedBox(height: 12),
                    const Text('Key Symptoms:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                    const SizedBox(height: 6),
                    ...widget.result.symptoms.map((s) => Padding(
                          padding: const EdgeInsets.only(bottom: 4),
                          child: Row(
                            children: [
                              const Icon(Icons.circle, size: 6, color: Color(0xFF15803D)),
                              const SizedBox(width: 8),
                              Expanded(child: Text(s, style: const TextStyle(fontSize: 12))),
                            ],
                          ),
                        )),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16),

            // Action Plan Card
            Card(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              color: const Color(0xFF14532D),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Action Plan & Treatment', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
                        Icon(Icons.assignment, color: Colors.white70),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ...widget.result.organicControl.map((c) => Padding(
                          padding: const EdgeInsets.only(bottom: 8),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Icon(Icons.check_circle, color: Colors.greenAccent, size: 18),
                              const SizedBox(width: 8),
                              Expanded(child: Text(c, style: const TextStyle(color: Colors.white, fontSize: 13))),
                            ],
                          ),
                        )),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
