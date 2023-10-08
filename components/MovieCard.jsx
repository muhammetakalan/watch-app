import {
  Text,
  View,
  Image,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from 'react-native'

import 'moment/locale/tr'
import moment from 'moment'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { ref, set, update, remove, getDatabase } from '../lib/firebase'

export default function MovieCard({ data, screen }) {
  return data.title ? (
    <TouchableWithoutFeedback
      onLongPress={() =>
        Alert.alert('Uyarı', 'Filmi kaldırmak istediğinizden emin misiniz?', [
          { text: 'Hayır', style: 'cancel' },
          {
            text: 'Evet',
            onPress: () => {
              remove(ref(getDatabase(), `watch-app/${screen}/${data.id}`))

              ToastAndroid.show('Film kaldırıldı.', ToastAndroid.SHORT)
            }
          }
        ])
      }
    >
      <View style={{ flex: 1, margin: 8 }}>
        <View
          style={{
            flex: 1,
            height: 250,
            maxHeight: 250
          }}
        >
          <Image
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#2b2b2b',
              borderRadius: 8
            }}
            source={{
              uri: data.poster
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              top: 4,
              left: 4,
              height: 30,
              paddingHorizontal: 4,
              backgroundColor: '#222',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#333333'
            }}
          >
            <FontAwesome name="imdb" color="#edc017" size={24} />
            <Text style={{ color: '#fff', marginLeft: 4 }}>{data.imdb}</Text>
          </View>
          {screen == 'watched' ? (
            <View
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                borderRadius: 8,
                width: 30,
                height: 30,
                backgroundColor: '#222',
                borderWidth: 1,
                borderColor: '#333333'
              }}
            >
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('', true)}
                onPress={() =>
                  update(ref(getDatabase(), `watch-app/${screen}/${data.id}`), {
                    custom: data.custom >= 10 ? 0 : ++data.custom
                  })
                }
              >
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{ color: '#fff' }}>{data.custom}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          ) : (
            <View
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                borderRadius: 8,
                width: 30,
                height: 30,
                backgroundColor: '#222',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#333333'
              }}
            >
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('', true)}
                onPress={() => {
                  Alert.alert(
                    'Uyarı',
                    'Filmi izlendi olarak işaretlemek istediğinize emin misiniz?',
                    [
                      { text: 'Hayır', style: 'cancel' },
                      {
                        text: 'Evet',
                        onPress: () => {
                          set(
                            ref(
                              getDatabase(),
                              `watch-app/watched/${moment().valueOf()}`
                            ),
                            {
                              custom: data.custom,
                              imdb: data.imdb,
                              poster: data.poster,
                              title: data.title
                            }
                          )
                          remove(
                            ref(
                              getDatabase(),
                              `watch-app/watchlater/${data.id}`
                            )
                          )

                          ToastAndroid.show(
                            'Film izlendi olarak işaretlendi.',
                            ToastAndroid.SHORT
                          )
                        }
                      }
                    ]
                  )
                }}
              >
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ color: '#fff' }}
                    name="check-bold"
                    size={24}
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
        </View>
        <Text style={{ color: '#fff', marginTop: 8, fontSize: 14 }}>
          {data.title}
        </Text>
        <Text
          style={{
            color: '#8c8c8c',
            marginTop: 8,
            fontSize: 12,
            lineHeight: 12
          }}
        >
          {moment(data.id, 'x').format('LL')}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={{ flex: 1, margin: 8 }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: 250,
          maxHeight: 250,
          backgroundColor: '#2b2b2b',
          borderRadius: 8
        }}
      >
        <ActivityIndicator color={'#8e8e8e'} size={24} />
      </View>
      <View
        style={{
          width: '75%',
          height: 16,
          marginTop: 8,
          backgroundColor: '#2b2b2b',
          borderRadius: 4
        }}
      />
      <View
        style={{
          width: '55%',
          height: 14,
          marginTop: 8,
          backgroundColor: '#2b2b2b',
          borderRadius: 4
        }}
      />
    </View>
  )
}
