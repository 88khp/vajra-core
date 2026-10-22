import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import {
  Box, Row, Col, CoreText, CorePressable, Separator,
} from '@88khp/vajra-core';
import { colors } from '../../colors';
import { SIZES, COLOR_OPTIONS, REVIEWS } from './data';

function Stars({ count }: { count: number }) {
  return (
    <Row gap={2}>
      {[1, 2, 3, 4, 5].map((n) => (
        <CoreText key={n} fontSize={12} color={n <= count ? colors.warning : colors.textDisabled}>★</CoreText>
      ))}
    </Row>
  );
}

export function CorePressableExample() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Midnight');
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box bg={colors.background} pb={120}>

        {/* Product hero */}
        <Box h={300} bg={colors.surfaceAlt} align="center" justify="center">
          <CoreText fontSize={100}>👕</CoreText>
          <Box position="absolute" top={16} right={16}>
            <CorePressable
              onPress={() => setWishlisted((w) => !w)}
              w={44} h={44} rounded={22}
              bg={colors.surface}
              align="center" justify="center"
              borderWidth={1}
              borderColor={colors.border}
            >
              <CoreText fontSize={20}>{wishlisted ? '❤️' : '🤍'}</CoreText>
            </CorePressable>
          </Box>
          <Box position="absolute" top={16} left={16}>
            <CorePressable
              onPress={() => Alert.alert('Share')}
              w={44} h={44} rounded={22}
              bg={colors.surface}
              align="center" justify="center"
              borderWidth={1}
              borderColor={colors.border}
            >
              <CoreText fontSize={18}>📤</CoreText>
            </CorePressable>
          </Box>
        </Box>

        <Box px={16} mt={16} gap={16}>
          {/* Product info */}
          <Row align="flex-start" justify="space-between">
            <Col flex={1} gap={4}>
              <CoreText fontSize={22} fontWeight="700" color={colors.textPrimary} lineHeight={28}>
                Essential Crew T-Shirt
              </CoreText>
              <Row align="center" gap={8}>
                <Stars count={4} />
                <CoreText fontSize={12} color={colors.textSecondary}>4.4 · 128 reviews</CoreText>
              </Row>
            </Col>
            <Col align="flex-end" gap={2}>
              <CoreText fontSize={24} fontWeight="700" color={colors.textPrimary}>$48</CoreText>
              <CoreText fontSize={13} color={colors.textDisabled} decoration="line-through">$65</CoreText>
            </Col>
          </Row>

          {/* Colour selector */}
          <Col gap={8}>
            <CoreText fontSize={13} fontWeight="600" color={colors.textSecondary}>
              Colour — <CoreText fontSize={13} fontWeight="400" color={colors.textPrimary}>{selectedColor}</CoreText>
            </CoreText>
            <Row gap={10}>
              {COLOR_OPTIONS.map((c) => (
                <CorePressable key={c.label} onPress={() => setSelectedColor(c.label)}>
                  <Box
                    w={36} h={36} rounded={18}
                    bg={c.hex}
                    borderWidth={selectedColor === c.label ? 3 : 1.5}
                    borderColor={selectedColor === c.label ? colors.primary : colors.transparent}
                    style={selectedColor === c.label ? { padding: 2 } : {}}
                  />
                </CorePressable>
              ))}
            </Row>
          </Col>

          {/* Size selector */}
          <Col gap={8}>
            <Row align="center" justify="space-between">
              <CoreText fontSize={13} fontWeight="600" color={colors.textSecondary}>Size</CoreText>
              <CorePressable onPress={() => Alert.alert('Size guide')}>
                <CoreText fontSize={12} fontWeight="600" color={colors.primary}>Size guide ›</CoreText>
              </CorePressable>
            </Row>
            <Row gap={8}>
              {SIZES.map((size) => (
                <CorePressable
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  w={52} h={44}
                  rounded={10}
                  align="center"
                  justify="center"
                  bg={selectedSize === size ? colors.primary : colors.surface}
                  borderWidth={1.5}
                  borderColor={selectedSize === size ? colors.primary : colors.border}
                >
                  <CoreText fontSize={13} fontWeight="600" color={selectedSize === size ? colors.textInverse : colors.textPrimary}>
                    {size}
                  </CoreText>
                </CorePressable>
              ))}
            </Row>
          </Col>

          {/* Quantity stepper */}
          <Col gap={8}>
            <CoreText fontSize={13} fontWeight="600" color={colors.textSecondary}>Quantity</CoreText>
            <Row align="center" gap={0} bg={colors.surface} rounded={10} borderWidth={1} borderColor={colors.border} style={{ alignSelf: 'flex-start' }}>
              <CorePressable onPress={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} w={44} h={44} align="center" justify="center">
                <CoreText fontSize={20} color={qty <= 1 ? colors.textDisabled : colors.textPrimary}>−</CoreText>
              </CorePressable>
              <Box w={1} h={28} bg={colors.border} />
              <Box w={52} h={44} align="center" justify="center">
                <CoreText fontSize={15} fontWeight="700" color={colors.textPrimary}>{qty}</CoreText>
              </Box>
              <Box w={1} h={28} bg={colors.border} />
              <CorePressable onPress={() => setQty((q) => q + 1)} w={44} h={44} align="center" justify="center">
                <CoreText fontSize={20} color={colors.textPrimary}>+</CoreText>
              </CorePressable>
            </Row>
          </Col>

          <Separator color={colors.border} />

          {/* Reviews */}
          <Col gap={10}>
            <Row align="center" justify="space-between">
              <CoreText fontSize={15} fontWeight="700" color={colors.textPrimary}>Reviews</CoreText>
              <CorePressable onPress={() => Alert.alert('All reviews')}>
                <CoreText fontSize={13} fontWeight="600" color={colors.primary}>See all ›</CoreText>
              </CorePressable>
            </Row>
            {REVIEWS.map((r, i) => (
              <React.Fragment key={r.id}>
                <Box gap={6}>
                  <Row align="center" justify="space-between">
                    <CoreText fontSize={13} fontWeight="600" color={colors.textPrimary}>{r.author}</CoreText>
                    <Stars count={r.rating} />
                  </Row>
                  <CoreText fontSize={13} color={colors.textSecondary} lineHeight={19}>{r.text}</CoreText>
                </Box>
                {i < REVIEWS.length - 1 && <Separator color={colors.border} />}
              </React.Fragment>
            ))}
            <CorePressable
              onPress={() => Alert.alert('Write review')}
              bg={colors.surface}
              rounded={10}
              py={12}
              align="center"
              borderWidth={1}
              borderColor={colors.border}
            >
              <CoreText fontSize={13} fontWeight="600" color={colors.textPrimary}>Write a review</CoreText>
            </CorePressable>
          </Col>
        </Box>

      </Box>

      {/* Sticky bottom CTA */}
      <Box position="absolute" bottom={0} left={0} right={0} bg={colors.surface} px={16} pt={12} pb={28} borderTopWidth={1} borderColor={colors.border}>
        <Row gap={10}>
          <CorePressable
            onPress={() => Alert.alert('Added to wishlist')}
            w={52} h={52} rounded={12}
            bg={colors.surfaceAlt}
            align="center" justify="center"
            borderWidth={1}
            borderColor={colors.border}
          >
            <CoreText fontSize={22}>{wishlisted ? '❤️' : '🤍'}</CoreText>
          </CorePressable>
          <CorePressable
            onPress={handleAddToCart}
            flex={1}
            bg={addedToCart ? colors.success : colors.primary}
            rounded={12}
            h={52}
            align="center"
            justify="center"
          >
            <CoreText fontSize={15} fontWeight="700" color={colors.textInverse}>
              {addedToCart ? '✓ Added to cart' : `Add to cart · $${48 * qty}`}
            </CoreText>
          </CorePressable>
        </Row>
      </Box>
    </ScrollView>
  );
}
