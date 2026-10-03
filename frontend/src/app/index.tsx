import React, { useState } from 'react';
import OnboardingScreen from './onboarding';
import AuthScreen from './auth';

export default function Index() {
  const [showAuth, setShowAuth] = useState(false);

  // showAuth true නම් Auth screen එක පෙන්වන්න, නැත්නම් Onboarding පෙන්වන්න
  if (showAuth) {
    return <AuthScreen />;
  }

  return <OnboardingScreen onGetStarted={() => setShowAuth(true)} />;
}