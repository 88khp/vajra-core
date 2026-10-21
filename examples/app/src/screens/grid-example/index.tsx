import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Box, Col, Row, CoreText, CorePressable, Grid, Separator,
} from '@88khp/vajra-ui-core';
import { colors } from '../../colors';
import { SCREEN_PADDING, GAP, CATEGORIES, FEATURED_APPS, APP_GRID } from './data';

export function GridExample() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Productivity', 'Design', 'Developer'];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box bg={colors.background} pb={40}>

        {/* Header */}
        <Box bg={colors.surface} px={SCREEN_PADDING} pt={20} pb={16} borderBottomWidth={1} borderColor={colors.border}>
          <CoreText fontSize={26} fontWeight="800" color={colors.textPrimary} letterSpacing={-0.3}>
            Discover
          </CoreText>
          <CoreText fontSize={14} color={colors.textSecondary} style={{ marginTop: 2 }}>
            Tools your team will love
          </CoreText>
        </Box>

        {/* Editor's picks — mixed span */}
        <Box px={SCREEN_PADDING} mt={20}>
          <CoreText fontSize={14} fontWeight="700" color={colors.textPrimary} style={{ marginBottom: 10 }}>
            Editor's picks
          </CoreText>
          <Grid.Root columns={3} gap={GAP}>
            <Grid.Item span={2} columns={3} colGap={GAP} screenPadding={SCREEN_PADDING}>
              <Box bg={colors.primary} rounded={16} h={160} p={16} justify="space-between" overflow="hidden">
                <Box position="absolute" top={-10} right={-10}>
                  <CoreText fontSize={100} style={{ opacity: 0.15 }}>⚡</CoreText>
                </Box>
                <Box>
                  <Box bg={colors.overlayWhiteLight} px={8} py={3} rounded={20} style={{ alignSelf: 'flex-start' }}>
                    <CoreText fontSize={10} fontWeight="700" color={colors.textInverse} transform="uppercase" letterSpacing={0.8}>
                      Featured
                    </CoreText>
                  </Box>
                </Box>
                <Col gap={3}>
                  <CoreText fontSize={18} fontWeight="800" color={colors.textInverse}>Vajra UI Core</CoreText>
                  <CoreText fontSize={12} color={colors.overlayWhiteStrong}>Headless RN layout primitives</CoreText>
                  <CoreText fontSize={11} fontWeight="700" color={colors.overlayWhiteMid}>FREE · Developer</CoreText>
                </Col>
              </Box>
            </Grid.Item>

            <Grid.Item span={1} columns={3} colGap={GAP} screenPadding={SCREEN_PADDING}>
              <Col gap={GAP} flex={1}>
                {FEATURED_APPS.slice(0, 2).map((app) => (
                  <Box
                    key={app.id}
                    flex={1}
                    bg={app.bg}
                    rounded={14}
                    p={10}
                    justify="space-between"
                    borderWidth={1}
                    borderColor={colors.border}
                    style={{ minHeight: 70 }}
                  >
                    <CoreText fontSize={22}>{app.emoji}</CoreText>
                    <Col gap={1}>
                      <CoreText fontSize={11} fontWeight="700" color={app.color} lineHeight={14}>{app.name}</CoreText>
                      <CoreText fontSize={9} color={colors.textSecondary}>{app.price}</CoreText>
                    </Col>
                  </Box>
                ))}
              </Col>
            </Grid.Item>
          </Grid.Root>
        </Box>

        {/* Category tiles — 3-column */}
        <Box px={SCREEN_PADDING} mt={24}>
          <CoreText fontSize={14} fontWeight="700" color={colors.textPrimary} style={{ marginBottom: 10 }}>
            Browse categories
          </CoreText>
          <Grid.Root columns={3} gap={GAP}>
            {CATEGORIES.map((cat) => (
              <Grid.Item key={cat.label} span={1} columns={3} colGap={GAP} screenPadding={SCREEN_PADDING}>
                <CorePressable bg={cat.bg} rounded={14} py={16} align="center" gap={6} borderWidth={1} borderColor={colors.border}>
                  <CoreText fontSize={26}>{cat.emoji}</CoreText>
                  <CoreText fontSize={11} fontWeight="600" color={cat.color} align="center">{cat.label}</CoreText>
                </CorePressable>
              </Grid.Item>
            ))}
          </Grid.Root>
        </Box>

        {/* Filter + 2-column app grid */}
        <Box px={SCREEN_PADDING} mt={24}>
          <Row gap={8} style={{ marginBottom: 12 }}>
            {filters.map((f) => (
              <CorePressable
                key={f}
                onPress={() => setActiveFilter(f)}
                bg={activeFilter === f ? colors.primary : colors.surface}
                px={14} py={7} rounded={20}
                borderWidth={1}
                borderColor={activeFilter === f ? colors.primary : colors.border}
              >
                <CoreText
                  fontSize={12}
                  fontWeight={activeFilter === f ? '700' : '400'}
                  color={activeFilter === f ? colors.textInverse : colors.textSecondary}
                >
                  {f}
                </CoreText>
              </CorePressable>
            ))}
          </Row>

          <Grid.Root columns={2} gap={GAP}>
            {APP_GRID
              .filter((a) => activeFilter === 'All' || a.category === activeFilter)
              .map((app) => (
                <Grid.Item key={app.id} span={1} columns={2} colGap={GAP} screenPadding={SCREEN_PADDING}>
                  <Box bg={colors.surface} rounded={14} p={14} borderWidth={1} borderColor={colors.border} gap={10}>
                    <Box w={52} h={52} rounded={14} bg={colors.surfaceAlt} align="center" justify="center">
                      <CoreText fontSize={28}>{app.emoji}</CoreText>
                    </Box>
                    <Col gap={2}>
                      <CoreText fontSize={14} fontWeight="700" color={colors.textPrimary}>{app.name}</CoreText>
                      <CoreText fontSize={11} color={colors.textSecondary}>{app.category}</CoreText>
                    </Col>
                    <Row align="center" justify="space-between">
                      <Row align="center" gap={3}>
                        <CoreText fontSize={11} color={colors.warning}>★</CoreText>
                        <CoreText fontSize={11} fontWeight="600" color={colors.textSecondary}>{app.rating}</CoreText>
                      </Row>
                      <Box bg={app.price === 'Free' ? colors.successLight : colors.primaryLight} px={8} py={3} rounded={20}>
                        <CoreText fontSize={10} fontWeight="700" color={app.price === 'Free' ? colors.success : colors.primary}>
                          {app.price}
                        </CoreText>
                      </Box>
                    </Row>
                  </Box>
                </Grid.Item>
              ))}
          </Grid.Root>
        </Box>

        {/* Full-width promo card */}
        <Box px={SCREEN_PADDING} mt={24}>
          <Grid.Root columns={1} gap={GAP}>
            <Grid.Item span={1} columns={1} colGap={GAP} screenPadding={SCREEN_PADDING}>
              <Box bg={colors.success} rounded={16} p={20} direction="row" align="center" gap={16} overflow="hidden">
                <Box flex={1} gap={6}>
                  <CoreText fontSize={18} fontWeight="800" color={colors.textInverse}>Go Pro — Free for 30 days</CoreText>
                  <CoreText fontSize={13} color={colors.overlayWhiteBold} lineHeight={18}>
                    Unlock unlimited apps, priority support, and team collaboration.
                  </CoreText>
                  <CorePressable bg={colors.textInverse} px={16} py={8} rounded={10} style={{ alignSelf: 'flex-start', marginTop: 6 }}>
                    <CoreText fontSize={13} fontWeight="700" color={colors.success}>Start free trial</CoreText>
                  </CorePressable>
                </Box>
                <CoreText fontSize={56}>🎁</CoreText>
              </Box>
            </Grid.Item>
          </Grid.Root>
        </Box>

      </Box>
    </ScrollView>
  );
}
