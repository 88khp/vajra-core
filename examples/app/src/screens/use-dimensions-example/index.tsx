import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Col, Row, CoreText, CorePressable } from '@88khp/vajra-ui-core';
import { useDimensions } from '@88khp/vajra-ui-core';
import { colors } from '../../colors';
import { SCREEN_PADDING, GAP, PHOTO_EMOJIS, FEATURED_CARDS, ADAPTIVE_LABELS } from './data';

type ColCount = 2 | 3 | 4;

export function UseDimensionsExample() {
  const dims = useDimensions(SCREEN_PADDING);
  const [colCount, setColCount] = useState<ColCount>(3);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const adaptiveCols: ColCount = dims.width >= 768 ? 4 : dims.width >= 480 ? 3 : 2;
  const photoSize = dims.getItemWidth(colCount, GAP);
  const cardCols = dims.width >= 480 ? 2 : 1;
  const cardWidth = dims.getItemWidth(cardCols, 12);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box bg={colors.background} pb={40}>

        {/* Screen metrics panel */}
        <Box bg={colors.surface} px={SCREEN_PADDING} pt={20} pb={16} borderBottomWidth={1} borderColor={colors.border}>
          <CoreText fontSize={20} fontWeight="800" color={colors.textPrimary} style={{ marginBottom: 14 }}>
            Gallery
          </CoreText>

          <Box bg={colors.surfaceAlt} rounded={12} p={14} borderWidth={1} borderColor={colors.border}>
            <CoreText fontSize={11} fontWeight="700" color={colors.textSecondary} transform="uppercase" letterSpacing={0.8} style={{ marginBottom: 10 }}>
              useDimensions — live values
            </CoreText>
            {[
              ['Screen width', `${dims.width}px`],
              ['Screen height', `${dims.height}px`],
              ['Content width', `${dims.contentWidth}px (padding ${SCREEN_PADDING}×2)`],
              ['Pixel scale', `${dims.scale}×`],
              ['Font scale', `${dims.fontScale}×`],
              ['Device class', dims.width >= 768 ? '📱 Tablet (≥768px)' : '📱 Phone (<768px)'],
            ].map(([label, value]) => (
              <Row key={label} align="center" justify="space-between" style={{ paddingVertical: 4 }}>
                <CoreText fontSize={12} color={colors.textSecondary}>{label}</CoreText>
                <CoreText fontSize={12} fontWeight="600" color={colors.textPrimary}>{value}</CoreText>
              </Row>
            ))}
          </Box>
        </Box>

        {/* Featured albums */}
        <Box px={SCREEN_PADDING} mt={20} gap={10}>
          <CoreText fontSize={14} fontWeight="700" color={colors.textPrimary}>Albums</CoreText>
          <Row gap={12} wrap="wrap">
            {FEATURED_CARDS.map((card) => (
              <Box key={card.title} w={cardWidth} bg={colors.surface} rounded={14} borderWidth={1} borderColor={colors.border} overflow="hidden">
                <Box h={80} bg={card.color} align="center" justify="center">
                  <CoreText fontSize={36}>{card.emoji}</CoreText>
                </Box>
                <Row align="center" justify="space-between" px={12} py={10}>
                  <Col gap={1}>
                    <CoreText fontSize={13} fontWeight="700" color={colors.textPrimary}>{card.title}</CoreText>
                    <CoreText fontSize={11} color={colors.textSecondary}>{card.count} photos</CoreText>
                  </Col>
                  <CoreText fontSize={16} color={colors.textDisabled}>›</CoreText>
                </Row>
              </Box>
            ))}
          </Row>
          <CoreText fontSize={11} color={colors.textDisabled}>
            Card width: {cardWidth.toFixed(0)}px · {cardCols} columns · {dims.width >= 480 ? 'wide' : 'narrow'} layout
          </CoreText>
        </Box>

        {/* Column switcher */}
        <Box px={SCREEN_PADDING} mt={24} gap={10}>
          <Row align="center" justify="space-between">
            <CoreText fontSize={14} fontWeight="700" color={colors.textPrimary}>All photos</CoreText>
            <Row gap={6} align="center">
              <CoreText fontSize={11} color={colors.textSecondary}>Columns:</CoreText>
              {([2, 3, 4] as ColCount[]).map((n) => (
                <CorePressable
                  key={n}
                  onPress={() => setColCount(n)}
                  w={32} h={28}
                  rounded={8}
                  align="center"
                  justify="center"
                  bg={colCount === n ? colors.primary : colors.surface}
                  borderWidth={1}
                  borderColor={colCount === n ? colors.primary : colors.border}
                >
                  <CoreText fontSize={12} fontWeight="700" color={colCount === n ? colors.textInverse : colors.textSecondary}>
                    {n}
                  </CoreText>
                </CorePressable>
              ))}
            </Row>
          </Row>
          <CoreText fontSize={11} color={colors.textDisabled}>
            Photo size: {photoSize.toFixed(0)}px · gap: {GAP}px · content: {dims.contentWidth}px
          </CoreText>
        </Box>

        {/* Photo grid */}
        <Box px={SCREEN_PADDING} mt={8}>
          <Row gap={GAP} wrap="wrap">
            {PHOTO_EMOJIS.map((emoji, i) => (
              <CorePressable
                key={i}
                onPress={() => setSelectedPhoto(selectedPhoto === i ? null : i)}
                w={photoSize}
                h={photoSize}
                rounded={8}
                bg={selectedPhoto === i ? colors.primary : colors.surfaceAlt}
                align="center"
                justify="center"
                borderWidth={selectedPhoto === i ? 2.5 : 0}
                borderColor={colors.primary}
              >
                <CoreText fontSize={photoSize * 0.35}>{emoji}</CoreText>
                {selectedPhoto === i && (
                  <Box position="absolute" top={6} right={6} w={18} h={18} rounded={9} bg={colors.primary} align="center" justify="center">
                    <CoreText fontSize={10} fontWeight="700" color={colors.textInverse}>✓</CoreText>
                  </Box>
                )}
              </CorePressable>
            ))}
          </Row>
        </Box>

        {/* Adaptive breakpoint demo */}
        <Box px={SCREEN_PADDING} mt={28} gap={10}>
          <Row align="center" gap={8}>
            <Box flex={1} h={1} bg={colors.border} />
            <CoreText fontSize={11} fontWeight="600" color={colors.textDisabled} transform="uppercase" letterSpacing={0.8}>
              Adaptive breakpoint demo
            </CoreText>
            <Box flex={1} h={1} bg={colors.border} />
          </Row>

          <Box bg={colors.surface} rounded={14} p={14} borderWidth={1} borderColor={colors.border} gap={12}>
            <Row align="center" gap={8}>
              <Box px={10} py={4} rounded={20} bg={dims.width >= 768 ? colors.successLight : colors.primaryLight}>
                <CoreText fontSize={11} fontWeight="700" color={dims.width >= 768 ? colors.success : colors.primary}>
                  {dims.width >= 768 ? 'Tablet layout' : 'Phone layout'}
                </CoreText>
              </Box>
              <CoreText fontSize={12} color={colors.textSecondary}>{adaptiveCols} columns auto-selected</CoreText>
            </Row>
            <Row gap={GAP} wrap="wrap">
              {ADAPTIVE_LABELS.slice(0, adaptiveCols * 2).map((label) => {
                const w = dims.getItemWidth(adaptiveCols, GAP);
                return (
                  <Box key={label} w={w} h={48} rounded={10} bg={colors.primaryLight} align="center" justify="center" borderWidth={1} borderColor={colors.primary}>
                    <CoreText fontSize={14} fontWeight="700" color={colors.primary}>{label}</CoreText>
                  </Box>
                );
              })}
            </Row>
            <CoreText fontSize={11} color={colors.textDisabled}>
              Each item: {dims.getItemWidth(adaptiveCols, GAP).toFixed(0)}px wide · resize window to see columns change
            </CoreText>
          </Box>
        </Box>

      </Box>
    </ScrollView>
  );
}
