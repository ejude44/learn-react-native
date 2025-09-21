import { Dimensions } from 'react-native';

export function useDimensions() {
  const dimensions = Dimensions.get('window');
  return {
    deviceWidth: dimensions.width,
    deviceHeight: dimensions.height,
    deviceScale: dimensions.scale,
    deviceFontScale: dimensions.fontScale,
  };
}
