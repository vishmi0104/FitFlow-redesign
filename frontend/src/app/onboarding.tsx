import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
// Path එක කලින් හරි ගිය විදිහටම තියාගන්න (../constants/theme හෝ @/constants/theme)
import { Colors, Spacing } from '../constants/theme'; 

// Onboarding පිටු වල තොරතුරු ලිස්ට් එකක් විදිහට
const onboardingData = [
  {
    title: "Welcome to FitFlow",
    description: "Track your daily workouts, analyze your progress, and achieve your fitness goals effortlessly."
  },
  {
    title: "Stay Consistent",
    description: "Set daily goals and get reminders to keep you on track with your fitness journey."
  },
  {
    title: "Join the Community",
    description: "Share your achievements and get inspired by others in the FitFlow network."
  }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Next Button එක click කළාම වෙන දේ
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      // ඊළඟ පිටුවට යන්න
      setCurrentIndex(currentIndex + 1);
    } else {
      // අන්තිම පිටුවේ නම්, Auth (Login) එකට යන්න
      router.push('/auth');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>
        <Text style={styles.subtitle}>{onboardingData[currentIndex].description}</Text>
        
        {/* Pagination Dots (තිත් ටික) */}
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.dot, 
                currentIndex === index ? styles.activeDot : null
              ]} 
            />
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: 'space-between',
    padding: Spacing.four,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: Spacing.two,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.two,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.backgroundSelected,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#6366F1',
    width: 20, // Active එකේ දිග වැඩියි පෙනුම ලස්සන වෙන්න
  },
  button: {
    backgroundColor: '#6366F1',
    padding: Spacing.four,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});