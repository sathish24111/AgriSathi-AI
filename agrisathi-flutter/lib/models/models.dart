class FarmerProfile {
  final String id;
  final String name;
  final String mobile;
  final String email;
  final String state;
  final String district;
  final String language;
  final String primaryCrop;
  final String role;

  FarmerProfile({
    required this.id,
    required this.name,
    required this.mobile,
    required this.email,
    required this.state,
    required this.district,
    required this.language,
    required this.primaryCrop,
    required this.role,
  });

  factory FarmerProfile.fromJson(Map<String, dynamic> json) {
    return FarmerProfile(
      id: json['id'] ?? json['_id'] ?? 'user_1',
      name: json['name'] ?? 'Sambhaji Patil',
      mobile: json['mobile'] ?? json['phone'] ?? '9876543210',
      email: json['email'] ?? 'sambhaji@agrisathi.ai',
      state: json['state'] ?? 'Maharashtra',
      district: json['district'] ?? 'Nashik',
      language: json['language'] ?? json['preferredLanguage'] ?? 'en',
      primaryCrop: json['primary_crop'] ?? json['primaryCrop'] ?? 'Tomato',
      role: json['role'] ?? 'FARMER',
    );
  }
}

class CropItem {
  final String id;
  final String cropName;
  final String variety;
  final String plantingDate;
  final String growthStage;
  final double farmSize;
  final String soilType;
  final String irrigation;
  final String healthStatus;

  CropItem({
    required this.id,
    required this.cropName,
    required this.variety,
    required this.plantingDate,
    required this.growthStage,
    required this.farmSize,
    required this.soilType,
    required this.irrigation,
    required this.healthStatus,
  });

  factory CropItem.fromJson(Map<String, dynamic> json) {
    return CropItem(
      id: json['id'] ?? json['_id'] ?? 'crop_1',
      cropName: json['crop_name'] ?? json['name'] ?? 'Tomato',
      variety: json['variety'] ?? 'Roma Hybrid',
      plantingDate: json['planting_date'] ?? json['plantingDate'] ?? '2026-06-15',
      growthStage: json['growth_stage'] ?? json['growthStage'] ?? 'Vegetative',
      farmSize: (json['farm_size'] ?? json['farmSizeAcres'] ?? 2.5).toDouble(),
      soilType: json['soil_type'] ?? json['soilType'] ?? 'Sandy Loam',
      irrigation: json['irrigation'] ?? json['irrigationType'] ?? 'Drip Irrigation',
      healthStatus: json['health_status'] ?? json['healthStatus'] ?? 'HEALTHY',
    );
  }
}

class DiseaseScanResult {
  final String scanId;
  final String cropName;
  final String diseaseName;
  final int confidence;
  final String riskLevel;
  final String severity;
  final String explanation;
  final List<String> symptoms;
  final List<String> organicControl;
  final List<String> recommendedPractice;
  final String imageUrl;
  final String location;
  final int timestamp;

  DiseaseScanResult({
    required this.scanId,
    required this.cropName,
    required this.diseaseName,
    required this.confidence,
    required this.riskLevel,
    required this.severity,
    required this.explanation,
    required this.symptoms,
    required this.organicControl,
    required this.recommendedPractice,
    required this.imageUrl,
    required this.location,
    required this.timestamp,
  });

  factory DiseaseScanResult.fromJson(Map<String, dynamic> json) {
    List<String> parseList(dynamic input) {
      if (input == null) return [];
      if (input is List) return input.map((e) => e.toString()).toList();
      return [input.toString()];
    }

    return DiseaseScanResult(
      scanId: json['id'] ?? json['scanId'] ?? 'scan_1',
      cropName: json['crop_name'] ?? json['cropName'] ?? 'Tomato',
      diseaseName: json['prediction'] ?? json['diseaseName'] ?? 'Early Blight',
      confidence: (json['confidence'] ?? 94).toInt(),
      riskLevel: json['risk_level'] ?? json['riskLevel'] ?? 'HIGH',
      severity: json['severity'] ?? 'Moderate to Severe',
      explanation: json['explanation'] ?? json['probable_cause'] ?? 'Early Blight fungal infection identified on lower foliage.',
      symptoms: parseList(json['symptoms']),
      organicControl: parseList(json['organicControl'] ?? json['recommendations']),
      recommendedPractice: parseList(json['recommendedPractice']),
      imageUrl: json['image_url'] ?? json['imageUrl'] ?? 'https://images.unsplash.com/photo-1592417817098-8f3d6eb1b7a5',
      location: json['location'] ?? 'Nashik, Maharashtra',
      timestamp: json['timestamp'] ?? DateTime.now().millisecondsSinceEpoch,
    );
  }
}

class RiskAlertItem {
  final String id;
  final String title;
  final String category;
  final String description;
  final String date;
  final String severity;
  final String region;

  RiskAlertItem({
    required this.id,
    required this.title,
    required this.category,
    required this.description,
    required this.date,
    required this.severity,
    required this.region,
  });

  factory RiskAlertItem.fromJson(Map<String, dynamic> json) {
    return RiskAlertItem(
      id: json['id'] ?? 'alert_1',
      title: json['title'] ?? 'High Humidity Alert',
      category: json['category'] ?? json['alert_type'] ?? 'DISEASE',
      description: json['description'] ?? json['message'] ?? 'Atmospheric humidity above 82% over Nashik region.',
      date: json['date'] ?? 'Today',
      severity: json['severity'] ?? json['risk_level'] ?? 'HIGH',
      region: json['region'] ?? 'Western Maharashtra',
    );
  }
}

class MarketPriceItem {
  final String cropName;
  final String marketName;
  final String district;
  final double price;
  final double minPrice;
  final double maxPrice;
  final String unit;
  final String priceTrend;
  final bool isMock;

  MarketPriceItem({
    required this.cropName,
    required this.marketName,
    required this.district,
    required this.price,
    required this.minPrice,
    required this.maxPrice,
    required this.unit,
    required this.priceTrend,
    required this.isMock,
  });

  factory MarketPriceItem.fromJson(Map<String, dynamic> json) {
    return MarketPriceItem(
      cropName: json['crop_name'] ?? json['cropName'] ?? 'Tomato',
      marketName: json['market_name'] ?? json['mandiName'] ?? 'Nashik APMC Mandi',
      district: json['district'] ?? 'Nashik',
      price: (json['price'] ?? json['modalPrice'] ?? 2800).toDouble(),
      minPrice: (json['min_price'] ?? json['minPrice'] ?? 2400).toDouble(),
      maxPrice: (json['max_price'] ?? json['maxPrice'] ?? 3200).toDouble(),
      unit: json['unit'] ?? 'Quintal',
      priceTrend: json['price_trend'] ?? json['priceTrend'] ?? 'UP',
      isMock: json['is_mock'] ?? true,
    );
  }
}
