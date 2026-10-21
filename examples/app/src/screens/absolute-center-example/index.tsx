import React, { useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import {
  Box, AbsoluteCenter, Col, Row, CoreText, CorePressable, Separator,
} from '@88khp/vajra-ui-core';
import { colors } from '../../colors';
import { TRACKS } from './data';

export function AbsoluteCenterExample() {
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(TRACKS[0]);
  const [liked, setLiked] = useState(false);

  function handlePlay() {
    setBuffering(true);
    setTimeout(() => {
      setBuffering(false);
      setPlaying((p) => !p);
    }, 1200);
  }

  function selectTrack(track: typeof TRACKS[0]) {
    setCurrentTrack(track);
    setPlaying(false);
    setBuffering(true);
    setTimeout(() => setBuffering(false), 800);
  }

  const listenerColors = {
    primary: colors.primary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  };

  const LISTENERS = [
    { initials: 'AK', notif: 2, color: listenerColors.primary },
    { initials: 'MS', notif: 0, color: listenerColors.success },
    { initials: 'PQ', notif: 5, color: listenerColors.warning },
    { initials: 'LR', notif: 1, color: listenerColors.error },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box bg={colors.background} pb={40}>

        {/* Now Playing card */}
        <Box mx={16} mt={20} h={260} rounded={20} bg={colors.primary} overflow="hidden">
          <Box position="absolute" top={0} bottom={0} left={0} right={0} align="center" justify="center">
            <CoreText fontSize={140} style={{ opacity: 0.15 }}>{currentTrack.emoji}</CoreText>
          </Box>

          <Row align="center" justify="space-between" px={16} pt={16}>
            <Box bg={colors.overlayWhiteLight} px={10} py={4} rounded={20}>
              <Row align="center" gap={6}>
                <Box w={6} h={6} rounded={3} bg={playing ? colors.successLight : colors.textDisabled} />
                <CoreText fontSize={11} fontWeight="600" color={colors.textInverse}>
                  {playing ? 'Now Playing' : 'Paused'}
                </CoreText>
              </Row>
            </Box>
            <CorePressable onPress={() => setLiked((l) => !l)}>
              <CoreText fontSize={22}>{liked ? '❤️' : '🤍'}</CoreText>
            </CorePressable>
          </Row>

          <AbsoluteCenter>
            <CorePressable
              onPress={handlePlay}
              w={72} h={72} rounded={36}
              bg={colors.overlayWhiteLight}
              align="center" justify="center"
            >
              {buffering
                ? <ActivityIndicator color={colors.textInverse} size="large" />
                : <CoreText fontSize={28}>{playing ? '⏸' : '▶️'}</CoreText>}
            </CorePressable>
          </AbsoluteCenter>

          <Box position="absolute" bottom={0} left={0} right={0} bg={colors.overlayDark} px={16} py={14}>
            <CoreText fontSize={17} fontWeight="700" color={colors.textInverse}>{currentTrack.title}</CoreText>
            <CoreText fontSize={13} color={colors.overlayWhiteMid}>{currentTrack.artist}</CoreText>
          </Box>
        </Box>

        {/* Progress bar */}
        <Box px={16} mt={16} gap={6}>
          <Box h={4} bg={colors.surfaceAlt} rounded={2}>
            <Box h={4} rounded={2} bg={colors.primary} style={{ width: playing ? '38%' : '0%' }} />
          </Box>
          <Row justify="space-between">
            <CoreText fontSize={11} color={colors.textDisabled}>{playing ? '1:25' : '0:00'}</CoreText>
            <CoreText fontSize={11} color={colors.textDisabled}>{currentTrack.duration}</CoreText>
          </Row>
        </Box>

        {/* Controls */}
        <Row px={24} mt={8} justify="space-between" align="center">
          <CorePressable><CoreText fontSize={22}>🔀</CoreText></CorePressable>
          <CorePressable><CoreText fontSize={30}>⏮</CoreText></CorePressable>
          <CorePressable
            onPress={handlePlay}
            w={60} h={60} rounded={30}
            bg={colors.primary}
            align="center" justify="center"
          >
            {buffering
              ? <ActivityIndicator color={colors.textInverse} />
              : <CoreText fontSize={24}>{playing ? '⏸' : '▶️'}</CoreText>}
          </CorePressable>
          <CorePressable><CoreText fontSize={30}>⏭</CoreText></CorePressable>
          <CorePressable><CoreText fontSize={22}>🔁</CoreText></CorePressable>
        </Row>

        {/* Listeners online */}
        <Box px={16} mt={28} gap={10}>
          <CoreText fontSize={14} fontWeight="600" color={colors.textPrimary}>Listeners online</CoreText>
          <Row gap={20} align="center">
            {LISTENERS.map((u) => (
              <Box key={u.initials} align="flex-start">
                <Box w={48} h={48} rounded={24} bg={u.color} align="center" justify="center">
                  <CoreText fontSize={16} fontWeight="700" color={colors.textInverse}>{u.initials}</CoreText>
                </Box>
                {u.notif > 0 && (
                  <AbsoluteCenter>
                    <Box position="absolute" top={0} right={0}>
                      <Box
                        w={18} h={18} rounded={9}
                        bg={colors.error}
                        borderWidth={2}
                        borderColor={colors.background}
                        align="center" justify="center"
                      >
                        <CoreText fontSize={9} fontWeight="700" color={colors.textInverse}>{u.notif}</CoreText>
                      </Box>
                    </Box>
                  </AbsoluteCenter>
                )}
              </Box>
            ))}
          </Row>
        </Box>

        {/* Queue */}
        <Box px={16} mt={28} gap={10}>
          <CoreText fontSize={14} fontWeight="600" color={colors.textPrimary}>Queue</CoreText>
          <Box bg={colors.surface} rounded={14} borderWidth={1} borderColor={colors.border} overflow="hidden">
            {TRACKS.map((track, i) => (
              <React.Fragment key={track.id}>
                <CorePressable onPress={() => selectTrack(track)} bg={currentTrack.id === track.id ? colors.primaryLight : colors.surface}>
                  <Row align="center" gap={12} px={16} py={13}>
                    <Box w={44} h={44} rounded={10} bg={colors.surfaceAlt} align="center" justify="center">
                      <CoreText fontSize={20}>{track.emoji}</CoreText>
                      {currentTrack.id === track.id && playing && (
                        <AbsoluteCenter>
                          <Box position="absolute" bottom={2} right={2} w={10} h={10} rounded={5} bg={colors.success} borderWidth={1.5} borderColor={colors.surface} />
                        </AbsoluteCenter>
                      )}
                    </Box>
                    <Col flex={1} gap={2}>
                      <CoreText fontSize={14} fontWeight={currentTrack.id === track.id ? '700' : '500'} color={currentTrack.id === track.id ? colors.primary : colors.textPrimary}>
                        {track.title}
                      </CoreText>
                      <CoreText fontSize={12} color={colors.textSecondary}>{track.artist}</CoreText>
                    </Col>
                    <CoreText fontSize={12} color={colors.textDisabled}>{track.duration}</CoreText>
                  </Row>
                </CorePressable>
                {i < TRACKS.length - 1 && <Separator color={colors.border} />}
              </React.Fragment>
            ))}
          </Box>
        </Box>

      </Box>
    </ScrollView>
  );
}
