import React, { useState } from 'react';
import { ScrollView, Switch } from 'react-native';
import {
  Box,
  Col,
  Row,
  CoreText,
  CorePressable,
  Separator,
} from '@88khp/vajra-core';
import { colors } from '../../colors';
import { TOGGLE_SETTINGS, NAV_SECTIONS } from './data';

export function ColExample() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    push: true,
    email: false,
    marketing: false,
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box bg={colors.background} pb={40}>
        {/* Profile summary card */}
        <Box
          bg={colors.surface}
          px={20}
          pt={24}
          pb={20}
          borderBottomWidth={1}
          borderColor={colors.border}
        >
          <Col align="center" gap={8}>
            <Box
              w={80}
              h={80}
              rounded={40}
              bg={colors.primary}
              align="center"
              justify="center"
            >
              <CoreText
                fontSize={28}
                fontWeight="700"
                color={colors.textInverse}
              >
                RJ
              </CoreText>
            </Box>
            <Col align="center" gap={2}>
              <CoreText
                fontSize={18}
                fontWeight="700"
                color={colors.textPrimary}
              >
                Rishav Jha
              </CoreText>
              <CoreText fontSize={13} color={colors.textSecondary}>
                rishav.rj74@gmail.com
              </CoreText>
            </Col>
            <Box bg={colors.primaryLight} px={14} py={5} rounded={20}>
              <CoreText fontSize={12} fontWeight="600" color={colors.primary}>
                Pro plan · renews Apr 2026
              </CoreText>
            </Box>
          </Col>
        </Box>

        {/* Notification toggles */}
        <Box px={16} mt={24}>
          <CoreText
            fontSize={12}
            fontWeight="600"
            color={colors.textSecondary}
            transform="uppercase"
            letterSpacing={0.8}
          >
            Notifications
          </CoreText>
          <Box
            mt={8}
            bg={colors.surface}
            rounded={14}
            borderWidth={1}
            borderColor={colors.border}
            overflow="hidden"
          >
            {TOGGLE_SETTINGS.map((item, i) => (
              <React.Fragment key={item.id}>
                <Row align="center" gap={12} px={16} py={14}>
                  <Box
                    w={36}
                    h={36}
                    rounded={10}
                    bg={colors.surfaceAlt}
                    align="center"
                    justify="center"
                  >
                    <CoreText fontSize={16}>{item.emoji}</CoreText>
                  </Box>
                  <Col flex={1} gap={2}>
                    <CoreText
                      fontSize={14}
                      fontWeight="500"
                      color={colors.textPrimary}
                    >
                      {item.label}
                    </CoreText>
                    <CoreText fontSize={12} color={colors.textSecondary}>
                      {item.description}
                    </CoreText>
                  </Col>
                  <Switch
                    value={toggles[item.id]}
                    onValueChange={v =>
                      setToggles(t => ({ ...t, [item.id]: v }))
                    }
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={colors.surface}
                  />
                </Row>
                {i < TOGGLE_SETTINGS.length - 1 && (
                  <Separator color={colors.border} />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>

        {/* Navigation sections */}
        {NAV_SECTIONS.map(section => (
          <Box key={section.title} px={16} mt={24}>
            <CoreText
              fontSize={12}
              fontWeight="600"
              color={colors.textSecondary}
              transform="uppercase"
              letterSpacing={0.8}
            >
              {section.title}
            </CoreText>
            <Box
              mt={8}
              bg={colors.surface}
              rounded={14}
              borderWidth={1}
              borderColor={colors.border}
              overflow="hidden"
            >
              {section.items.map((item, i) => (
                <React.Fragment key={item.label}>
                  <CorePressable bg={colors.surface}>
                    <Row align="center" gap={12} px={16} py={14}>
                      <Box
                        w={36}
                        h={36}
                        rounded={10}
                        bg={colors.surfaceAlt}
                        align="center"
                        justify="center"
                      >
                        <CoreText fontSize={16}>{item.emoji}</CoreText>
                      </Box>
                      <Box flex={1} justify='center'>
                        <CoreText
                          fontSize={14}
                          fontWeight="500"
                          color={
                            'danger' in item && item.danger
                              ? colors.error
                              : colors.textPrimary
                          }
                        >
                          {item.label}
                        </CoreText>
                      </Box>
                      <Row align="center" gap={6}>
                        {'badge' in item && item.badge && (
                          <Box bg={item.badgeBg} px={8} py={3} rounded={20}>
                            <CoreText
                              fontSize={11}
                              fontWeight="500"
                              color={item.badgeFg}
                            >
                              {item.badge}
                            </CoreText>
                          </Box>
                        )}
                        {item.chevron && (
                          <CoreText fontSize={16} color={colors.textDisabled}>
                            ›
                          </CoreText>
                        )}
                      </Row>
                    </Row>
                  </CorePressable>
                  {i < section.items.length - 1 && (
                    <Separator color={colors.border} />
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        ))}

        {/* App info */}
        <Col align="center" gap={4} mt={32}>
          <CoreText fontSize={12} color={colors.textDisabled}>
            Vajra UI Core · v2.0.1
          </CoreText>
          <CoreText fontSize={11} color={colors.textDisabled}>
            © 2026 88khp
          </CoreText>
        </Col>
      </Box>
    </ScrollView>
  );
}
