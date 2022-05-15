import React, {useEffect, useRef, useState} from 'react';
// Hooks
import {useMutation, useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
// Api & Types
import {
  deleteTrashCan,
  getTrashCanList,
  savePlogging,
  saveTrashCan,
  TrashCan,
  TrashCanList,
} from '../../api/plogging';
import {RootState} from '../../modules';
import {ploggingActions} from '../../modules/plogging';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  launchCamera,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
// Components
import {
  Text,
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  BackHandler,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dialog, Portal, Provider, Snackbar} from 'react-native-paper';
import {ActivityIndicator, Colors} from 'react-native-paper';
import TrashCanDetail from '../../components/Plogging/PloggingMap/TrashCanDetail';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiaGF1bCIsImEiOiJjbDI5cTV2NzMwMW9kM2JvYjF0c29sb2hkIn0.jcIu6fuVVbuJPVGaunycOw',
);

const styles = (color?: any) =>
  StyleSheet.create({
    loadingContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 20,
      color: Colors.blueA100,
      marginTop: 10,
    },
    container: {
      height: '100%',
      width: '100%',
      flex: 1,
    },
    markerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
    },
    map: {
      flex: 1,
    },
    markerImage: {
      width: 50,
      height: 50,
    },
    trashCanImage: {
      width: 30,
      height: 30,
    },
    finishBox: {
      position: 'absolute',
      top: -40,
      width: 80,
      height: 80,
      borderRadius: 45,
      elevation: 5,
    },
    finishButton: {
      width: 80,
      height: 80,
      borderRadius: 45,
      justifyContent: 'center',
      alignItems: 'center',
    },
    recordContainer: {
      position: 'absolute',
      alignItems: 'center',
      width: '100%',
      height: '30%',
      bottom: 0,
      padding: 10,
      paddingTop: 30,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginTop: 20,
    },
    dialogContainer: {
      height: 200,
      borderRadius: 20,
      backgroundColor: '#ffffff',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      elevation: 5,
      paddingTop: 10,
    },
    buttonContainer: {
      width: 120,
      height: 50,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      marginHorizontal: 10,
      elevation: 4,
    },
    snackBar: {
      backgroundColor: '#5FA2E5',
      marginBottom: '90%',
    },
    saveTrashCanButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      width: 45,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 22.5,
      backgroundColor: color || '#BBFFD6',
      elevation: 4,
    },
    visibleTrashCanButton: {
      position: 'absolute',
      right: 20,
      bottom: '33%',
      width: 45,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 22.5,
      backgroundColor: color || '#BBFFD6',
      elevation: 4,
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

function PloggingMapScreen({navigation}: any) {
  const [visible, setVisible] = useState<boolean>(false);
  const [backDialog, setBackDialog] = useState<boolean>(false);
  const [finishDialog, setFinishDialog] = useState<boolean>(false);
  // 사용자 위치 트래킹 정보
  const [coordinates, setCoordinates] = useState<number[]>([128, 36]);
  const [centerCoordinates, setCenterCoordinates] = useState<number[]>([
    128, 36,
  ]);
  const [isInit, setIsInit] = useState<Boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(17);
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

  // 거리 계산
  const [currentDistance, setDistance] = useState<number>(0.0);

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

  // 소수점 2째자리 반올림
  function round(num: number) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  useEffect(() => {
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
      setDistance(d => round(d + round(distance)));
    }
  }, [route.features[0].geometry.coordinates.length]);

  useEffect(() => {
    if (isInit) {
      setCenterCoordinates(coordinates);
      const newRoute = route;
      // Route가 없는 경우
      if (route.features[0].geometry.coordinates.length === 0) {
        newRoute.features[0].geometry.coordinates.push(coordinates);
        setRoute(newRoute);
      }
      // Route 가 존재하는 경우
      else {
        const lastPostion =
          route.features[0].geometry.coordinates[
            route.features[0].geometry.coordinates.length - 1
          ];
        if (
          lastPostion[0] !== coordinates[0] &&
          lastPostion[1] !== coordinates[1]
        ) {
          newRoute.features[0].geometry.coordinates.push(coordinates);
          setRoute(newRoute);
        }
      }
    }
  }, [coordinates]);

  // 칼로리 계산
  const [currentKcal, setKcal] = useState<number>(0);

  function calculateKcal(weight: number) {
    const kcal = 4.0 * (3.5 * weight * 0.015) * 5 * currentDistance;
    setKcal(round(kcal));
  }

  useEffect(() => {
    calculateKcal(80);
  }, [currentDistance]);

  // 위치 감지
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setIsInit(true);
        setCoordinates([position.coords.longitude, position.coords.latitude]);
        updateLocation();
      },
      error => {
        console.error(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 10000},
    );
  }, []);

  // Set && Update Location (GPS)
  const updateLocation = () => {
    Geolocation.watchPosition(
      position => {
        // See My Location
        setCoordinates([position.coords.longitude, position.coords.latitude]);
      },
      error => {
        // See error code charts below.
        console.error(error.code, error.message);
      },
      {enableHighAccuracy: true, interval: 3000, distanceFilter: 5},
    );
  };

  // 인증 사진 촬영
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {mutate: save, isLoading} = useMutation(savePlogging, {
    onSuccess: data => {
      queryClient.invalidateQueries('myRank');
      if (user.data) {
        dispatch(ploggingActions.getPloggingListAsync.request(user.data.no));
      }
      navigation.navigate('PloggingResult', {id: data.no});
    },
    onError: error => {
      console.error(error);
    },
  });

  const imagePickerOption: CameraOptions = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  const onPickImage = async (res: ImagePickerResponse) => {
    if (res.didCancel || !res) {
      setCenterCoordinates(coordinates);
      setZoomLevel(17);
      return;
    }
    if (res.assets && res.assets[0].uri) {
      const routeImgUri = await getRouteImgUri();
      let start_date = new Date();
      let end_date = new Date();
      start_date.setSeconds(
        start_date.getSeconds() - count - start_date.getTimezoneOffset() * 60,
      );
      end_date.setSeconds(
        end_date.getSeconds() - end_date.getTimezoneOffset() * 60,
      );
      save({
        ploggingInfo: {
          calories: currentKcal,
          distance: currentDistance,
          started_at: start_date.toISOString().split('.')[0],
          ended_at: end_date.toISOString().split('.')[0],
          time: count,
        },
        resultImgData: res.assets[0],
        routeImgData: {
          fileName: routeImgUri.split('/').pop(),
          type: 'image/jpeg',
          uri: routeImgUri,
        },
      });
    }
  };

  // 플로깅 종료, 지도 스크린샷
  const mapViewRef = useRef();

  const getRouteImgUri = async () => {
    if (mapViewRef.current) {
      try {
        const uri = await mapViewRef.current.takeSnap(true);
        return uri;
      } catch (e: any) {
        console.error(e);
      }
    }
  };

  const getCenterCoordinate = () => {
    let centerCoordinate = {
      longitude: 1,
      latitude: 1,
      zoom: 15,
    };
    const longitude = route.features[0].geometry.coordinates.map(
      coordinate => coordinate[0],
    );
    const latitude = route.features[0].geometry.coordinates.map(
      coordinate => coordinate[1],
    );
    centerCoordinate.longitude =
      (Math.max(...longitude) + Math.min(...longitude)) / 2;
    centerCoordinate.latitude =
      (Math.max(...latitude) + Math.min(...latitude)) / 2;
    setCenterCoordinates(() => [
      centerCoordinate.longitude,
      centerCoordinate.latitude,
    ]);
    setZoomLevel(centerCoordinate.zoom);
    onLaunchCamera();
  };

  async function requestPermissions() {
    setFinishDialog(false);
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCenterCoordinate();
      } else {
        setVisible(true);
      }
    }
  }

  const clickFinish = () => {
    setFinishDialog(true);
  };

  // 뒤로가기 체크
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  const handleBackPress = () => {
    setBackDialog(true);
    return true;
  };

  // 쓰레기통 관리
  const [visibleTrashCan, setVisibleTrashCan] = useState<boolean>(false);
  const [saveTrashCanDialog, setSaveTrashCanDiagle] = useState<boolean>(false);
  const [saveTrashCanSuccess, setSaveTrashCanSuccess] =
    useState<boolean>(false);
  const [deleteTrashCanSuccess, setDeleteTrashCanSuccess] =
    useState<boolean>(false);
  const [visibleTrashDetail, setVisibleTrashDetail] = useState<boolean>(false);
  const [trashDetailData, setTrashDetailData] = useState<TrashCan | null>(null);
  const [trashCanList, setTrashCanList] = useState<TrashCanList>([]);
  const getTrashCan = useMutation(getTrashCanList, {
    onSuccess: data => {
      setTrashCanList(data);
    },
    onError: error => {
      console.error(error);
    },
  });
  const saveTrashCanMutation = useMutation(saveTrashCan, {
    onSuccess: data => {
      setSaveTrashCanSuccess(true);
      setVisibleTrashDetail(true);
      setTrashDetailData(data);
      if (visibleTrashCan) {
        const locationData = {
          lat: coordinates[1],
          lng: coordinates[0],
          range: 20,
        };
        getTrashCan.mutate(locationData);
      }
    },
    onError: error => {
      console.error(error);
    },
  });
  const deleteTrashCanMutation = useMutation(deleteTrashCan, {
    onSuccess: () => {
      setDeleteTrashCanSuccess(true);
      setVisibleTrashDetail(false);
      setTrashDetailData(null);
      if (visibleTrashCan) {
        const locationData = {
          lat: coordinates[1],
          lng: coordinates[0],
          range: 20,
        };
        getTrashCan.mutate(locationData);
      }
    },
    onError: error => {
      console.error(error);
    },
  });

  const clickVisibleTrashCan = () => {
    if (!visibleTrashCan) {
      setVisibleTrashCan(true);
      const locationData = {
        lat: coordinates[1],
        lng: coordinates[0],
        range: 20,
      };
      getTrashCan.mutate(locationData);
    } else {
      setVisibleTrashCan(false);
    }
  };

  const clickSaveTrashCan = async () => {
    setSaveTrashCanDiagle(false);
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(imagePickerOption, onPickTrashCanImage);
      } else {
        setVisible(true);
      }
    }
  };

  const onPickTrashCanImage = (res: ImagePickerResponse) => {
    if (res.assets && res.assets[0].uri) {
      saveTrashCanMutation.mutate({
        trashCanImgData: res.assets[0],
        trashCanInfo: {
          address: '',
          lat: coordinates[1],
          lng: coordinates[0],
        },
        no: null,
      });
    }
  };

  const openTrashCanDetail = (trashCanItem: TrashCan) => {
    setVisibleTrashDetail(true);
    setTrashDetailData(trashCanItem);
  };

  const trashCanItems = [...trashCanList].map((trashCanItem, index) => (
    <MapboxGL.MarkerView
      key={index}
      id={index.toString()}
      coordinate={[trashCanItem.lng, trashCanItem.lat]}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles().trashCanImage}
        onPress={() => openTrashCanDetail(trashCanItem)}>
        <Image
          style={styles().trashCanImage}
          source={{
            uri: 'https://cdn-icons.flaticon.com/png/512/1587/premium/1587516.png?token=exp=1652530067~hmac=e3153082689ae65b3b28c77fcacffd4b',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </MapboxGL.MarkerView>
  ));

  if (isLoading) {
    return (
      <View style={styles().loadingContainer}>
        <ActivityIndicator animating={true} size={48} color={Colors.blueA100} />
        <Text style={styles().loadingText}>플로깅 기록하는 중</Text>
      </View>
    );
  }

  return (
    <Provider>
      <View style={styles().container}>
        <MapboxGL.MapView
          ref={mapViewRef}
          style={styles().map}
          localizeLabels={true}>
          <MapboxGL.Camera
            zoomLevel={zoomLevel}
            centerCoordinate={centerCoordinates}
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
          <MapboxGL.MarkerView
            id={'myPosition'}
            coordinate={coordinates}
            anchor={{x: 0.5, y: 1}}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles().markerImage}
              onPress={() => {}}>
              <Image
                style={styles().markerImage}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/4899/4899329.png',
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </MapboxGL.MarkerView>
          {visibleTrashCan && getTrashCan.data && <View>{trashCanItems}</View>}
        </MapboxGL.MapView>

        <View style={styles().recordContainer}>
          <LinearGradient
            style={styles().finishBox}
            colors={['#7BFFB0', '#7DBEFF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <TouchableOpacity
              style={styles().finishButton}
              activeOpacity={0.5}
              onPress={clickFinish}>
              <Icon name="stop" size={65} color="#ffffff" />
            </TouchableOpacity>
          </LinearGradient>

          {/* 타이머 */}
          <View style={styles().itemContainer}>
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
          <View style={styles().itemContainer}>
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
                {currentKcal} kcal
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles('#ffffff').saveTrashCanButton}
          onPress={() => setSaveTrashCanDiagle(true)}>
          <IconM name="battery-plus-outline" size={32} color={'#5FA2E5'} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={
            styles(visibleTrashCan ? null : '#ffffff').visibleTrashCanButton
          }
          onPress={() => clickVisibleTrashCan()}>
          <Image
            style={styles().trashCanImage}
            source={{
              uri: 'https://cdn-icons.flaticon.com/png/512/1587/premium/1587516.png?token=exp=1652530067~hmac=e3153082689ae65b3b28c77fcacffd4b',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Portal>
          <Dialog
            style={styles().dialogContainer}
            visible={backDialog}
            onDismiss={() => setBackDialog(false)}>
            <Text style={fontStyles(22, 'bold').textStyle}>
              플로깅을 포기하실 건가요?
            </Text>
            <Dialog.Actions>
              <TouchableOpacity
                style={styles().buttonContainer}
                activeOpacity={0.6}
                onPress={() => navigation.pop()}>
                <Icon name="reply" size={22} color="#5FA2E5" />
                <Text style={fontStyles(22, '600').textStyle}>포기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles().buttonContainer}
                activeOpacity={0.6}
                onPress={() => setBackDialog(false)}>
                <Icon name="directions-run" size={22} color="#5FA2E5" />
                <Text style={fontStyles(22, '600').textStyle}>계속</Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
          <Dialog
            style={styles().dialogContainer}
            visible={finishDialog}
            onDismiss={() => setFinishDialog(false)}>
            <Text style={fontStyles(22, 'bold').textStyle}>
              플로깅을 완료하실 건가요?
            </Text>
            <Dialog.Actions>
              <TouchableOpacity
                style={styles().buttonContainer}
                activeOpacity={0.6}
                onPress={requestPermissions}>
                <Icon name="assistant-photo" size={22} color="#5FA2E5" />
                <Text style={fontStyles(22, '600').textStyle}>완료</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles().buttonContainer}
                activeOpacity={0.6}
                onPress={() => setFinishDialog(false)}>
                <Icon name="directions-run" size={22} color="#5FA2E5" />
                <Text style={fontStyles(22, '600').textStyle}>계속</Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
          <Dialog
            style={styles().dialogContainer}
            visible={saveTrashCanDialog}
            onDismiss={() => setSaveTrashCanDiagle(false)}>
            <Text style={fontStyles(22, 'bold').textStyle}>
              쓰레기통을 등록하실 건가요?
            </Text>
            <Dialog.Actions>
              <TouchableOpacity
                style={styles().buttonContainer}
                activeOpacity={0.6}
                onPress={clickSaveTrashCan}>
                <IconM name="battery-plus-outline" size={22} color="#5FA2E5" />
                <Text style={fontStyles(22, '600').textStyle}>등록</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles().buttonContainer}
                activeOpacity={0.6}
                onPress={() => setSaveTrashCanDiagle(false)}>
                <Icon name="directions-run" size={22} color="#5FA2E5" />
                <Text style={fontStyles(22, '600').textStyle}>취소</Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {visibleTrashDetail && (
          <TrashCanDetail
            trashCanData={trashDetailData}
            setVisibleTrashDetail={setVisibleTrashDetail}
            setTrashDetailData={setTrashDetailData}
            deleteTrashCanMutation={deleteTrashCanMutation}
          />
        )}
        <Snackbar
          visible={visible}
          style={styles().snackBar}
          onDismiss={() => setVisible(false)}
          action={{label: '확인', onPress: () => setVisible(false)}}>
          <Text style={fontStyles(16, 'normal', null, '#ffffff').textStyle}>
            카메라 권한이 필요합니다.
          </Text>
        </Snackbar>
        <Snackbar
          visible={saveTrashCanSuccess}
          style={styles().snackBar}
          onDismiss={() => setSaveTrashCanSuccess(false)}
          action={{
            label: '확인',
            onPress: () => setSaveTrashCanSuccess(false),
          }}>
          <Text style={fontStyles(16, 'normal', null, '#ffffff').textStyle}>
            쓰레기통 등록이 완료되었습니다.
          </Text>
        </Snackbar>
        <Snackbar
          visible={deleteTrashCanSuccess}
          style={styles().snackBar}
          onDismiss={() => setDeleteTrashCanSuccess(false)}
          action={{
            label: '확인',
            onPress: () => setDeleteTrashCanSuccess(false),
          }}>
          <Text style={fontStyles(16, 'normal', null, '#ffffff').textStyle}>
            쓰레기통 삭제가 완료되었습니다.
          </Text>
        </Snackbar>
      </View>
    </Provider>
  );
}

export default PloggingMapScreen;
