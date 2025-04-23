import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appName}>Premium</Text>
        </View>

        <View style={styles.heroContainer}>
          <LinearGradient
            colors={['rgba(79, 70, 229, 0.1)', 'rgba(79, 70, 229, 0)']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </LinearGradient>
          <Text style={styles.heroTitle}>Unlock Premium Features</Text>
          <Text style={styles.heroDescription}>
            Subscribe today to access exclusive content and premium features. Choose from our range of plans to find what works for you.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What You'll Get</Text>
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: 'rgba(79, 70, 229, 0.1)' }]}>
              <Text style={styles.featureIconText}>🔥</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Premium Content</Text>
              <Text style={styles.featureDescription}>Access all premium content and features</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: 'rgba(20, 184, 166, 0.1)' }]}>
              <Text style={styles.featureIconText}>⚡</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>No Ads</Text>
              <Text style={styles.featureDescription}>Enjoy an ad-free experience</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
              <Text style={styles.featureIconText}>🎁</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Early Access</Text>
              <Text style={styles.featureDescription}>Get early access to new features</Text>
            </View>
          </View>
        </View>

        <Link href="/subscriptions" asChild>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>View Plans</Text>
            <ArrowRight size={18} color="#ffffff" />
          </TouchableOpacity>
        </Link>
      </ScrollView>
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
  },
  header: {
    marginBottom: 40,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#64748B',
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1E293B',
    marginTop: 4,
  },
  heroContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  gradient: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featuresTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  subscribeButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  }
});