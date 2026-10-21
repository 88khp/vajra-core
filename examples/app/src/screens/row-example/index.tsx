import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Box,
  Row,
  Col,
  CoreText,
  CorePressable,
  Separator,
  Spacer,
} from '@88khp/vajra-ui-core';
import { colors } from '../../colors';
import { POSTS, SKILLS } from './data';

function Avatar({
  size = 40,
  initials = 'RJ',
}: {
  size?: number;
  initials?: string;
}) {
  return (
    <Box
      w={size}
      h={size}
      rounded={size / 2}
      bg={colors.primary}
      align="center"
      justify="center"
    >
      <CoreText
        fontSize={size * 0.35}
        fontWeight="700"
        color={colors.textInverse}
      >
        {initials}
      </CoreText>
    </Box>
  );
}

export function RowExample() {
  const [following, setFollowing] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box bg={colors.background} pb={32}>
        {/* Profile header */}
        <Box
          bg={colors.surface}
          px={20}
          pt={24}
          pb={20}
          borderBottomWidth={1}
          borderColor={colors.border}
        >
          <Row align="flex-start" gap={16}>
            <Avatar size={72} initials="RJ" />
            <Col flex={1} gap={4}>
              <Row align="center" gap={8}>
                <CoreText
                  fontSize={18}
                  fontWeight="700"
                  color={colors.textPrimary}
                >
                  Rishav Jha
                </CoreText>
                <Box bg={colors.primaryLight} px={8} py={2} rounded={20}>
                  <CoreText
                    fontSize={11}
                    fontWeight="600"
                    color={colors.primary}
                  >
                    Pro
                  </CoreText>
                </Box>
              </Row>
              <CoreText
                fontSize={13}
                color={colors.textSecondary}
                lineHeight={18}
              >
                Software engineer · Open source · Building @vajra-ui
              </CoreText>
              <CoreText fontSize={12} color={colors.textSecondary}>
                📍 Bengaluru, India
              </CoreText>
            </Col>
          </Row>

          {/* Stats row */}
          <Box mt={20} bg={colors.surfaceAlt} rounded={12} py={14} px={8}>
            <Row justify="space-around">
              {[
                ['312', 'Posts'],
                ['14.2k', 'Followers'],
                ['891', 'Following'],
              ].map(([val, label]) => (
                <Col key={label} align="center" gap={2}>
                  <CoreText
                    fontSize={18}
                    fontWeight="700"
                    color={colors.textPrimary}
                  >
                    {val}
                  </CoreText>
                  <CoreText fontSize={11} color={colors.textSecondary}>
                    {label}
                  </CoreText>
                </Col>
              ))}
            </Row>
          </Box>

          {/* Action buttons */}
          <Row mt={16} gap={10}>
            <CorePressable
              flex={1}
              onPress={() => setFollowing(f => !f)}
              bg={following ? colors.surface : colors.primary}
              borderWidth={following ? 1.5 : 0}
              borderColor={colors.primary}
              rounded={10}
              py={10}
              align="center"
            >
              <CoreText
                fontSize={14}
                fontWeight="600"
                color={following ? colors.primary : colors.textInverse}
              >
                {following ? 'Following' : 'Follow'}
              </CoreText>
            </CorePressable>
            <CorePressable
              flex={1}
              bg={colors.surface}
              borderWidth={1}
              borderColor={colors.border}
              rounded={10}
              py={10}
              align="center"
            >
              <CoreText
                fontSize={14}
                fontWeight="600"
                color={colors.textPrimary}
              >
                Message
              </CoreText>
            </CorePressable>
            <CorePressable
              w={44}
              bg={colors.surface}
              borderWidth={1}
              borderColor={colors.border}
              rounded={10}
              align="center"
              justify="center"
            >
              <CoreText fontSize={16}>···</CoreText>
            </CorePressable>
          </Row>
        </Box>

        {/* Skills */}
        <Box px={16} mt={20} gap={10}>
          <CoreText fontSize={14} fontWeight="600" color={colors.textPrimary}>
            Skills
          </CoreText>
          <Row gap={8} wrap="wrap">
            {SKILLS.map(skill => (
              <Box
                key={skill}
                px={12}
                py={6}
                bg={colors.surface}
                rounded={20}
                borderWidth={1}
                borderColor={colors.border}
              >
                <CoreText
                  fontSize={12}
                  fontWeight="500"
                  color={colors.textSecondary}
                >
                  {skill}
                </CoreText>
              </Box>
            ))}
          </Row>
        </Box>

        {/* Posts feed */}
        <Box px={16} mt={24} gap={4}>
          <CoreText fontSize={14} fontWeight="600" color={colors.textPrimary}>
            Recent posts
          </CoreText>
        </Box>

        <Col mt={12} gap={12} px={16}>
          {POSTS.map(post => (
            <Box
              key={post.id}
              bg={colors.surface}
              rounded={14}
              borderWidth={1}
              borderColor={colors.border}
              overflow="hidden"
            >
              <Row align="center" gap={10} px={14} py={12}>
                <Avatar size={36} initials="RJ" />
                <Col flex={1} gap={1}>
                  <CoreText
                    fontSize={13}
                    fontWeight="600"
                    color={colors.textPrimary}
                  >
                    Rishav Jha
                  </CoreText>
                  <CoreText fontSize={11} color={colors.textSecondary}>
                    2 days ago
                  </CoreText>
                </Col>
                <CoreText fontSize={18} color={colors.textDisabled}>
                  ···
                </CoreText>
              </Row>

              <Separator color={colors.border} />

              <Box
                h={120}
                bg={colors.surfaceAlt}
                align="center"
                justify="center"
              >
                <CoreText fontSize={52}>{post.emoji}</CoreText>
              </Box>

              <Box px={14} pt={10} pb={4}>
                <CoreText
                  fontSize={13}
                  color={colors.textPrimary}
                  lineHeight={19}
                >
                  {post.caption}
                </CoreText>
              </Box>

              <Spacer h={10} />
              <Separator color={colors.border} />

              <Row align="center" justify="space-between" px={14} py={10}>
                <CorePressable
                  onPress={() =>
                    setLiked(l => ({ ...l, [post.id]: !l[post.id] }))
                  }
                >
                  <Row align="center" gap={6}>
                    <CoreText fontSize={16}>
                      {liked[post.id] ? '❤️' : '🤍'}
                    </CoreText>
                    <CoreText fontSize={13} color={colors.textSecondary}>
                      {liked[post.id] ? post.likes + 1 : post.likes}
                    </CoreText>
                  </Row>
                </CorePressable>
                <Row align="center" gap={6}>
                  <CoreText fontSize={16}>💬</CoreText>
                  <CoreText fontSize={13} color={colors.textSecondary}>
                    {post.comments}
                  </CoreText>
                </Row>
                <Row align="center" gap={6}>
                  <CoreText fontSize={16}>📤</CoreText>
                  <CoreText fontSize={13} color={colors.textSecondary}>
                    Share
                  </CoreText>
                </Row>
              </Row>
            </Box>
          ))}
        </Col>
      </Box>
    </ScrollView>
  );
}
