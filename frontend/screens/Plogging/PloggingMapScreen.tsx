import React, {useEffect, useState} from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import {
  launchCamera,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiaGF1bCIsImEiOiJjbDI5cTV2NzMwMW9kM2JvYjF0c29sb2hkIn0.jcIu6fuVVbuJPVGaunycOw',
);

// 위치 권한 설정
// async function requestPermissions() {
//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Yes');
//     }
// };

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    width: 60,
    backgroundColor: 'transparent',
    height: 70,
  },
  map: {
    flex: 1,
  },
  recordContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    height: '30%',
    bottom: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 20,
  },
});

const fontStyles = (size?: number, weight?: any, align?: any, color?: any) =>
  StyleSheet.create({
    textStyle: {
      fontSize: size || 15,
      fontWeight: weight || 'normal',
      color: color || '#000000',
      textAlign: align || 'auto',
    },
  });

const imagePickerOption: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  // includeBase64: Platform.OS === 'android',
};

function PloggingMapScreen({navigation}: any) {
  // 사용자 위치 트래킹 정보
  const [coordinates, setCoordinates] = useState([128, 36]);
  const [route, setRoute] = useState<{
    type: string;
    features: {
      type: string;
      properties: {};
      geometry: {
        type: string;
        coordinates: number[][];
      };
    }[];
  }>({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [],
        },
      },
    ],
  });

  // 타이머
  const [count, setCount] = useState<number>(0);
  const [currentHours, setHours] = useState<number>(0);
  const [currentMinutes, setMinutes] = useState<number>(0);
  const [currentSeconds, setSecons] = useState<number>(0);

  function timer() {
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
    const seconds = count % 60;
    setHours(hours);
    setMinutes(minutes);
    setSecons(seconds);
  }
  // 타이머 표시 형식
  useEffect(() => {
    timer();
  }, [count]);
  // 타이머 시작
  useEffect(() => {
    setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  }, []);

  // 거리 및 칼로리
  const [currentDistance, setDistance] = useState<number>(0.0);
  const [currentKcal, setKcal] = useState<number>(0);

  function getDistance(lo1: number, la1: number, lo2: number, la2: number) {
    function deg2rad(deg: number) {
      return deg * (Math.PI / 180);
    }

    const radius = 6371;
    const dLat = deg2rad(la2 - la1);
    const dLon = deg2rad(lo2 - lo1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(la1)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = radius * c;
    return d;
  }

  useEffect(() => {
    console.log('cal');
    if (route.features[0].geometry.coordinates.length > 1) {
      const newPosition =
        route.features[0].geometry.coordinates[
          route.features[0].geometry.coordinates.length - 1
        ];
      const prePosition =
        route.features[0].geometry.coordinates[
          route.features[0].geometry.coordinates.length - 2
        ];
      const distance = getDistance(
        prePosition[0],
        prePosition[1],
        newPosition[0],
        newPosition[1],
      );
      function round(num: number) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return (Math.round(m) / 100) * Math.sign(num);
      }
      console.log(round(distance));
      setDistance(d => d + round(distance));
    }
  }, [coordinates]);

  // 위치 감지
  useEffect(() => {
    updateLocation();
  }, []);

  // Set && Update Location (GPS)
  const updateLocation = () => {
    console.log('request');
    Geolocation.watchPosition(
      position => {
        // See My Location
        setCoordinates([position.coords.longitude, position.coords.latitude]);
        const newRoute = route;
        // Route가 없는 경우
        if (route.features[0].geometry.coordinates.length === 0) {
          newRoute.features[0].geometry.coordinates.push([
            position.coords.longitude,
            position.coords.latitude,
          ]);
          setRoute(newRoute);
          console.log(route.features[0].geometry.coordinates);
        }
        // Route 가 존재하는 경우
        else {
          const lastPostion =
            route.features[0].geometry.coordinates[
              route.features[0].geometry.coordinates.length - 1
            ];
          if (
            lastPostion[0] !== position.coords.longitude &&
            lastPostion[1] !== position.coords.latitude
          ) {
            newRoute.features[0].geometry.coordinates.push([
              position.coords.longitude,
              position.coords.latitude,
            ]);
            setRoute(newRoute);
            console.log(route.features[0].geometry.coordinates);
          }
        }
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, interval: 1000, distanceFilter: 5},
    );
  };

  const onPickImage = (res: ImagePickerResponse) => {
    if (res.didCancel || !res) {
      return;
    }
    console.log(res);
    navigation.navigate('PloggingResult', {res});
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} localizeLabels={true}>
          <MapboxGL.Camera zoomLevel={17} centerCoordinate={coordinates} />
          <MapboxGL.ShapeSource id="line" shape={route}>
            <MapboxGL.LineLayer
              id="linelayer"
              style={{
                lineColor: 'red',
                lineWidth: 5,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
          </MapboxGL.ShapeSource>
          <MapboxGL.PointAnnotation
            id={'myPosition'}
            coordinate={coordinates}
          />
        </MapboxGL.MapView>

        <View style={styles.recordContainer}>
          <TouchableHighlight
            onPress={() => onLaunchCamera()}
            underlayColor="red">
            <Text style={fontStyles(20, '500', null, '#FFFFFF').textStyle}>
              FINISH
            </Text>
          </TouchableHighlight>

          {/* 타이머 */}
          <View style={styles.itemContainer}>
            <Text style={fontStyles(45, '600', null, '#FFFFFF').textStyle}>
              {currentHours < 10 ? `0${currentHours}` : currentHours}
            </Text>
            <Text style={fontStyles(25, '500', null, '#FFFFFF').textStyle}>
              시간{'  '}
            </Text>

            <Text style={fontStyles(45, '600', null, '#FFFFFF').textStyle}>
              {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}
            </Text>
            <Text style={fontStyles(25, '500', null, '#FFFFFF').textStyle}>
              분{'  '}
            </Text>

            <Text style={fontStyles(45, '600', null, '#FFFFFF').textStyle}>
              {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
            </Text>
            <Text style={fontStyles(25, '500', null, '#FFFFFF').textStyle}>
              초{'  '}
            </Text>
          </View>

          {/* 거리 및 칼로리 */}
          <View style={styles.itemContainer}>
            <View>
              <Text style={fontStyles(15, '500', null, '#FFFFFF').textStyle}>
                이동 거리
              </Text>
              <Text style={fontStyles(25, '500', null, '#FFFFFF').textStyle}>
                {currentDistance} km
              </Text>
            </View>
            <View style={{marginLeft: 50}}>
              <Text style={fontStyles(15, '500', null, '#FFFFFF').textStyle}>
                칼로리
              </Text>
              <Text style={fontStyles(25, '500', null, '#FFFFFF').textStyle}>
                15 kcal
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PloggingMapScreen;
