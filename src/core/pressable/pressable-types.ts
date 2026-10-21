import { PressableProps, ViewStyle } from 'react-native';

import { TBoxProps } from '../box/box-types';

export type TCorePressableProps = Omit<PressableProps, 'style'> &
  Omit<TBoxProps, keyof PressableProps> & {
    style?: ViewStyle | ViewStyle[];
    opacity?: number;
    /** Opacity while pressed. Defaults to 0.2; pass 1 to turn press feedback off. */
    activeOpacity?: number;
  };
