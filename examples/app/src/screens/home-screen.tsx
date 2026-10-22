import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Box,
  Col,
  Row,
  CoreText,
  CorePressable,
  Separator,
} from '@88khp/vajra-core';

import { RootStackParamList } from '../navigator';
import { colors } from '../colors';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type TEntry = {
  route: keyof RootStackParamList;
  label: string;
  description: string;
  emoji: string;
};

const ENTRIES: TEntry[] = [
  {
    route: 'BoxExample',
    label: 'Box',
    description: 'Foundation View with shorthand style props',
    emoji: '📦',
  },
  {
    route: 'RowExample',
    label: 'Row',
    description: 'Box preset — direction="row"',
    emoji: '↔️',
  },
  {
    route: 'ColExample',
    label: 'Col',
    description: 'Box preset — direction="column"',
    emoji: '↕️',
  },
  {
    route: 'CenterExample',
    label: 'Center',
    description: 'Box preset — align & justify center',
    emoji: '🎯',
  },
  {
    route: 'AbsoluteCenterExample',
    label: 'AbsoluteCenter',
    description: 'Fills parent absolutely, centres children',
    emoji: '🔲',
  },
  {
    route: 'SpacerExample',
    label: 'Spacer',
    description: 'Fixed-size empty space',
    emoji: '⬜',
  },
  {
    route: 'SeparatorExample',
    label: 'Separator',
    description: 'Horizontal / vertical line divider',
    emoji: '➖',
  },
  {
    route: 'CoreTextExample',
    label: 'CoreText',
    description: 'Headless Text with typography props',
    emoji: '🔤',
  },
  {
    route: 'CoreTextInputExample',
    label: 'CoreTextInput',
    description: 'Headless TextInput with layout + typography',
    emoji: '✏️',
  },
  {
    route: 'CorePressableExample',
    label: 'CorePressable',
    description: 'Headless TouchableOpacity with layout props',
    emoji: '👆',
  },
  {
    route: 'GridExample',
    label: 'Grid',
    description: 'Responsive compound grid system',
    emoji: '🔢',
  },
  {
    route: 'UseDimensionsExample',
    label: 'useDimensions',
    description: 'Screen-aware dimension utilities',
    emoji: '📐',
  },
];

export function HomeScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView>
      <Box p={16} gap={4}>
        <Box px={4} pb={16}>
          <CoreText
            fontSize={14}
            color={colors.textPrimary}
            lineHeight={20}
            align="center"
          >
            Headless React Native layout primitives.{'\n'}Tap any component to see
            live examples.
          </CoreText>
        </Box>

        <Box
          bg={colors.surface}
          rounded={14}
          borderWidth={1}
          borderColor={colors.border}
          overflow='hidden'
        >
          {ENTRIES.map((entry, i) => (
            <React.Fragment key={entry.route}>
              <CorePressable onPress={() => navigation.navigate(entry.route)}>
                <Row align="center" gap={14} px={16} py={14}>
                  <Box
                    w={40}
                    h={40}
                    rounded={10}
                    bg={colors.surfaceAlt}
                    align="center"
                    justify="center"
                  >
                    <CoreText fontSize={20}>{entry.emoji}</CoreText>
                  </Box>
                  <Box flex={1}>
                    <Col gap={2}>
                      <CoreText
                        fontSize={15}
                        fontWeight="600"
                        color={colors.textPrimary}
                      >
                        {entry.label}
                      </CoreText>
                      <CoreText
                        fontSize={12}
                        color={colors.textSecondary}
                        lineHeight={16}
                      >
                        {entry.description}
                      </CoreText>
                    </Col>
                  </Box>
                  <CoreText fontSize={18} color={colors.textDisabled}>
                    ›
                  </CoreText>
                </Row>
              </CorePressable>
              {i < ENTRIES.length - 1 && <Separator color={colors.border} />}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </ScrollView>
  );
}
