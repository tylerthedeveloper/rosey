import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../../assets/app-icon.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 170,
    height: 170,
    marginBottom: 12,
    // opacity: .8,
    borderRadius: 170 / 2,
    // borderWidth: 1,
    overflow: 'hidden'
  },
});

export default memo(Logo);
