// screens/DownloadScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import RNFS from 'react-native-fs';

const DownloadScreen = ({ route, navigation }) => {
  const { url } = route.params;

  useEffect(() => {
    const downloadMusic = async () => {
      const filePath = `${RNFS.DocumentDirectoryPath}/music.mp3`;
      try {
        const result = await RNFS.downloadFile({
          fromUrl: url,
          toFile: filePath,
        }).promise;
        if (result.statusCode === 200) {
          console.log('File downloaded successfully', filePath);
        } else {
          console.log('Failed to download file');
        }
      } catch (error) {
        console.error(error);
      }
    };

    downloadMusic();
  }, [url]);

  return (
    <View style={styles.container}>
      <Text>Downloading: {url}</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default DownloadScreen;
