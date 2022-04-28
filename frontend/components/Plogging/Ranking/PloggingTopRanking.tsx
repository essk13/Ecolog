import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const styles = (width?: any, height?: any, radious?: number, color?: any) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: '#5FA2E5',
      borderRadius: 10,
      margin: 20,
      padding: 10,
    },
    rankerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingHorizontal: 10,
    },
    img: {
      width: width || 'auto',
      height: height || 'auto',
      borderRadius: radious || 0,
      borderWidth: 5,
      borderColor: color || '#696969',
      marginBottom: 10,
    },
    itemContainer: {
      alignItems: 'center',
    },
  });

const fontStyles = (size?: any, weight?: any, color?: any, align?: any) =>
  StyleSheet.create({
    rankText: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000',
      textAlign: align || 'auto',
    },
  });

interface DataItem {
  rank: number;
  name: string;
}

interface RankData {
  rankData: DataItem[];
}

function PloggingTopRanking(props: RankData) {
  const {rankData} = props;
  return (
    <View style={styles().mainContainer}>
      <Text style={fontStyles(16, '600').rankText}>명예의 전당</Text>
      <View style={styles().rankerContainer}>
        <View style={styles().itemContainer}>
          <Image
            style={styles(70, 70, 100, '#DBDBDB').img}
            source={{
              uri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7f817f4c-133d-470b-b890-62f4582d16c3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220428T042026Z&X-Amz-Expires=86400&X-Amz-Signature=7a0ce3167136bcb06c8107da0bbbe745d754d8176c7357e21cf24565594203b0&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject',
            }}
          />
          <Text style={fontStyles(null, '600').rankText}>
            {rankData[1].rank} {rankData[1].name}
          </Text>
        </View>
        <View style={styles().itemContainer}>
          <Image
            style={styles(80, 80, 100, '#F1DB6A').img}
            source={{
              uri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/662dee2b-a968-4421-be8a-6352dca52fd9/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220428T041452Z&X-Amz-Expires=86400&X-Amz-Signature=597dbff3c646ea874193bcdeaeed13251ef1cecf50a39608bc21aed67c709e95&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject',
            }}
          />
          <Text style={fontStyles(null, '600').rankText}>
            {rankData[0].rank} {rankData[0].name}
          </Text>
        </View>
        <View style={styles().itemContainer}>
          <Image
            style={styles(70, 70, 100, '#D4A590').img}
            source={{
              uri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/cd365821-e161-4e24-b49c-7e295d141a80/F830024B-1412-418F-B2E8-7B345A90ED53.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220428T042050Z&X-Amz-Expires=86400&X-Amz-Signature=3643b464afeae55309bc3e33ec188fe4b145f02829056323063abf52557151b7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22F830024B-1412-418F-B2E8-7B345A90ED53.png%22&x-id=GetObject',
            }}
          />
          <Text style={fontStyles(null, '600').rankText}>
            {rankData[2].rank} {rankData[2].name}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default PloggingTopRanking;
