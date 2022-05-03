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
});

const imagePickerOption: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  // includeBase64: Platform.OS === 'android',
};

function PloggingMapScreen({navigation}: any) {
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
          <MapboxGL.Camera zoomLevel={16} centerCoordinate={coordinates} />
          <MapboxGL.PointAnnotation
            id={'myPosition'}
            coordinate={coordinates}
          />
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
        </MapboxGL.MapView>
        <TouchableHighlight
          onPress={() => onLaunchCamera()}
          underlayColor="red">
          <Text>Go to Result</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default PloggingMapScreen;
