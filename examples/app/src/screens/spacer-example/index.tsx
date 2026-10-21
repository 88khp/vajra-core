import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Row, Col, Spacer, CoreText, CorePressable, Separator } from '@88khp/vajra-ui-core';
import { colors } from '../../colors';
import { TAGS, CODE_LINES, SPACER_SIZES } from './data';

export function SpacerExample() {
  const [bookmarked, setBookmarked] = useState(false);
  const [claps, setClaps] = useState(148);
  const [clapped, setClapped] = useState(false);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box bg={colors.background} pb={48}>

        {/* Article toolbar */}
        <Box bg={colors.surface} borderBottomWidth={1} borderColor={colors.border} px={16} py={12}>
          <Row align="center">
            <Box w={36} h={36} rounded={18} bg={colors.primary} align="center" justify="center">
              <CoreText fontSize={14} fontWeight="700" color={colors.textInverse}>RJ</CoreText>
            </Box>
            <Spacer w={10} />
            <Col gap={1}>
              <CoreText fontSize={13} fontWeight="600" color={colors.textPrimary}>Rishav Jha</CoreText>
              <CoreText fontSize={11} color={colors.textSecondary}>Apr 6, 2026 · 6 min read</CoreText>
            </Col>
            <Box flex={1} />
            <CorePressable onPress={() => setBookmarked((b) => !b)}>
              <CoreText fontSize={20}>{bookmarked ? '🔖' : '🏷️'}</CoreText>
            </CorePressable>
            <Spacer w={16} />
            <CorePressable>
              <CoreText fontSize={20}>📤</CoreText>
            </CorePressable>
          </Row>
        </Box>

        {/* Hero */}
        <Box bg={colors.primary} h={200} align="center" justify="center">
          <CoreText fontSize={80}>📝</CoreText>
        </Box>

        {/* Article body */}
        <Box px={20}>
          <Spacer h={24} />
          <CoreText fontSize={26} fontWeight="700" color={colors.textPrimary} lineHeight={34}>
            Building Headless UI Primitives for React Native
          </CoreText>

          <Spacer h={12} />
          <Row gap={8} wrap="wrap">
            {TAGS.map((tag) => (
              <Box key={tag} bg={colors.primaryLight} px={10} py={4} rounded={20}>
                <CoreText fontSize={11} fontWeight="600" color={colors.primary}>{tag}</CoreText>
              </Box>
            ))}
          </Row>

          <Spacer h={20} />
          <CoreText fontSize={15} color={colors.textPrimary} lineHeight={24}>
            Headless components give you full control over styling while keeping your logic clean and reusable.
            Instead of fighting default styles, you start from zero — and build exactly what your design needs.
          </CoreText>

          <Spacer h={24} />
          <Box borderLeftWidth={4} borderColor={colors.primary} bg={colors.primaryLight} rounded={8} px={16} py={14}>
            <CoreText fontSize={16} fontWeight="600" color={colors.primary} lineHeight={24}>
              "The best component library is the one you never have to override."
            </CoreText>
          </Box>

          <Spacer h={24} />
          <CoreText fontSize={15} color={colors.textPrimary} lineHeight={24}>
            With Vajra UI Core, each primitive — Box, Row, Col, Center — accepts shorthand style props directly.
            No StyleSheet boilerplate, no theme provider required. Just props.
          </CoreText>

          <Spacer h={20} />
          <Box bg={colors.surfaceAlt} rounded={10} p={16} borderWidth={1} borderColor={colors.border}>
            <CoreText fontSize={12} color={colors.primary} fontWeight="600">
              Example
            </CoreText>
            <Spacer h={12} />
            {CODE_LINES.map((line, i) => (
              <CoreText key={i} fontSize={12} color={colors.textPrimary} lineHeight={20} style={{ fontVariant: ['tabular-nums'] }}>
                {line}
              </CoreText>
            ))}
          </Box>

          <Spacer h={20} />
          <CoreText fontSize={15} color={colors.textPrimary} lineHeight={24}>
            Spacer is one of the simplest primitives: a plain View with explicit width or height.
            It makes rhythm intentional rather than accidental.
          </CoreText>
        </Box>

        {/* Spacer size reference */}
        <Box mx={20} mt={32} bg={colors.surface} rounded={14} p={16} borderWidth={1} borderColor={colors.border}>
          <CoreText fontSize={12} fontWeight="600" color={colors.textSecondary} transform="uppercase" letterSpacing={0.8}>
            Spacer size reference
          </CoreText>
          <Spacer h={12} />
          {SPACER_SIZES.map((size) => (
            <React.Fragment key={size}>
              <Spacer h={size} />
              <Row align="center" gap={8}>
                <Box h={1} flex={1} bg={colors.border} />
                <Box bg={colors.surfaceAlt} px={8} py={3} rounded={10}>
                  <CoreText fontSize={10} fontWeight="600" color={colors.textDisabled}>{size}px</CoreText>
                </Box>
                <Box h={1} flex={1} bg={colors.border} />
              </Row>
            </React.Fragment>
          ))}
        </Box>

        {/* Footer */}
        <Box mx={20} mt={24}>
          <Separator color={colors.border} />
          <Spacer h={16} />
          <Row align="center">
            <CorePressable
              onPress={() => { setClapped(true); setClaps((c) => c + 1); }}
              bg={clapped ? colors.warningLight : colors.surfaceAlt}
              px={14} py={8} rounded={20}
            >
              <Row align="center" gap={6}>
                <CoreText fontSize={16}>👏</CoreText>
                <CoreText fontSize={13} fontWeight="600" color={clapped ? colors.warning : colors.textSecondary}>
                  {claps}
                </CoreText>
              </Row>
            </CorePressable>
            <Box flex={1} />
            <CorePressable bg={colors.primary} px={16} py={8} rounded={20}>
              <CoreText fontSize={13} fontWeight="600" color={colors.textInverse}>Follow author</CoreText>
            </CorePressable>
          </Row>
        </Box>

      </Box>
    </ScrollView>
  );
}
