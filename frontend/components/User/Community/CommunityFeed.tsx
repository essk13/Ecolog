import React from 'react';
import {ScrollView, Image, StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    contentContainer: {
      width: '100%',
      minHeight: '80%',
      backgroundColor: '#FFFFFF',
    },
    img: {
      width: '100%',
      aspectRatio: 0.75,
    },
  });

function CommunityFeed() {
  return (
    <ScrollView style={styles().contentContainer}>
      <Image
        style={styles().img}
        source={{
          uri: 'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/dc5b26e4-d16a-4deb-8c88-8e4caeddd900.webp',
        }}
      />
    </ScrollView>
  );
}

export default CommunityFeed;
