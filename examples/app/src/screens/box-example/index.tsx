import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Box,
  Row,
  Col,
  CoreText,
  CorePressable,
  Separator,
} from '@88khp/vajra-ui-core';
import { colors } from '../../colors';
import { STATS, ACTIVITY, QUICK_ACTIONS, SALES_BY_CATEGORY } from './data';

export function BoxExample() {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity'>('overview');

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box bg={colors.background} pb={32}>
        {/* Hero banner */}
        <Box bg={colors.primary} px={20} pt={24} pb={50}>
          <Row align="center" justify="space-between">
            <Col gap={2}>
              <CoreText fontSize={13} color={colors.primaryLight}>Good morning</CoreText>
              <CoreText fontSize={22} fontWeight="700" color={colors.textInverse}>Dashboard</CoreText>
            </Col>
            <Box w={44} h={44} rounded={22} bg={colors.overlayWhiteSubtle} align="center" justify="center">
              <CoreText fontSize={20}>👤</CoreText>
            </Box>
          </Row>

          {/* Accent summary row */}
          <Box mt={20} bg={colors.overlayWhiteFaint} rounded={14} p={16}>
            <Row justify="space-between">
              <Col gap={2}>
                <CoreText fontSize={12} color={colors.primaryLight}>Total revenue</CoreText>
                <CoreText fontSize={28} fontWeight="700" color={colors.textInverse}>$84,290</CoreText>
              </Col>
              <Col align="flex-end" gap={2}>
                <Box bg={colors.overlayWhiteLight} px={10} py={4} rounded={20}>
                  <CoreText fontSize={12} fontWeight="600" color={colors.textInverse}>+18% vs last mo</CoreText>
                </Box>
              </Col>
            </Row>
          </Box>
        </Box>

        {/* Stat cards row — negative margin to overlap hero */}
        <Box px={16} mt={-32}>
          <Row gap={10}>
            {STATS.map(s => (
              <Box
                key={s.label}
                flex={1}
                bg={colors.surface}
                rounded={12}
                p={12}
                borderWidth={1}
                borderColor={colors.border}
                gap={6}
              >
                <Box w={36} h={32} rounded={8} bg={s.bg} align="center" justify="center">
                  <CoreText fontSize={10} color={s.color} fontWeight="700">{s.change}</CoreText>
                </Box>
                <CoreText fontSize={18} fontWeight="700" color={colors.textPrimary}>{s.value}</CoreText>
                <CoreText fontSize={11} color={colors.textSecondary}>{s.label}</CoreText>
              </Box>
            ))}
          </Row>
        </Box>

        {/* Quick actions */}
        <Box px={16} mt={20} gap={10}>
          <CoreText fontSize={14} fontWeight="600" color={colors.textPrimary}>Quick actions</CoreText>
          <Row gap={10}>
            {QUICK_ACTIONS.map(a => (
              <CorePressable key={a.label} flex={1} bg={a.bg} rounded={12} py={14} align="center" gap={6}>
                <CoreText fontSize={22}>{a.emoji}</CoreText>
                <CoreText fontSize={11} fontWeight="600" color={a.fg}>{a.label}</CoreText>
              </CorePressable>
            ))}
          </Row>
        </Box>

        {/* Tab switcher */}
        <Box px={16} mt={24} gap={12}>
          <Box bg={colors.surfaceAlt} rounded={10} p={4} direction="row">
            {(['overview', 'activity'] as const).map(tab => (
              <CorePressable
                key={tab}
                flex={1}
                onPress={() => setActiveTab(tab)}
                bg={activeTab === tab ? colors.surface : colors.transparent}
                rounded={8}
                py={8}
                align="center"
              >
                <CoreText
                  fontSize={13}
                  fontWeight={activeTab === tab ? '600' : '400'}
                  color={activeTab === tab ? colors.textPrimary : colors.textSecondary}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </CoreText>
              </CorePressable>
            ))}
          </Box>

          {activeTab === 'overview' ? (
            <Box bg={colors.surface} rounded={14} p={16} borderWidth={1} borderColor={colors.border} gap={14}>
              <CoreText fontSize={14} fontWeight="600" color={colors.textPrimary}>Sales by category</CoreText>
              {SALES_BY_CATEGORY.map(item => (
                <Col key={item.label} gap={4}>
                  <Row align="center" justify="space-between">
                    <CoreText fontSize={13} color={colors.textSecondary}>{item.label}</CoreText>
                    <CoreText fontSize={13} fontWeight="600" color={colors.textPrimary}>{item.pct}%</CoreText>
                  </Row>
                  <Box h={6} bg={colors.surfaceAlt} rounded={3}>
                    <Box h={6} rounded={3} bg={item.color} style={{ width: `${item.pct}%` }} />
                  </Box>
                </Col>
              ))}
            </Box>
          ) : (
            <Box bg={colors.surface} rounded={14} borderWidth={1} borderColor={colors.border} overflow="hidden">
              {ACTIVITY.map((a, i) => (
                <React.Fragment key={a.title}>
                  <Row align="center" gap={12} px={16} py={14}>
                    <Box w={8} h={8} rounded={4} bg={a.dot} />
                    <Col flex={1} gap={2}>
                      <CoreText fontSize={13} fontWeight="500" color={colors.textPrimary}>{a.title}</CoreText>
                      <CoreText fontSize={11} color={colors.textSecondary}>{a.time}</CoreText>
                    </Col>
                  </Row>
                  {i < ACTIVITY.length - 1 && <Separator color={colors.border} />}
                </React.Fragment>
              ))}
            </Box>
          )}
        </Box>

        {/* Bordered info box */}
        <Box mx={16} mt={20} bg={colors.primaryLight} rounded={12} p={16} borderLeftWidth={4} borderColor={colors.primary} gap={4}>
          <CoreText fontSize={13} fontWeight="600" color={colors.primary}>Pro tip</CoreText>
          <CoreText fontSize={12} color={colors.primary} lineHeight={18}>
            Box accepts shorthand layout props — p, px, py, mx, my, w, h, rounded, bg, flex — so you rarely need a StyleSheet.
          </CoreText>
        </Box>
      </Box>
    </ScrollView>
  );
}
