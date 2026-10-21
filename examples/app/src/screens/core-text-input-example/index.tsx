import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import {
  Box, Col, Row, CoreText, CoreTextInput, CorePressable, Separator,
} from '@88khp/vajra-ui-core';
import { colors } from '../../colors';
import { MAX_BIO } from './data';

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <Row align="center" gap={4}>
      <CoreText fontSize={12} fontWeight="600" color={colors.textSecondary}>{label}</CoreText>
      {required && <CoreText fontSize={12} fontWeight="600" color={colors.error}>*</CoreText>}
    </Row>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <Row align="center" gap={4} mt={4}>
      <CoreText fontSize={11} color={colors.error}>⚠ {message}</CoreText>
    </Row>
  );
}

export function CoreTextInputExample() {
  const [focused, setFocused] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [bio, setBio] = useState('');
  const [search, setSearch] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailInvalid = submitted && email.length > 0 && !email.includes('@');
  const passwordShort = submitted && password.length > 0 && password.length < 8;
  const passwordMismatch = submitted && confirm.length > 0 && confirm !== password;
  const nameEmpty = submitted && name.trim().length === 0;

  function borderColor(field: string, hasError = false) {
    if (hasError) return colors.error;
    if (focused === field) return colors.primary;
    return colors.border;
  }

  function bgColor(hasError = false) {
    if (hasError) return colors.errorLight;
    return colors.surfaceAlt;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Box bg={colors.background} pb={48}>

          {/* Header */}
          <Box bg={colors.surface} px={20} pt={24} pb={20} borderBottomWidth={1} borderColor={colors.border}>
            <CoreText fontSize={24} fontWeight="700" color={colors.textPrimary}>Create account</CoreText>
            <CoreText fontSize={14} color={colors.textSecondary} lineHeight={20} style={{ marginTop: 4 }}>
              Fill in the details below to get started.
            </CoreText>
          </Box>

          {/* Search bar */}
          <Box px={16} mt={20}>
            <Row
              align="center"
              bg={colors.surface}
              rounded={12}
              px={14}
              borderWidth={1}
              borderColor={focused === 'search' ? colors.primary : colors.border}
            >
              <CoreText fontSize={16}>🔍</CoreText>
              <CoreTextInput
                flex={1}
                value={search}
                onChangeText={setSearch}
                placeholder="Search users…"
                placeholderColor={colors.textDisabled}
                py={12}
                pl={10}
                fontSize={14}
                color={colors.textPrimary}
                bg={colors.transparent}
                onFocus={() => setFocused('search')}
                onBlur={() => setFocused(null)}
              />
              {search.length > 0 && (
                <CorePressable onPress={() => setSearch('')}>
                  <CoreText fontSize={16} color={colors.textDisabled}>✕</CoreText>
                </CorePressable>
              )}
            </Row>
          </Box>

          {/* Profile section */}
          <Box mx={16} mt={20} bg={colors.surface} rounded={14} p={16} borderWidth={1} borderColor={colors.border} gap={16}>
            <CoreText fontSize={15} fontWeight="700" color={colors.textPrimary}>Profile info</CoreText>
            <Separator color={colors.border} />

            <Col gap={6}>
              <FieldLabel label="Full name" required />
              <CoreTextInput
                value={name}
                onChangeText={setName}
                placeholder="Rishav Jha"
                placeholderColor={colors.textDisabled}
                p={12}
                rounded={10}
                borderWidth={1}
                borderColor={borderColor('name', nameEmpty)}
                bg={bgColor(nameEmpty)}
                fontSize={14}
                color={colors.textPrimary}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
              {nameEmpty && <FieldError message="Full name is required." />}
            </Col>

            <Col gap={6}>
              <FieldLabel label="Username" required />
              <Row
                align="center"
                rounded={10}
                borderWidth={1}
                borderColor={borderColor('username')}
                bg={colors.surfaceAlt}
                overflow="hidden"
              >
                <Box px={12} py={12} bg={colors.border}>
                  <CoreText fontSize={14} fontWeight="600" color={colors.textSecondary}>@</CoreText>
                </Box>
                <CoreTextInput
                  flex={1}
                  value={username}
                  onChangeText={(t) => setUsername(t.toLowerCase().replace(/\s/g, ''))}
                  placeholder="rishav_jha"
                  placeholderColor={colors.textDisabled}
                  px={12}
                  py={12}
                  fontSize={14}
                  color={colors.textPrimary}
                  bg={colors.transparent}
                  autoCapitalize="none"
                  onFocus={() => setFocused('username')}
                  onBlur={() => setFocused(null)}
                />
              </Row>
            </Col>

            <Col gap={6}>
              <Row align="center" justify="space-between">
                <FieldLabel label="Bio" />
                <CoreText fontSize={11} color={bio.length > MAX_BIO ? colors.error : colors.textDisabled}>
                  {bio.length}/{MAX_BIO}
                </CoreText>
              </Row>
              <CoreTextInput
                value={bio}
                onChangeText={(t) => setBio(t.slice(0, MAX_BIO))}
                placeholder="Tell the world a little about yourself…"
                placeholderColor={colors.textDisabled}
                multiline
                numberOfLines={4}
                p={12}
                rounded={10}
                borderWidth={1}
                borderColor={borderColor('bio')}
                bg={colors.surfaceAlt}
                fontSize={14}
                color={colors.textPrimary}
                h={100}
                onFocus={() => setFocused('bio')}
                onBlur={() => setFocused(null)}
              />
            </Col>
          </Box>

          {/* Account section */}
          <Box mx={16} mt={16} bg={colors.surface} rounded={14} p={16} borderWidth={1} borderColor={colors.border} gap={16}>
            <CoreText fontSize={15} fontWeight="700" color={colors.textPrimary}>Account credentials</CoreText>
            <Separator color={colors.border} />

            <Col gap={6}>
              <FieldLabel label="Email address" required />
              <CoreTextInput
                value={email}
                onChangeText={setEmail}
                placeholder="hello@example.com"
                placeholderColor={colors.textDisabled}
                keyboardType="email-address"
                autoCapitalize="none"
                p={12}
                rounded={10}
                borderWidth={1}
                borderColor={borderColor('email', emailInvalid)}
                bg={bgColor(emailInvalid)}
                fontSize={14}
                color={colors.textPrimary}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
              {emailInvalid && <FieldError message="Enter a valid email address." />}
            </Col>

            <Col gap={6}>
              <FieldLabel label="Password" required />
              <Row
                align="center"
                rounded={10}
                borderWidth={1}
                borderColor={borderColor('password', passwordShort)}
                bg={bgColor(passwordShort)}
                overflow="hidden"
              >
                <CoreTextInput
                  flex={1}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Min. 8 characters"
                  placeholderColor={colors.textDisabled}
                  secureTextEntry={!showPassword}
                  px={12}
                  py={12}
                  fontSize={14}
                  color={colors.textPrimary}
                  bg={colors.transparent}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                />
                <CorePressable onPress={() => setShowPassword((s) => !s)} px={12}>
                  <CoreText fontSize={16}>{showPassword ? '🙈' : '👁️'}</CoreText>
                </CorePressable>
              </Row>
              {passwordShort && <FieldError message="Password must be at least 8 characters." />}
            </Col>

            <Col gap={6}>
              <FieldLabel label="Confirm password" required />
              <CoreTextInput
                value={confirm}
                onChangeText={setConfirm}
                placeholder="Repeat your password"
                placeholderColor={colors.textDisabled}
                secureTextEntry
                p={12}
                rounded={10}
                borderWidth={1}
                borderColor={borderColor('confirm', passwordMismatch)}
                bg={bgColor(passwordMismatch)}
                fontSize={14}
                color={colors.textPrimary}
                onFocus={() => setFocused('confirm')}
                onBlur={() => setFocused(null)}
              />
              {passwordMismatch && <FieldError message="Passwords do not match." />}
            </Col>
          </Box>

          {/* Submit */}
          <Box px={16} mt={20} gap={10}>
            <CorePressable onPress={() => setSubmitted(true)} bg={colors.primary} rounded={12} py={15} align="center">
              <CoreText fontSize={15} fontWeight="700" color={colors.textInverse}>Create account</CoreText>
            </CorePressable>
            <CorePressable align="center" py={8}>
              <Row align="center" gap={4}>
                <CoreText fontSize={14} color={colors.textSecondary}>Already have an account?</CoreText>
                <CoreText fontSize={14} fontWeight="600" color={colors.primary}>Sign in</CoreText>
              </Row>
            </CorePressable>
          </Box>

        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
