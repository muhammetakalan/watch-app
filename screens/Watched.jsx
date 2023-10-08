import { useEffect, useState } from 'react'
import { View, FlatList, ScrollView, SafeAreaView } from 'react-native'

import { ref, onValue, getDatabase } from '../lib/firebase'
import MovieCard from '../components/MovieCard'
import SearchMovie from '../components/SearchMovie'
import Badge from '../components/Badge'
import Header from '../components/Header'
import getFilmCountByMonth from '../utils/getFilmCountByMonth'
import calculateAverageRating from '../utils/calculateAverageRating'

export default function Watched() {
  const [data, setData] = useState(Array(10).fill({}))

  useEffect(() => {
    onValue(ref(getDatabase(), 'watch-app/watched/'), (snapshot) => {
      let tempData = []

      snapshot.forEach((item) => {
        tempData.push(Object.assign({ id: item.key }, item.val()))
      })

      setData(tempData.reverse())
    })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#222' }}>
      <Header title="İzlenenler">
        <View style={{ borderTopWidth: 1, borderTopColor: '#333333' }}>
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 12,
              paddingHorizontal: 8
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <Badge>
              İzlenen film sayısı : {data[0]?.title ? data.length : 0}
            </Badge>
            <Badge style={{ marginLeft: 4 }}>
              Bu ay izlenen film sayısı : {getFilmCountByMonth(data)}
            </Badge>
            <Badge style={{ marginLeft: 4 }}>
              Ortalama IMDB puanı : {calculateAverageRating(data)}
            </Badge>
          </ScrollView>
        </View>
      </Header>
      <SearchMovie screen={'watched'} />
      <FlatList
        contentContainerStyle={{ paddingVertical: 8 }}
        columnWrapperStyle={{ paddingHorizontal: 8 }}
        data={data}
        renderItem={({ item }) => <MovieCard data={item} screen={'watched'} />}
        keyExtractor={(item, index) => index}
        numColumns={2}
        initialNumToRender={4}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
