import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Alert,
  Platform
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { useStripe } from '@stripe/stripe-react-native';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

const subscriptionPlans = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: '$9.99',
    priceAmount: 9.99,
    interval: 'month',
    color: '#4F46E5',
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: '$19.99',
    priceAmount: 19.99,
    interval: 'month',
    color: '#14B8A6',
  },
  ultimate: {
    id: 'ultimate',
    name: 'Ultimate',
    price: '$29.99',
    priceAmount: 29.99,
    interval: 'month',
    color: '#F59E0B',
  },
};

export default function CheckoutScreen() {
  const router = useRouter();
  const { plan } = useLocalSearchParams();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const selectedPlan = subscriptionPlans[plan as keyof typeof subscriptionPlans];

  const initializePayment = async () => {
    setLoading(true);

    try {
      // In a real implementation, this would be a call to your backend
      // which would create a payment intent with Stripe
      // Here we're simulating a successful payment after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Initialize payment sheet
      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Premium App',
        paymentIntentClientSecret: 'mock_client_secret', // This should come from your backend
        customerId: 'mock_customer_id', // This should come from your backend
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
      });

      if (error) {
        console.error('Error initializing payment sheet', error);
        Alert.alert('Error', 'Unable to initialize payment. Please try again.');
        setLoading(false);
        return;
      }

      // Payment sheet is initialized, now open it
      await openPaymentSheet();
    } catch (e) {
      console.error('Error in checkout process', e);
      Alert.alert('Error', 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    try {
      // In a real implementation, this would open the Stripe payment sheet
      // Here we're simulating a successful payment after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll simulate a successful payment
      setLoading(false);
      setPaymentSuccessful(true);
      
      // In a real app, you would call presentPaymentSheet and check its result
      /*
      const { error } = await presentPaymentSheet();
      
      if (error) {
        console.error('Error presenting payment sheet', error);
        Alert.alert('Error', error.message);
      } else {
        setPaymentSuccessful(true);
      }
      */
    } catch (e) {
      console.error('Error opening payment sheet', e);
      Alert.alert('Error', 'Unable to process payment. Please try again.');
      setLoading(false);
    }
  };

  const goToHome = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {!paymentSuccessful ? (
          <>
            <Animated.View entering={FadeIn} style={styles.planSummary}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              
              <View style={styles.planDetails}>
                <View>
                  <Text style={styles.planName}>{selectedPlan.name} Plan</Text>
                  <Text style={styles.planInterval}>Monthly subscription</Text>
                </View>
                <Text style={styles.planPrice}>{selectedPlan.price}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>{selectedPlan.price}</Text>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(100)} style={styles.securityMessage}>
              <Lock size={16} color="#64748B" />
              <Text style={styles.securityText}>
                Your payment information is secure and encrypted
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(200)}>
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={initializePayment}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <CreditCard size={20} color="#FFFFFF" />
                    <Text style={styles.paymentButtonText}>Pay with Card</Text>
                  </>
                )}
              </TouchableOpacity>
            </Animated.View>
          </>
        ) : (
          <Animated.View entering={FadeIn} style={styles.successContainer}>
            <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text style={styles.successMessage}>
              Thank you for subscribing to our {selectedPlan.name} plan. Your subscription is now active.
            </Text>
            
            <View style={styles.subscriptionDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Plan</Text>
                <Text style={styles.detailValue}>{selectedPlan.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount</Text>
                <Text style={styles.detailValue}>{selectedPlan.price}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Billing Cycle</Text>
                <Text style={styles.detailValue}>Monthly</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Next Billing Date</Text>
                <Text style={styles.detailValue}>
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.homeButton} onPress={goToHome}>
              <Text style={styles.homeButtonText}>Return to Home</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  planSummary: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  planInterval: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  planPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  totalAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1E293B',
  },
  securityMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  securityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  paymentButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successIcon: {
    fontFamily: 'Inter-Bold',
    fontSize: 40,
    color: '#FFFFFF',
  },
  successTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 16,
  },
  successMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  subscriptionDetails: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#64748B',
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#1E293B',
  },
  homeButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  homeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});