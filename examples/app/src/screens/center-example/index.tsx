import React, { useState } from 'react';
import { ScrollView, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Box, Center, Col, Row, CoreText, CorePressable } from '@88khp/vajra-ui-core';
import { colors } from '../../colors';
import { ONBOARDING_STEPS } from './data';

type Scene = 'gallery' | 'loading' | 'empty' | 'success' | 'error';

export function CenterExample() {
  const { height } = useWindowDimensions();
  const [scene, setScene] = useState<Scene>('gallery');
  const [step, setStep] = useState(0);

  if (scene === 'loading') {
    return (
      <Box flex={1} bg={colors.background}>
        <Box p={24} gap={12} style={{ opacity: 0.25 }}>
          {[1, 2, 3].map((n) => (
            <Box key={n} h={48} bg={colors.surface} rounded={10} borderWidth={1} borderColor={colors.border} />
          ))}
        </Box>
        <Box position="absolute" top={0} bottom={0} left={0} right={0} bg={colors.overlay}>
          <Center flex={1} gap={12}>
            <ActivityIndicator color={colors.textInverse} size="large" />
            <CoreText fontSize={15} fontWeight="600" color={colors.textInverse}>Syncing data…</CoreText>
            <CoreText fontSize={13} color={colors.overlayWhiteMid}>Please wait a moment</CoreText>
          </Center>
        </Box>
        <Box position="absolute" bottom={40} left={0} right={0}>
          <Center>
            <CorePressable onPress={() => setScene('gallery')} bg={colors.overlayWhiteSubtle} px={20} py={10} rounded={20}>
              <CoreText fontSize={13} fontWeight="600" color={colors.textInverse}>Cancel</CoreText>
            </CorePressable>
          </Center>
        </Box>
      </Box>
    );
  }

  if (scene === 'empty') {
    return (
      <Box flex={1} bg={colors.background}>
        <Center flex={1} gap={16}>
          <Box w={96} h={96} rounded={48} bg={colors.surfaceAlt} align="center" justify="center">
            <CoreText fontSize={44}>📭</CoreText>
          </Box>
          <Col align="center" gap={6}>
            <CoreText fontSize={20} fontWeight="700" color={colors.textPrimary}>Nothing here yet</CoreText>
            <CoreText fontSize={14} color={colors.textSecondary} align="center" style={{ maxWidth: 240, lineHeight: 20 }}>
              Your inbox is empty. Messages from your team will appear here.
            </CoreText>
          </Col>
          <CorePressable onPress={() => setScene('gallery')} bg={colors.primary} px={24} py={12} rounded={10}>
            <CoreText fontSize={14} fontWeight="600" color={colors.textInverse}>Go back</CoreText>
          </CorePressable>
        </Center>
      </Box>
    );
  }

  if (scene === 'success') {
    return (
      <Box flex={1} bg={colors.background}>
        <Center flex={1} gap={16}>
          <Box w={100} h={100} rounded={50} bg={colors.successLight} align="center" justify="center">
            <CoreText fontSize={48}>✅</CoreText>
          </Box>
          <Col align="center" gap={6}>
            <CoreText fontSize={22} fontWeight="700" color={colors.textPrimary}>Payment sent!</CoreText>
            <CoreText fontSize={14} color={colors.textSecondary} align="center" style={{ lineHeight: 20 }}>
              $128.00 was sent to{'\n'}alex@example.com
            </CoreText>
          </Col>
          <Box bg={colors.successLight} rounded={12} px={20} py={12} borderWidth={1} borderColor={colors.success}>
            <CoreText fontSize={13} color={colors.success} fontWeight="500">Transaction ID: #TXN-20260406</CoreText>
          </Box>
          <CorePressable onPress={() => setScene('gallery')} bg={colors.success} px={32} py={13} rounded={10}>
            <CoreText fontSize={14} fontWeight="600" color={colors.textInverse}>Done</CoreText>
          </CorePressable>
        </Center>
      </Box>
    );
  }

  if (scene === 'error') {
    return (
      <Box flex={1} bg={colors.background}>
        <Center flex={1} gap={16}>
          <Box w={100} h={100} rounded={50} bg={colors.errorLight} align="center" justify="center">
            <CoreText fontSize={48}>❌</CoreText>
          </Box>
          <Col align="center" gap={6}>
            <CoreText fontSize={22} fontWeight="700" color={colors.textPrimary}>Something went wrong</CoreText>
            <CoreText fontSize={14} color={colors.textSecondary} align="center" style={{ lineHeight: 20 }}>
              We couldn't connect to the server.{'\n'}Check your internet and try again.
            </CoreText>
          </Col>
          <Row gap={10}>
            <CorePressable onPress={() => setScene('gallery')} bg={colors.surface} borderWidth={1} borderColor={colors.border} px={20} py={12} rounded={10}>
              <CoreText fontSize={14} fontWeight="600" color={colors.textPrimary}>Cancel</CoreText>
            </CorePressable>
            <CorePressable onPress={() => setScene('gallery')} bg={colors.error} px={20} py={12} rounded={10}>
              <CoreText fontSize={14} fontWeight="600" color={colors.textInverse}>Retry</CoreText>
            </CorePressable>
          </Row>
        </Center>
      </Box>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box bg={colors.background} pb={40}>

        {/* Onboarding carousel */}
        <Box bg={colors.primary} px={24} pt={32} pb={36}>
          <Box bg={colors.overlayWhiteXFaint} rounded={20} p={24} h={220}>
            <Center flex={1} gap={12}>
              <Box w={72} h={72} rounded={36} bg={colors.overlayWhiteLight} align="center" justify="center">
                <CoreText fontSize={32}>{ONBOARDING_STEPS[step].emoji}</CoreText>
              </Box>
              <Col align="center" gap={6}>
                <CoreText fontSize={20} fontWeight="700" color={colors.textInverse}>
                  {ONBOARDING_STEPS[step].title}
                </CoreText>
                <CoreText fontSize={13} color={colors.overlayWhiteStrong} align="center" lineHeight={19}>
                  {ONBOARDING_STEPS[step].body}
                </CoreText>
              </Col>
            </Center>
          </Box>

          {/* Dot indicators */}
          <Center mt={16} gap={0}>
            <Row gap={6}>
              {ONBOARDING_STEPS.map((_, i) => (
                <Box
                  key={i}
                  w={i === step ? 20 : 6}
                  h={6}
                  rounded={3}
                  bg={i === step ? colors.textInverse : colors.overlayWhiteDim}
                />
              ))}
            </Row>
          </Center>

          {/* Navigation */}
          <Row mt={16} justify="space-between" align="center">
            <CorePressable
              onPress={() => setStep((s) => Math.max(0, s - 1))}
              bg={colors.overlayWhiteSubtle}
              px={16} py={8} rounded={20}
            >
              <CoreText fontSize={13} fontWeight="600" color={step === 0 ? colors.overlayWhiteSoft : colors.textInverse}>
                Back
              </CoreText>
            </CorePressable>
            <CorePressable
              onPress={() => setStep((s) => Math.min(ONBOARDING_STEPS.length - 1, s + 1))}
              bg={colors.textInverse} px={20} py={8} rounded={20}
            >
              <CoreText fontSize={13} fontWeight="600" color={colors.primary}>
                {step === ONBOARDING_STEPS.length - 1 ? 'Get started' : 'Next'}
              </CoreText>
            </CorePressable>
          </Row>
        </Box>

        {/* Scene buttons */}
        <Box px={16} mt={24} gap={10}>
          <CoreText fontSize={14} fontWeight="600" color={colors.textPrimary}>Full-screen Center scenes</CoreText>
          <CoreText fontSize={13} color={colors.textSecondary} lineHeight={18}>
            Tap below to see Center used for loading overlays, empty states, and feedback screens.
          </CoreText>

          {[
            { label: 'Loading overlay', emoji: '⏳', scene: 'loading' as Scene, bg: colors.primaryLight, fg: colors.primary },
            { label: 'Empty state', emoji: '📭', scene: 'empty' as Scene, bg: colors.surfaceAlt, fg: colors.textSecondary },
            { label: 'Success screen', emoji: '✅', scene: 'success' as Scene, bg: colors.successLight, fg: colors.success },
            { label: 'Error screen', emoji: '❌', scene: 'error' as Scene, bg: colors.errorLight, fg: colors.error },
          ].map((btn) => (
            <CorePressable
              key={btn.scene}
              onPress={() => setScene(btn.scene)}
              bg={btn.bg}
              rounded={12}
              px={16} py={14}
              borderWidth={1}
              borderColor={colors.border}
            >
              <Row align="center" gap={12}>
                <Box w={40} h={40} rounded={10} bg={colors.surface} align="center" justify="center">
                  <CoreText fontSize={20}>{btn.emoji}</CoreText>
                </Box>
                <CoreText fontSize={14} fontWeight="600" color={btn.fg}>{btn.label}</CoreText>
                <Box flex={1} />
                <CoreText fontSize={16} color={btn.fg}>›</CoreText>
              </Row>
            </CorePressable>
          ))}
        </Box>

        {/* Icon centering demos */}
        <Box px={16} mt={28} gap={12}>
          <CoreText fontSize={14} fontWeight="600" color={colors.textPrimary}>Icon centering</CoreText>
          <Row gap={16} wrap="wrap">
            {[
              { emoji: '⚡', bg: colors.warningLight, size: 64 },
              { emoji: '🔒', bg: colors.primaryLight, size: 56 },
              { emoji: '🎯', bg: colors.errorLight, size: 72 },
              { emoji: '🌟', bg: colors.successLight, size: 60 },
            ].map((icon, i) => (
              <Box key={i} w={icon.size} h={icon.size} rounded={icon.size / 2} bg={icon.bg}>
                <Center flex={1}>
                  <CoreText fontSize={icon.size * 0.4}>{icon.emoji}</CoreText>
                </Center>
              </Box>
            ))}
          </Row>
        </Box>

      </Box>
    </ScrollView>
  );
}
