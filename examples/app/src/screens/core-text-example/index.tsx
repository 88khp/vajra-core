import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Row, Col, CoreText, CorePressable, Separator } from '@88khp/vajra-ui-core';
import { colors } from '../../colors';
import { CATEGORIES, ARTICLES, TYPE_SCALE, SEMANTIC_COLORS } from './data';

export function CoreTextExample() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box bg={colors.background} pb={40}>

        {/* Masthead */}
        <Box bg={colors.surface} px={20} pt={24} pb={20} borderBottomWidth={1} borderColor={colors.border}>
          <CoreText fontSize={32} fontWeight="800" color={colors.textPrimary} letterSpacing={-0.5} lineHeight={38}>
            The Brief
          </CoreText>
          <CoreText fontSize={14} color={colors.textSecondary} lineHeight={20} style={{ marginTop: 4 }}>
            Sunday, April 6, 2026
          </CoreText>

          <Row mt={16} gap={6}>
            {CATEGORIES.map((cat) => (
              <CorePressable key={cat} onPress={() => setActiveCategory(cat)}>
                <Box
                  px={12} py={6}
                  rounded={20}
                  bg={activeCategory === cat ? colors.primary : colors.surfaceAlt}
                  borderWidth={1}
                  borderColor={activeCategory === cat ? colors.primary : colors.border}
                >
                  <CoreText
                    fontSize={12}
                    fontWeight={activeCategory === cat ? '700' : '400'}
                    color={activeCategory === cat ? colors.textInverse : colors.textSecondary}
                    transform="capitalize"
                  >
                    {cat}
                  </CoreText>
                </Box>
              </CorePressable>
            ))}
          </Row>
        </Box>

        {/* Editor's note */}
        <Box px={20} pt={20} pb={16}>
          <Row align="center" gap={10}>
            <Box flex={1} h={1} bg={colors.border} />
            <CoreText fontSize={11} fontWeight="600" color={colors.textDisabled} transform="uppercase" letterSpacing={1.2}>
              Editor's picks
            </CoreText>
            <Box flex={1} h={1} bg={colors.border} />
          </Row>
        </Box>

        {/* Article cards */}
        <Col px={16} gap={16}>
          {filtered.map((article) => (
            <CorePressable key={article.id} bg={colors.surface} rounded={16} borderWidth={1} borderColor={colors.border} overflow="hidden">
              <Box h={130} bg={colors.surfaceAlt} align="center" justify="center">
                <CoreText fontSize={64}>{article.emoji}</CoreText>
              </Box>

              <Box px={16} pt={14} pb={16} gap={10}>
                <Row align="center" gap={8}>
                  <Box bg={article.tagBg} px={8} py={3} rounded={6}>
                    <CoreText fontSize={10} fontWeight="700" color={article.tagColor} transform="uppercase" letterSpacing={0.8}>
                      {article.tag}
                    </CoreText>
                  </Box>
                  <CoreText fontSize={12} color={colors.textSecondary}>{article.category}</CoreText>
                </Row>

                <CoreText fontSize={18} fontWeight="700" color={colors.textPrimary} lineHeight={24} letterSpacing={-0.3}>
                  {article.headline}
                </CoreText>

                <CoreText fontSize={14} fontWeight="400" color={colors.textSecondary} lineHeight={21}>
                  {article.summary}
                </CoreText>

                <Separator color={colors.border} />

                <Row align="center" justify="space-between">
                  <Row align="center" gap={6}>
                    <CoreText fontSize={12} color={colors.textSecondary}>By </CoreText>
                    <CoreText fontSize={12} fontWeight="600" color={colors.primary} decoration="underline">
                      {article.author}
                    </CoreText>
                  </Row>
                  <CoreText fontSize={11} color={colors.textDisabled}>{article.readTime} read</CoreText>
                </Row>
              </Box>
            </CorePressable>
          ))}
        </Col>

        {/* Type scale reference */}
        <Box mx={16} mt={28} bg={colors.surface} rounded={14} p={16} borderWidth={1} borderColor={colors.border} gap={10}>
          <CoreText fontSize={11} fontWeight="700" color={colors.textSecondary} transform="uppercase" letterSpacing={1}>
            Type scale
          </CoreText>
          <Separator color={colors.border} />
          {TYPE_SCALE.map(({ label, size, weight, lh }) => (
            <Row key={label} align="baseline" gap={12}>
              <Box w={52}>
                <CoreText fontSize={10} fontWeight="600" color={colors.textDisabled} transform="uppercase">{label}</CoreText>
              </Box>
              <CoreText fontSize={size} fontWeight={weight} color={colors.textPrimary} lineHeight={lh}>
                The quick fox
              </CoreText>
            </Row>
          ))}
        </Box>

        {/* Semantic colour reference */}
        <Box mx={16} mt={16} bg={colors.surface} rounded={14} p={16} borderWidth={1} borderColor={colors.border} gap={8}>
          <CoreText fontSize={11} fontWeight="700" color={colors.textSecondary} transform="uppercase" letterSpacing={1}>
            Semantic colours
          </CoreText>
          <Separator color={colors.border} />
          {SEMANTIC_COLORS.map(({ label, color, text }) => (
            <Row key={label} align="center" gap={12}>
              <Box w={56}>
                <CoreText fontSize={10} fontWeight="600" color={colors.textDisabled} transform="uppercase">{label}</CoreText>
              </Box>
              <CoreText fontSize={13} fontWeight="500" color={color}>{text}</CoreText>
            </Row>
          ))}
        </Box>

      </Box>
    </ScrollView>
  );
}
