import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, ArrowRight } from 'lucide-react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$9.99',
    interval: 'month',
    color: '#4F46E5',
    features: [
      'Basic content access',
      'Ad-free experience',
      'Standard quality',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$19.99',
    interval: 'month',
    color: '#14B8A6',
    popular: true,
    features: [
      'All basic features',
      'Premium content access',
      'HD quality',
      'Download for offline',
    ],
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: '$29.99',
    interval: 'month',
    color: '#F59E0B',
    features: [
      'All premium features',
      'Ultra HD quality',
      'Multiple devices',
      'Priority support',
      'Early access to new content',
    ],
  },
];

export default function SubscriptionsScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleProceedToPayment = () => {
    if (selectedPlan) {
      router.push({
        pathname: '/checkout',
        params: { plan: selectedPlan }
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Animated.View entering={FadeIn} style={styles.header}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>Select a subscription plan that works best for you</Text>
        </Animated.View>

        <View style={styles.planContainer}>
          {subscriptionPlans.map((plan, index) => (
            <Animated.View 
              key={plan.id}
              entering={FadeInDown.delay(index * 100).springify()} 
              style={styles.planWrapper}
            >
              <TouchableOpacity
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && { borderColor: plan.color, borderWidth: 2 },
                  plan.popular && styles.popularPlan,
                ]}
                onPress={() => handleSelectPlan(plan.id)}
                activeOpacity={0.7}
              >
                {plan.popular && (
                  <View style={[styles.popularTag, { backgroundColor: plan.color }]}>
                    <Text style={styles.popularTagText}>Popular</Text>
                  </View>
                )}

                <View style={styles.planHeader}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    <Text style={styles.planInterval}>/{plan.interval}</Text>
                  </View>
                </View>

                <View style={styles.planFeatures}>
                  {plan.features.map((feature, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <View style={[styles.checkIconContainer, { backgroundColor: `${plan.color}20` }]}>
                        <Check size={16} color={plan.color} />
                      </View>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <View style={[
                  styles.radioCircle,
                  selectedPlan === plan.id && { borderColor: plan.color },
                ]}>
                  {selectedPlan === plan.id && (
                    <View style={[styles.selectedRadioCircle, { backgroundColor: plan.color }]} />
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      <Animated.View entering={FadeInDown.delay(300)} style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.proceedButton,
            !selectedPlan && styles.proceedButtonDisabled,
          ]}
          onPress={handleProceedToPayment}
          disabled={!selectedPlan}
        >
          <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
          <ArrowRight size={18} color="#ffffff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  planContainer: {
    marginBottom: 20,
  },
  planWrapper: {
    marginBottom: 16,
  },
  planCard: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  popularPlan: {
    shadowOpacity: 0.1,
    elevation: 4,
  },
  popularTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  popularTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#ffffff',
  },
  planHeader: {
    marginBottom: 16,
  },
  planName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E293B',
  },
  planInterval: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    marginLeft: 2,
  },
  planFeatures: {
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#475569',
    flex: 1,
  },
  radioCircle: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  proceedButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  proceedButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
});