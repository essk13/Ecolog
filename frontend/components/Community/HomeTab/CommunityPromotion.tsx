import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Button, Card, Title} from 'react-native-paper';
const styles = StyleSheet.create({
  Container: {
    flexGrow: 0,
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  CardContainer: {
    flexGrow: 0,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
  },
});

const PromListItem = ({prom}: any) => {
  return (
    <Card style={styles.CardContainer}>
      <Card.Cover
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-C1FL7xV2Rka1wtiAck-IYVmP9o1pRRdB45S2rGP-WnRDvEY_SMM1ZuiCRjkNkTFCEw&usqp=CAU',
        }}
      />
      <Card.Content>
        <Title>{prom}</Title>
      </Card.Content>
      <Card.Actions>
        <Button>상세 보기</Button>
      </Card.Actions>
    </Card>
  );
};

function CommunityPromotion() {
  return (
    <ScrollView style={styles.Container}>
      <PromListItem prom="4차 플로깅 모집" />
      <PromListItem prom="2차 플로깅 모집" />
      <PromListItem prom="1차 플로깅 모집" />
      <PromListItem prom="6차 플로깅 모집" />
    </ScrollView>
  );
}

export default CommunityPromotion;
