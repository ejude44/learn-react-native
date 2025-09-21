import { Pressable, Text, View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import Colors from '../../utils/colors';

interface Props {
  children: ReactNode;
  icon?: ReactNode;
  onPress?: () => void;
}

function PrimaryButton({ children, icon, onPress }: Props) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.buttonInnerContainer]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>{children}</Text>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </View>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 23,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 20,
    elevation: 2,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    includeFontPadding: false,
    flex: 1,
  },
  pressed: {
    opacity: 0.75,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
