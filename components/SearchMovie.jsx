import { useState } from 'react'
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  TouchableNativeFeedback
} from 'react-native'

import 'moment/locale/tr'
import moment from 'moment'

import { set, get, ref, getDatabase } from '../lib/firebase'

export default function SearchMovie({ screen }) {
  const [autoCompleteData, setAutoCompleteData] = useState(false)
  const [search, setSearch] = useState('')

  const renderAutoCompleteItem = ({ item }) => {
    return item.title ? (
      <View
        style={{
          overflow: 'hidden',
          margin: 4,
          borderRadius: 8
        }}
      >
        <TouchableNativeFeedback
          onPress={() => {
            const database = getDatabase()
            const watchAppRef = ref(database, 'watch-app')

            get(watchAppRef).then((snapshot) => {
              const watchAppData = snapshot.val()
              const watchLaterData = watchAppData?.watchlater || {}
              const watchedData = watchAppData?.watched || {}

              const existingWatchLaterRecord = Object.values(
                watchLaterData
              ).some((record) => record.title === item.title)

              const existingWatchedRecord = Object.values(watchedData).some(
                (record) => record.title === item.title
              )

              if (existingWatchLaterRecord || existingWatchedRecord) {
                ToastAndroid.show('Bu film zaten eklenmiş.', ToastAndroid.SHORT)

                setAutoCompleteData(false)
                setSearch('')
              } else {
                set(
                  ref(
                    getDatabase(),
                    `watch-app/${screen}/${moment().valueOf()}`
                  ),
                  {
                    custom: '0',
                    imdb: item.imdb,
                    poster: item.poster,
                    title: item.title
                  }
                )

                ToastAndroid.show('Film eklendi.', ToastAndroid.SHORT)

                setSearch('')
                setAutoCompleteData(false)
              }
            })
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              padding: 4
            }}
          >
            <Image
              style={{
                width: 48,
                backgroundColor: '#222',
                borderRadius: 8
              }}
              source={{
                uri: item.poster
              }}
            />
            <View style={{ marginLeft: 8 }}>
              <Text style={{ color: '#fff', lineHeight: 20 }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
                Yayınlanma Tarihi : {item.year}
              </Text>
              <Text style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
                IMDB Puanı : {item.imdb}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    ) : (
      <View
        style={{
          flexDirection: 'row',
          padding: 8
        }}
      >
        <View
          style={{
            width: 48,
            backgroundColor: '#222',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator color={'#8e8e8e'} size={16} />
        </View>
        <View style={{ marginLeft: 8 }}>
          <View
            style={{
              width: 100,
              height: 16,
              backgroundColor: '#222',
              borderRadius: 4
            }}
          />
          <View
            style={{
              width: 150,
              height: 14,
              backgroundColor: '#222',
              borderRadius: 4,
              marginTop: 8
            }}
          />
          <View
            style={{
              width: 75,
              height: 14,
              backgroundColor: '#222',
              borderRadius: 4,
              marginTop: 8
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <View>
      <TextInput
        style={{
          zIndex: 2,
          borderBottomWidth: 4,
          borderBottomColor: '#0091cf',
          paddingVertical: 16,
          marginLeft: 16,
          marginRight: 16,
          color: '#fff'
        }}
        placeholder="Film adı giriniz..."
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={(text) => {
          setSearch(text)
          setAutoCompleteData(false)
        }}
        onSubmitEditing={async (e) => {
          if (e.nativeEvent.text) {
            setAutoCompleteData(Array.from({ length: 4 }, () => ({})))

            const baseUrl = 'https://api.themoviedb.org/3/search/movie'
            const apiKey = '15d2ea6d0dc1d476efbca3eba2b9bbfb'

            const res = await fetch(
              `${baseUrl}?query=${e.nativeEvent.text}&api_key=${apiKey}`
            )

            const data = await res.json()

            let tempAutoComplete = []

            data.results.forEach((item) => {
              tempAutoComplete.push({
                imdb: item.vote_average.toFixed(1),
                poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                title: item.title,
                year: moment(item.release_date).format('LL')
              })
            })

            if (data.results.length === 0) {
              setTimeout(() => {
                setAutoCompleteData(false)

                ToastAndroid.show('Film bulunamadı.', ToastAndroid.SHORT)
              }, 3000)
            } else {
              setAutoCompleteData(tempAutoComplete)
            }
          }
        }}
      />
      {autoCompleteData && (
        <View
          style={{
            zIndex: 1,
            position: 'absolute',
            top: 64,
            left: 16,
            right: 16
          }}
        >
          <FlatList
            style={{
              backgroundColor: '#2a2a2a',
              maxHeight: 304
            }}
            data={autoCompleteData}
            renderItem={renderAutoCompleteItem}
            keyExtractor={(item, index) => index}
            numColumns={1}
            initialNumToRender={4}
          />
          <View
            style={{
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderTopWidth: 1,
              borderTopColor: '#333333',
              backgroundColor: '#2a2a2a'
            }}
          >
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('', true)}
              onPress={() => setAutoCompleteData(false)}
            >
              <View style={{ paddingVertical: 8, alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Kapat</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      )}
    </View>
  )
}
