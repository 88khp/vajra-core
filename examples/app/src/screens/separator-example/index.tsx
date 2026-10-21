import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Row, Col, Separator, CoreText, CorePressable } from '@88khp/vajra-ui-core';
import { colors } from '../../colors';
import { CONTACTS, grouped, getInitials, getAvatarColor } from './data';

export function SeparatorExample() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box bg={colors.background} pb={40}>

        {/* Stats bar with vertical separators */}
        <Box bg={colors.surface} borderBottomWidth={1} borderColor={colors.border} px={20} py={16}>
          <Row justify="space-around" align="center" h={52}>
            <Col align="center" gap={2}>
              <CoreText fontSize={22} fontWeight="700" color={colors.textPrimary}>{CONTACTS.length}</CoreText>
              <CoreText fontSize={11} color={colors.textSecondary}>Contacts</CoreText>
            </Col>
            <Separator orientation="vertical" color={colors.border} />
            <Col align="center" gap={2}>
              <CoreText fontSize={22} fontWeight="700" color={colors.success}>
                {CONTACTS.filter((c) => c.online).length}
              </CoreText>
              <CoreText fontSize={11} color={colors.textSecondary}>Online</CoreText>
            </Col>
            <Separator orientation="vertical" color={colors.border} />
            <Col align="center" gap={2}>
              <CoreText fontSize={22} fontWeight="700" color={colors.textDisabled}>
                {CONTACTS.filter((c) => !c.online).length}
              </CoreText>
              <CoreText fontSize={11} color={colors.textSecondary}>Away</CoreText>
            </Col>
          </Row>
        </Box>

        {/* Online now */}
        <Box px={16} mt={20} gap={10}>
          <CoreText fontSize={14} fontWeight="600" color={colors.textPrimary}>Online now</CoreText>
          <Row gap={16} align="center">
            {CONTACTS.filter((c) => c.online).map((c) => (
              <Col key={c.id} align="center" gap={4}>
                <Box w={52} h={52} rounded={26} bg={getAvatarColor(c.name)} align="center" justify="center" borderWidth={2} borderColor={colors.success}>
                  <CoreText fontSize={17} fontWeight="700" color={colors.textInverse}>{getInitials(c.name)}</CoreText>
                </Box>
                <CoreText fontSize={11} color={colors.textSecondary}>{c.name.split(' ')[0]}</CoreText>
              </Col>
            ))}
          </Row>
        </Box>

        {/* Dashed section divider */}
        <Box px={16} mt={24}>
          <Row align="center" gap={10}>
            <Box flex={1}>
              <Separator color={colors.border} variant="dashed" />
            </Box>
            <CoreText fontSize={11} fontWeight="600" color={colors.textSecondary} transform="uppercase" letterSpacing={0.8}>
              All contacts
            </CoreText>
            <Box flex={1}>
              <Separator color={colors.border} variant="dashed" />
            </Box>
          </Row>
        </Box>

        {/* Alphabetical grouped list */}
        <Box px={16} mt={16} gap={12}>
          {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([letter, contacts]) => (
            <Box key={letter}>
              <Row align="center" gap={10} mb={8}>
                <CoreText fontSize={13} fontWeight="700" color={colors.primary}>{letter}</CoreText>
                <Box flex={1}>
                  <Separator color={colors.border} variant="solid" />
                </Box>
              </Row>

              <Box bg={colors.surface} rounded={14} borderWidth={1} borderColor={colors.border} overflow="hidden">
                {contacts.map((contact, i) => (
                  <React.Fragment key={contact.id}>
                    <CorePressable
                      onPress={() => setSelected(contact.id === selected ? null : contact.id)}
                      bg={selected === contact.id ? colors.primaryLight : colors.surface}
                    >
                      <Row align="center" gap={12} px={16} py={13}>
                        <Box w={44} h={44} rounded={22} bg={getAvatarColor(contact.name)} align="center" justify="center">
                          <CoreText fontSize={15} fontWeight="700" color={colors.textInverse}>{getInitials(contact.name)}</CoreText>
                        </Box>
                        <Col flex={1} gap={2}>
                          <CoreText fontSize={14} fontWeight="500" color={colors.textPrimary}>{contact.name}</CoreText>
                          <CoreText fontSize={12} color={colors.textSecondary}>{contact.role}</CoreText>
                        </Col>
                        <Row align="center" gap={8}>
                          <Box w={8} h={8} rounded={4} bg={contact.online ? colors.success : colors.textDisabled} />
                          <CoreText fontSize={16} color={colors.textDisabled}>›</CoreText>
                        </Row>
                      </Row>

                      {selected === contact.id && (
                        <Box px={16} pb={14}>
                          <Separator color={colors.border} variant="dotted" />
                          <Row mt={10} gap={10}>
                            <CorePressable flex={1} bg={colors.primary} rounded={8} py={8} align="center">
                              <CoreText fontSize={12} fontWeight="600" color={colors.textInverse}>Message</CoreText>
                            </CorePressable>
                            <CorePressable flex={1} bg={colors.surfaceAlt} rounded={8} py={8} align="center" borderWidth={1} borderColor={colors.border}>
                              <CoreText fontSize={12} fontWeight="600" color={colors.textPrimary}>Call</CoreText>
                            </CorePressable>
                          </Row>
                        </Box>
                      )}
                    </CorePressable>
                    {i < contacts.length - 1 && <Separator color={colors.border} />}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Separator style reference */}
        <Box mx={16} mt={28} bg={colors.surface} rounded={14} p={16} borderWidth={1} borderColor={colors.border} gap={12}>
          <CoreText fontSize={12} fontWeight="600" color={colors.textSecondary} transform="uppercase" letterSpacing={0.8}>
            Separator variants
          </CoreText>
          {(['solid', 'dashed', 'dotted'] as const).map((v) => (
            <Row key={v} align="center" gap={12}>
              <CoreText fontSize={12} color={colors.textDisabled} style={{ width: 48 }}>{v}</CoreText>
              <Box flex={1}>
                <Separator color={colors.borderStrong} variant={v} />
              </Box>
            </Row>
          ))}
          <Separator color={colors.border} />
          <CoreText fontSize={12} fontWeight="600" color={colors.textSecondary} transform="uppercase" letterSpacing={0.8}>
            Thickness
          </CoreText>
          {[1, 2, 3].map((t) => (
            <Row key={t} align="center" gap={12}>
              <CoreText fontSize={12} color={colors.textDisabled} style={{ width: 48 }}>{t}px</CoreText>
              <Box flex={1}>
                <Separator color={colors.primary} thickness={t} />
              </Box>
            </Row>
          ))}
        </Box>

      </Box>
    </ScrollView>
  );
}
